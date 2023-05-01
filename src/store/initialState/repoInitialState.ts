import { initialRepoType } from '../../types/store/reducersTypes/repoReducerTypes';

const initialRepoState: initialRepoType = {
  repoUrl: '',
  issues: [],
  loading: false,
  error: false,
};
export default initialRepoState;
