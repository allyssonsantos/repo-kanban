import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useLocalStorage } from '@/hooks';
import { Button, Flex, Input, Text, CodeSandboxLogo } from '@/components';

import { createHistory, REGEX_HTTPS } from './utils';
import { PreviousList } from './components';

export const PREVIOUS_REPOS_LS_KEY = 'previousRepos';

export function HomeFeature() {
  const [inputValue, setInputValue] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const [previousSearchedRepos, setPreviousSearchedRepos] = useLocalStorage<
    string[]
  >(PREVIOUS_REPOS_LS_KEY, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regexMatched = REGEX_HTTPS.exec(inputValue);

    if (!regexMatched) {
      setInvalidUrl(true);
      return;
    }

    const repoHistory = createHistory({
      currentHistory: previousSearchedRepos,
      newValue: inputValue,
    });

    setPreviousSearchedRepos(repoHistory);

    router.push({
      pathname: '/board',
      query: {
        owner: regexMatched.groups?.owner,
        repo: regexMatched.groups?.repo,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (invalidUrl || error) {
      setInvalidUrl(false);
      setError(false);
    }
    setInputValue(e.target.value);
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });

    if (router.query.error) {
      setError(true);
    }
  }, [router.events, router.query.error]);

  return (
    <Flex full align="center" grow>
      <Flex
        full
        justify="between"
        gap="3"
        css={{ padding: '$3', '@bp1': { flexDirection: 'column' } }}
      >
        <CodeSandboxLogo />
        <Flex
          full
          as="form"
          direction="column"
          gap="6"
          css={{ maxWidth: 754 }}
          onSubmit={handleSubmit}
        >
          <Text
            as="h1"
            variant="bold"
            size="4"
            css={{
              maxWidth: 480,
            }}
          >
            Start by pasting the repository URL.
          </Text>
          <Flex direction="column" gap="4">
            <Flex grow gap="2">
              <Input
                placeholder="https://"
                required
                type="url"
                name="repository"
                css={{ flexGrow: 1 }}
                onChange={handleChange}
                value={inputValue}
                ref={inputRef}
              />
              <Button type="submit">
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </Flex>
            {invalidUrl && (
              <Text color="red">
                Oops! Enter a valid GitHub repository URL.
              </Text>
            )}
            {error && (
              <Text color="red">Oops! Something went wrong. Try again.</Text>
            )}
          </Flex>
          {Boolean(previousSearchedRepos?.length) && (
            <PreviousList
              items={previousSearchedRepos}
              onSelect={(selectedItem) => setInputValue(selectedItem)}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
