import { Dispatch } from 'redux';
import { issuesResponseType } from '../../types/reponseType/responseType';
import { repoReducerActions } from '../../types/store/actions/actionsType';
import { initialRepoType } from '../../types/store/reducersTypes/repoReducerTypes';

const saveTodos = (store: initialRepoType) => (next: Dispatch) => (action: {
  type: repoReducerActions; payload: {
    repoUrl: string;
    issues: issuesResponseType[] | [];
    loading: boolean;
    error: boolean;

  };
}) => {
  // save todos to local storage

  const result = next(action);
  return result;
};
export default saveTodos;
