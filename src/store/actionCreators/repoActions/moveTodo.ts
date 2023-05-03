import { issuesResponseType, todoStatus } from '../../../types/reponseType/responseType';
import { repoReducerActions } from '../../../types/store/actions/actionsType';
import { todoType } from '../../../types/store/reducersTypes/repoReducerTypes';

const moveTodo = (payload: {
  repoUrl: string;
  issues: todoType[];
  changeTodoStatus: {
    fromBoard: todoStatus;
    fromTodo: issuesResponseType;
    toBoard: todoStatus;
    toTodo?: issuesResponseType;
  };
}) => ({
  type: repoReducerActions.MOVE_TODO,
  payload,
});
export default moveTodo;
