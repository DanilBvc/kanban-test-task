import { todoStatus, issuesResponseType, localStorageIssue } from '../../types/reponseType/responseType';
import { repoReducerActions } from '../../types/store/actions/actionsType';
import { initialRepoType, todoType } from '../../types/store/reducersTypes/repoReducerTypes';
import initialRepoState from '../initialState/repoInitialState';

const repoReducer = (state: initialRepoType = initialRepoState, action: {
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

      return {
        repoUrl: payload.repoUrl,
        issues: [
          { todoStatus: todoStatus.TODO, issues: issuesByStatus[todoStatus.TODO] },
          { todoStatus: todoStatus.DONE, issues: issuesByStatus[todoStatus.DONE] },
          { todoStatus: todoStatus.IN_PROGRESS, issues: issuesByStatus[todoStatus.IN_PROGRESS] },
        ],
      };
    }
    case repoReducerActions.MOVE_TODO: {
      const { changeTodoStatus } = action.payload;
      if (changeTodoStatus) {
        const localStorageIssues = localStorage.getItem('issues') as localStorageIssue[] | null;
        if (localStorageIssues && localStorageIssues.length > 0) {
          const updatedIssues = localStorageIssues.map((item) => {
            if (item.id === changeTodoStatus.fromTodo.id) {
              return { ...item, issueStatus: changeTodoStatus.toBoard };
            }
            if (item.id === changeTodoStatus.toTodo?.id) {
              return { ...item, issueStatus: changeTodoStatus.fromBoard };
            }
            return item;
          });
          localStorage.setItem('issues', JSON.stringify(updatedIssues));
        } else {
          const updatedIssues: localStorageIssue[] = [];

          if (changeTodoStatus.fromBoard !== todoStatus.TODO) {
            updatedIssues.push(
              { id: changeTodoStatus.fromTodo.id, issueStatus: changeTodoStatus.fromBoard }
            );
          }
          if (changeTodoStatus.toBoard !== todoStatus.TODO && changeTodoStatus.toTodo) {
            // here bug
            updatedIssues.push(
              { id: changeTodoStatus.toTodo.id, issueStatus: changeTodoStatus.toBoard }
            );
          }
          localStorage.setItem('issues', JSON.stringify(updatedIssues));
        }
        if (changeTodoStatus.toTodo) {
          const thirdArray = state.issues
            .filter((item) => item.todoStatus !== changeTodoStatus.fromBoard
              && item.todoStatus !== changeTodoStatus.toBoard);
          const fromBoard = state.issues
            .find((issue) => issue.todoStatus === changeTodoStatus.fromBoard) as todoType;
          const toBoard = state.issues
            .find((issue) => issue.todoStatus === changeTodoStatus.toBoard) as todoType;

          const fromBoardIndex = fromBoard?.issues.indexOf(changeTodoStatus.fromTodo);
          if ((fromBoardIndex || fromBoardIndex === 0) && fromBoardIndex !== -1) {
            fromBoard?.issues.splice(fromBoardIndex, 1);
          }

          const toBoardIndex = toBoard?.issues.indexOf(changeTodoStatus.toTodo);
          if (toBoardIndex && toBoardIndex !== -1) {
            toBoard?.issues.splice(toBoardIndex + 1, 0, changeTodoStatus.fromTodo);
          }

          if (fromBoard === toBoard) {
            return {
              repoUrl: state.repoUrl,
              issues: [
                { todoStatus: changeTodoStatus.toBoard, issues: [...toBoard.issues] },
                ...thirdArray,
              ],
            };
          }
          return {
            repoUrl: state.repoUrl,
            issues: [
              { todoStatus: changeTodoStatus.fromBoard, issues: [...fromBoard.issues] },
              { todoStatus: changeTodoStatus.toBoard, issues: [...toBoard.issues] },
              ...thirdArray,
            ],
          };
        }
        if (!changeTodoStatus.toTodo) {
          const thirdArray = state.issues
            .filter((item) => item.todoStatus !== changeTodoStatus.fromBoard
              && item.todoStatus !== changeTodoStatus.toBoard);
          const fromBoard = state.issues
            .find((issue) => issue.todoStatus === changeTodoStatus.fromBoard) as todoType;
          const toBoard = state.issues
            .find((issue) => issue.todoStatus === changeTodoStatus.toBoard) as todoType;

          const fromBoardIndex = fromBoard?.issues.indexOf(changeTodoStatus.fromTodo);

          if ((fromBoardIndex || fromBoardIndex === 0) && fromBoardIndex !== -1) {
            fromBoard?.issues.splice(fromBoardIndex, 1);
          }

          toBoard?.issues.push(changeTodoStatus.fromTodo);
          if (fromBoard === toBoard) {
            return {
              repoUrl: state.repoUrl,
              issues: [
                { todoStatus: changeTodoStatus.toBoard, issues: [...toBoard.issues] },
                ...thirdArray,
              ],
            };
          }
          return {
            repoUrl: state.repoUrl,
            issues: [
              { todoStatus: changeTodoStatus.fromBoard, issues: [...fromBoard.issues] },
              { todoStatus: changeTodoStatus.toBoard, issues: [...toBoard.issues] },
              ...thirdArray,
            ],
          };
        }
      }
      return state;
    }
    default: return state;
  }
};
export default repoReducer;
