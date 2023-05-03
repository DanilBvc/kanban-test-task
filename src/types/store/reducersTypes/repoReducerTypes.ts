import { issuesResponseType, todoStatus } from '../../reponseType/responseType';

export type todoType = { todoStatus: todoStatus; issues: issuesResponseType[] };
export type initialRepoType = {
  repoUrl: string;
  issues: todoType[];
};
