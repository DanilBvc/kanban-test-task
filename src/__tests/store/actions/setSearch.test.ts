import { repoReducerActions } from '../../../types/store/actions/actionsType';
import { issuesResponseType, todoStatus } from '../../../types/reponseType/responseType';
import setSearch from '../../../store/actionCreators/repoActions/setSearch';

describe('setSearch', () => {
  it('returns the expected action', () => {
    const payload: { repoUrl: string; issues: issuesResponseType[] } = {
      repoUrl: 'https://example.com/repo',
      issues: [
        {
          id: 1,
          title: 'Issue 1',
          status: todoStatus.TODO,
          created_at: String(new Date()),
          number: 1,
          user: {
            type: 'user',
          },
          comments: 1,
        },
        {
          id: 2,
          title: 'Issue 2',
          status: todoStatus.IN_PROGRESS,
          created_at: String(new Date()),
          number: 1,
          user: {
            type: 'user',
          },
          comments: 1,
        },
      ],
    };
    const action = setSearch(payload);
    expect(action.type).toEqual(repoReducerActions.SET_SEARCH);
    expect(action.payload).toEqual(payload);
  });
});
