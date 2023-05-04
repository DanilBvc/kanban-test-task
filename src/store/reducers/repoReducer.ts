import {
  todoStatus,
  issuesResponseType
} from '../../types/reponseType/responseType';
import {
  repoReducerActions
} from '../../types/store/actions/actionsType';
import { RepoReducerPayload } from '../../types/store/reducersTypes/reducersType';
import {
  initialRepoType
} from '../../types/store/reducersTypes/repoReducerTypes';
import saveIssuesToLocalStorage from '../../utils/saveToLocalStorage';
import initialRepoState from '../initialState/repoInitialState';

const repoReducer = (
  state: initialRepoType = initialRepoState,
  action: { type: repoReducerActions; payload: RepoReducerPayload }
) => {
  switch (action.type) {
    case repoReducerActions.SET_SEARCH: {
      const { payload } = action;

      const issuesByStatus = payload.issues.reduce((result, issue) => {
        result[issue.status].push(issue);
        return result;
      }, {
        [todoStatus.TODO]: [] as issuesResponseType[],
        [todoStatus.DONE]: [] as issuesResponseType[],
        [todoStatus.IN_PROGRESS]: [] as issuesResponseType[],
      });

      const issues = [
        { todoStatus: todoStatus.TODO, issues: issuesByStatus[todoStatus.TODO] },
        { todoStatus: todoStatus.DONE, issues: issuesByStatus[todoStatus.DONE] },
        { todoStatus: todoStatus.IN_PROGRESS, issues: issuesByStatus[todoStatus.IN_PROGRESS] },
      ];

      return { ...state, repoUrl: payload.repoUrl, issues };
    }
    case repoReducerActions.MOVE_TODO: {
      const { changeTodoStatus } = action.payload;
      if (!changeTodoStatus) return state;

      const {
        fromBoard, fromTodo, toBoard, toTodo,
      } = changeTodoStatus;
      const thirdArray = state.issues
        .filter((item) => item.todoStatus !== fromBoard && item.todoStatus !== toBoard);

      const fromBoardIssues = state.issues.find((issue) => issue.todoStatus === fromBoard)?.issues;
      const toBoardIssues = state.issues.find((issue) => issue.todoStatus === toBoard)?.issues;

      if (!fromBoardIssues || !toBoardIssues) return state;

      const fromBoardIndex = fromBoardIssues.indexOf(fromTodo);
      if (fromBoardIndex === -1) return state;

      fromBoardIssues.splice(fromBoardIndex, 1);

      if (toTodo) {
        const toBoardIndex = toBoardIssues.indexOf(toTodo);
        if (toBoardIndex === -1) return state;

        toBoardIssues.splice(toBoardIndex + 1, 0, fromTodo);
      } else {
        toBoardIssues.push(fromTodo);
      }

      const issues = [
        { todoStatus: fromBoard, issues: [...fromBoardIssues] },
        { todoStatus: toBoard, issues: [...toBoardIssues] },
        ...thirdArray,
      ];

      saveIssuesToLocalStorage(issues, action.payload.repoUrl);

      return { ...state, issues };
    }
    default:
      return state;
  }
};
export default repoReducer;
