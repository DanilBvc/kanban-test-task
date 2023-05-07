import { todoStatus } from '../../../types/reponseType/responseType';
import moveTodo from '../../../store/actionCreators/repoActions/moveTodo';
import { repoReducerActions } from '../../../types/store/actions/actionsType';

describe('moveTodo', () => {
  it('should return an object with type and payload', () => {
    const payload = {
      repoUrl: 'https://github.com/user/repo',
      issues: [
        {
          todoStatus: todoStatus.TODO,
          issues: [
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
          ],
        },
        {
          todoStatus: todoStatus.TODO,
          issues: [
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
          ],
        },
      ],
      changeTodoStatus: {
        fromBoard: todoStatus.TODO,
        fromTodo: {
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
        toBoard: todoStatus.IN_PROGRESS,
        toTodo: {
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
      },
    };
    const expectedAction = {
      type: repoReducerActions.MOVE_TODO,
      payload,
    };
    const action = moveTodo(payload);
    expect(action).toEqual(expectedAction);
  });
});
