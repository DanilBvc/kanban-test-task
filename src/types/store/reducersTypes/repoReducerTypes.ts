import { issuesResponseType } from '../../reponseType/responseType';

export type initialRepoType = {
  repoUrl: string;
  issues: issuesResponseType[] | [];
  loading: boolean;
  error: boolean;
};
