/* eslint-disable @typescript-eslint/no-explicit-any */
import saveTodos from '../../../store/middleware/saveTodos';

describe('saveTodos middleware', () => {
  const createStore = () => ({
    getState: () => ({}),
    dispatch: jest.fn(),
  });

  it('should call next action if changeTodoStatus is provided', () => {
    const store: any = createStore();
    const next = jest.fn();
    const action: any = {
      type: 'SOME_ACTION',
      payload: {
        repoUrl: 'some-url',
        issues: [],
        changeTodoStatus: {},
      },
    };
    const middleware = saveTodos(store)(next);
    middleware(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should modify issues array if savedIssues exists', () => {
    localStorage.setItem('issues', JSON.stringify([
      { id: 1, issueStatus: 'done' },
      { id: 2, issueStatus: 'in progress' },
    ]));
    const store: any = createStore();
    const next = jest.fn();
    const action: any = {
      type: 'SOME_ACTION',
      payload: {
        repoUrl: 'some-url',
        issues: [
          { id: 1, status: 'todo' },
          { id: 2, status: 'todo' },
        ],
      },
    };
    const middleware = saveTodos(store)(next);
    middleware(action);
    expect(next).toHaveBeenCalledWith({
      type: 'SOME_ACTION',
      payload: {
        repoUrl: 'some-url',
        issues: [
          { id: 1, status: 'done' },
          { id: 2, status: 'in progress' },
        ],
      },
    });
    localStorage.clear();
  });

  it('should add default status to issues array if savedIssues does not exist', () => {
    localStorage.clear();
    const store: any = createStore();
    const next = jest.fn();
    const action: any = {
      type: 'SOME_ACTION',
      payload: {
        repoUrl: 'some-url',
        issues: [
          { id: 1, status: 'todo' },
          { id: 2, status: 'todo' },
        ],
      },
    };
    const middleware = saveTodos(store)(next);
    middleware(action);
    expect(next).toHaveBeenCalledWith({
      type: 'SOME_ACTION',
      payload: {
        repoUrl: 'some-url',
        issues: [
          { id: 1, status: 'todo' },
          { id: 2, status: 'todo' },
        ],
      },
    });
  });
});
