import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { FC, useState } from 'react';
import setSearch from '../../store/actionCreators/repoActions/setSearch';
import { getIssues } from '../../utils/network';
import { issuesResponseType } from '../../types/reponseType/responseType';
import { IReducer } from '../../types/store/reducersTypes/reducersType';
import fetchRequest from '../../utils/queries';

type repoDisplayNameType = { userName: string; repoName: string } | null;

const SearchBar: FC = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [repoDisplayName, setRepoDisplayName] = useState<repoDisplayNameType>(null);
  const repoData = useSelector((state: IReducer) => state.repoReducer);
  const handleInputValue = (value: string) => {
    setInputValue(value);
  };
  const sendRequest = () => {
    const regex = /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)$/i;
    const match = inputValue.match(regex);
    const searchData = {
      repoUrl: inputValue,
      issues: [] as issuesResponseType[] | [],
      loading: true,
      error: false,
    };
    if (match) {
      const userName = match[1];
      const repoName = match[2];
      setRepoDisplayName({ userName, repoName });
      dispatch(setSearch(searchData));
      fetchRequest(getIssues(userName, repoName), 'GET').then((data: issuesResponseType[]) => {
        dispatch(setSearch({
          ...searchData,
          issues: data,
          loading: false,
        }));
      });
    } else {
      dispatch(setSearch({
        ...searchData,
        error: true,
        loading: false,
      }));
    }
  };

  return (
    <>
      <div className="search-bar-wrapper">
        <TextField error={repoData.error} id="standard-basic" label="Standard" variant="standard" value={inputValue} onChange={(e) => { handleInputValue(e.target.value); }} />
        <Button variant="text" onClick={sendRequest}>Text</Button>
      </div>
      <div>
        {repoDisplayName ? (
          <div className="search-bar-links">
            <a href={inputValue}>{`${repoDisplayName.userName}>${repoDisplayName.repoName}`}</a>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default SearchBar;
