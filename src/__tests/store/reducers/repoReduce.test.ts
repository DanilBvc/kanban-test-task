import repoReducer from '../../../store/reducers/repoReducer';
import { todoStatus } from '../../../types/reponseType/responseType';
import { repoReducerActions } from '../../../types/store/actions/actionsType';

describe('repoReducer', () => {
  const initialState = {
    repoUrl: '',
    issues: [],
  };

  const issues = [
    {
      id: 1,
      title: 'Issue 1',
      status: todoStatus.TODO,
      created_at: String(new Date()),
      number: 1,
      user: {
        type: 'User',
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
        type: 'User',
      },
      comments: 1,
    },
    {
      id: 3,
      title: 'Issue 3',
      status: todoStatus.DONE,
      created_at: String(new Date()),
      number: 1,
      user: {
        type: 'User',
      },
      comments: 1,
    },
  ];

  const setAction = {
    type: repoReducerActions.SET_SEARCH,
    payload: { repoUrl: 'https://github.com/user/repo', issues },
  };

  const moveAction = {
    type: repoReducerActions.MOVE_TODO,
    payload: {
      repoUrl: 'https://github.com/user/repo',
      issues: [],
      changeTodoStatus: {
        fromBoard: todoStatus.TODO,
        fromTodo: issues[0],
        toBoard: todoStatus.IN_PROGRESS,
        toTodo: issues[1],
      },
    },
  };

  it('should handle SET_SEARCH action', () => {
    const expectedState = {
      repoUrl: 'https://github.com/user/repo',
      issues: [
        {
          todoStatus: todoStatus.TODO,
          issues: [issues[0]],
        },
        {
          todoStatus: todoStatus.IN_PROGRESS,
          issues: [issues[2]],
        },
        {
          todoStatus: todoStatus.DONE,
          issues: [issues[1]],
        },
      ],
    };
    const receivedState = repoReducer(initialState, setAction);

    receivedState.issues.forEach((statusIssues, index) => {
      expect(statusIssues.issues).toEqual(expectedState.issues[index].issues);
    });

    expect(receivedState.repoUrl).toEqual(expectedState.repoUrl);
  });

  it('should handle MOVE_TODO action', () => {
    const prevState = {
      repoUrl: 'https://github.com/user/repo',
      issues: [
        {
          todoStatus: todoStatus.TODO,
          issues: [issues[0]],
        },
        {
          todoStatus: todoStatus.IN_PROGRESS,
          issues: [issues[1]],
        },
        {
          todoStatus: todoStatus.DONE,
          issues: [issues[2]],
        },
      ],
    };

    const expectedState = {
      repoUrl: 'https://github.com/user/repo',
      issues: [
        {
          todoStatus: todoStatus.TODO,
          issues: [],
        },
        {
          todoStatus: todoStatus.IN_PROGRESS,
          issues: [issues[1], issues[0]],
        },
        {
          todoStatus: todoStatus.DONE,
          issues: [issues[2]],
        },
      ],
    };

    expect(repoReducer(prevState, moveAction)).toEqual(expectedState);
  });
});
