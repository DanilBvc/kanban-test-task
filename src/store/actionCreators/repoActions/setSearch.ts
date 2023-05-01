import { issuesResponseType } from '../../../types/reponseType/responseType';
import { repoReducerActions } from '../../../types/store/actions/actionsType';

const setSearch = (payload: {
  repoUrl: string;
  issues: [] | issuesResponseType[];
  loading: boolean;
  error: boolean;
}) => ({
  type: repoReducerActions.SET_SEARCH,
  payload,
});
export default setSearch;
