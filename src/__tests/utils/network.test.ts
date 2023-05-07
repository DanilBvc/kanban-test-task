import { getIssues } from '../../utils/network';

describe('getIssues', () => {
  it('should return the correct issues URL', () => {
    const user = 'myusername';
    const repo = 'myrepo';
    const expectedUrl = 'https://api.github.com/repos/myusername/myrepo/issues';

    expect(getIssues(user, repo)).toEqual(expectedUrl);
  });
});
