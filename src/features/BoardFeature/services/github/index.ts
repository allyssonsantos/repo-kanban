import { Octokit } from 'octokit';

export const client = new Octokit();

export async function getRepoBranches({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  try {
    const branches = await client.request(
      'GET /repos/{owner}/{repo}/branches',
      {
        owner,
        repo,
      }
    );

    const response = {
      status: branches.status,
      branches: branches.data.map((branch) => branch.name),
    };

    return response;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function getRepoInformation({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  try {
    const info = await client.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
    });

    return {
      id: info.data.id,
      name: info.data.name,
      description: info.data.description,
      stars: info.data.stargazers_count,
      starUrl: `${info.data.html_url}/stargazers`,
      status: info.status,
    };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
