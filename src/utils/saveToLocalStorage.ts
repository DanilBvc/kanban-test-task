import { todoStatus } from '../types/reponseType/responseType';
import { initialRepoType, todoType } from '../types/store/reducersTypes/repoReducerTypes';

const saveIssuesToLocalStorage = (todos: todoType[], gitUrl: string) => {
  const localStorageIssues = localStorage.getItem('issues');
  if (localStorageIssues) {
    const antotherGithubIssues = (JSON.parse(localStorageIssues) as initialRepoType[])
      .filter((issue) => issue.repoUrl !== gitUrl);
    if (antotherGithubIssues.length > 0) {
      const filteredIssues = todos.filter((todo) => todo.todoStatus !== todoStatus.TODO);
      const resultIssues = [...filteredIssues
        .flatMap((issue) => issue.issues
          .map((issueItem) => ({
            issueStatus: issue.todoStatus,
            id: issueItem.id,
            repoUrl: gitUrl,
          })))];
      localStorage.setItem('issues', JSON.stringify([...antotherGithubIssues, ...resultIssues]));
    } else {
      const filteredIssues = todos.filter((todo) => todo.todoStatus !== todoStatus.TODO);
      const resultIssues = [...filteredIssues
        .flatMap((issue) => issue.issues
          .map((issueItem) => ({
            issueStatus: issue.todoStatus,
            id: issueItem.id,
            repoUrl: gitUrl,
          })))];
      localStorage.setItem('issues', JSON.stringify(resultIssues));
    }
  } else {
    const filteredIssues = todos.filter((todo) => todo.todoStatus !== todoStatus.TODO);
    const resultIssues = [...filteredIssues
      .flatMap((issue) => issue.issues
        .map((issueItem) => ({
          issueStatus: issue.todoStatus,
          id: issueItem.id,
          repoUrl: gitUrl,
        })))];
    localStorage.setItem('issues', JSON.stringify(resultIssues));
  }
};
export default saveIssuesToLocalStorage;
