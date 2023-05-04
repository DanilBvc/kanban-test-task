import { todoStatus } from '../types/reponseType/responseType';
import { todoType } from '../types/store/reducersTypes/repoReducerTypes';

const saveIssuesToLocalStorage = (todos: todoType[], gitUrl: string) => {
  const filteredIssues = todos.filter((todo) => todo.todoStatus !== todoStatus.TODO);
  const resultIssues = [...filteredIssues
    .flatMap((issue) => issue.issues
      .map((issueItem) => ({ issueStatus: issue.todoStatus, id: issueItem.id, gitUrl })))];
  localStorage.setItem('issues', JSON.stringify(resultIssues));
};
export default saveIssuesToLocalStorage;
