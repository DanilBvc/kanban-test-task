import { issuesResponseType, todoStatus } from '../../reponseType/responseType';
import { initialRepoType } from './repoReducerTypes';

export type IReducer = {
  repoReducer: initialRepoType;
};
export interface RepoReducerPayload {
  repoUrl: string;
  issues: issuesResponseType[];
  changeTodoStatus?: {
    fromBoard: todoStatus;
    fromTodo: issuesResponseType;
    toBoard: todoStatus;
    toTodo?: issuesResponseType;
  };
}
