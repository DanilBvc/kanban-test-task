import { todoStatus } from '../../types/reponseType/responseType';
import { initialRepoType } from '../../types/store/reducersTypes/repoReducerTypes';

const initialRepoState: initialRepoType = {
  repoUrl: '',
  issues: [
    { todoStatus: todoStatus.DONE, issues: [] },
    { todoStatus: todoStatus.IN_PROGRESS, issues: [] },
    { todoStatus: todoStatus.TODO, issues: [] },
  ],
};
export default initialRepoState;
