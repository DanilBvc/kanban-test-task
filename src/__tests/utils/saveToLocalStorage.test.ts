import { todoStatus } from '../../types/reponseType/responseType';
import { todoType } from '../../types/store/reducersTypes/repoReducerTypes';
import saveIssuesToLocalStorage from '../../utils/saveToLocalStorage';

describe('saveIssuesToLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save issues to local storage when local storage is empty', () => {
    const todos: todoType[] = [
      {
        todoStatus: todoStatus.TODO,
        issues: [
          {
            id: 1,
            title: 'Issue 1',
            created_at: String(new Date()),
            number: 1,
            user: { type: 'User' },
            comments: 0,
            status: todoStatus.TODO,
          },
          {
            id: 2,
            title: 'Issue 2',
            created_at: String(new Date()),
            number: 2,
            user: { type: 'User' },
            comments: 1,
            status: todoStatus.TODO,
          },
        ],
      },
    ];

    const gitUrl = 'https://github.com/user/repo';

    saveIssuesToLocalStorage(todos, gitUrl);

    const localStorageIssues = localStorage.getItem('issues');
    expect(localStorageIssues).not.toBeNull();
  });

  it('should not save TODO issues to local storage', () => {
    const todos: todoType[] = [
      {
        todoStatus: todoStatus.TODO,
        issues: [
          {
            id: 1,
            title: 'Issue 1',
            created_at: String(new Date()),
            number: 1,
            user: { type: 'User' },
            comments: 0,
            status: todoStatus.TODO,
          },
          {
            id: 1,
            title: 'Issue 1',
            created_at: String(new Date()),
            number: 1,
            user: { type: 'User' },
            comments: 0,
            status: todoStatus.TODO,
          },
        ],
      },
    ];

    const gitUrl = 'https://github.com/user/repo';

    saveIssuesToLocalStorage(todos, gitUrl);

    const expectedIssues: [] = [];

    const localStorageIssues = localStorage.getItem('issues');
    expect(localStorageIssues).not.toBeNull();
    expect(JSON.parse(localStorageIssues!)).toEqual(expectedIssues);
  });
});
