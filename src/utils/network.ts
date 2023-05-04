const baseUrl = 'https://api.github.com/repos/';
export const getIssues = (user: string, repo: string) => `${baseUrl}${user}/${repo}/issues`;
