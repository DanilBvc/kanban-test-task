export enum todoStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}
export type issuesResponseType = {
  title: string;
  created_at: string;
  number: number;
  user: {
    type: string;
  };
  comments: number;
  status: todoStatus;
  id: number;
};
export type localStorageIssue = { id: number; issueStatus: todoStatus };
