import { Dispatch } from 'redux';
import { issuesResponseType, localStorageIssue, todoStatus } from '../../types/reponseType/responseType';
import { repoReducerActions } from '../../types/store/actions/actionsType';
import { initialRepoType } from '../../types/store/reducersTypes/repoReducerTypes';

const saveTodos = (store: initialRepoType) => (next: Dispatch) => (action: {
  type: repoReducerActions; payload: {
    repoUrl: string;
    issues: issuesResponseType[];
    changeTodoStatus?: {
      fromBoard: todoStatus;
      fromTodo: issuesResponseType;
      toBoard: todoStatus;
      toTodo?: issuesResponseType;
    };
  };
}) => {
  // save todos to local storage
  const savedIssues = localStorage.getItem('issues');
  let resultArray: issuesResponseType[] | undefined;
  if (!action.payload.changeTodoStatus) {
    if (savedIssues) {
      resultArray = action.payload.issues.map((issue) => {
        const statusObj = JSON.parse(savedIssues)
          .find((s: issuesResponseType) => s.id === issue.id);
        if (statusObj) {
          return { ...issue, status: statusObj.issueStatus };
        }
        return { ...issue, status: todoStatus.TODO };
      });
    }
  }

  if (resultArray) {
    const result = next({
      ...action,
      payload: {
        ...action.payload,
        repoUrl: action.payload.repoUrl,
        issues: resultArray,
      },
    });
    return result;
  }
  const result = next(action);
  return result;
};
export default saveTodos;
