import { issuesResponseType } from '../../types/reponseType/responseType';
import { repoReducerActions } from '../../types/store/actions/actionsType';
import { initialRepoType } from '../../types/store/reducersTypes/repoReducerTypes';
import initialRepoState from '../initialState/repoInitialState';

const repoReducer = (state: initialRepoType = initialRepoState, action: {
  type: repoReducerActions; payload: {
    repoUrl: string;
    issues: issuesResponseType[] | [];
    loading: boolean;
    error: boolean;
  };
}) => {
  switch (action.type) {
    case repoReducerActions.SET_SEARCH: {
      const { payload } = action;
      return {
        repoUrl: payload.repoUrl,
        issues: payload.issues,
        loading: payload.loading,
        error: payload.error,
      };
    }
    default: return state;
  }
};

export default repoReducer;
