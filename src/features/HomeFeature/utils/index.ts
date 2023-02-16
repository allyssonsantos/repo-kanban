const DEFAULT_LIMIT = 5;

export function createHistory({
  currentHistory,
  newValue,
  limit = DEFAULT_LIMIT,
}: {
  currentHistory: string[];
  newValue: string;
  limit?: number;
}) {
  if (!newValue) {
    return currentHistory;
  }

  const hasReachedLimit = currentHistory.length >= limit;
  const newHistory = [...currentHistory];

  if (hasReachedLimit && !newHistory.includes(newValue)) {
    newHistory.pop();
    newHistory.unshift(newValue);

    return newHistory;
  }

  if (hasReachedLimit) {
    const valueIndex = newHistory.indexOf(newValue);
    newHistory.splice(valueIndex, 1);
    newHistory.unshift(newValue);

    return newHistory;
  }

  const valueIndex = newHistory.indexOf(newValue);

  if (valueIndex > -1) {
    newHistory.splice(valueIndex, 1);
    newHistory.unshift(newValue);

    return newHistory;
  }

  newHistory.unshift(newValue);

  return newHistory;
}

// Remember to tell that maybe importing a repository with a dot in the name is not working
// In the "import" modal of CodeSandbox.
// Will match http(s)://github.com/owner/repo.allowing.dot.in.name(.git)
export const REGEX_HTTPS =
  /http(s?):\/\/github\.com\/(?<owner>[\w-]+)\/(?<repo>[(\.)?\w-]+)(\.git)?$/i;
