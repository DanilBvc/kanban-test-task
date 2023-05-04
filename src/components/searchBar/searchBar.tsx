import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import { useDispatch } from 'react-redux';
import { FC, useState } from 'react';
import setSearch from '../../store/actionCreators/repoActions/setSearch';
import { getIssues } from '../../utils/network';
import { issuesResponseType, todoStatus } from '../../types/reponseType/responseType';
import fetchRequest from '../../utils/queries';
import './searchBar.scss';
import { repoDisplayNameType } from '../../types/componentsType/componentsType';

const SearchBar: FC = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [errors, setErorrs] = useState(false);
  const [repoDisplayName, setRepoDisplayName] = useState<repoDisplayNameType>(null);
  const handleInputValue = (value: string) => {
    setInputValue(value);
  };
  const sendRequest = () => {
    const regex = /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)$/i;
    const match = inputValue.match(regex);
    const searchData = {
      repoUrl: inputValue,
      issues: [] as issuesResponseType[] | [],
      status: todoStatus.TODO,
    };
    if (match) {
      const userName = match[1];
      const repoName = match[2];
      setRepoDisplayName({ userName, repoName });
      fetchRequest(getIssues(userName, repoName), 'GET').then((data: issuesResponseType[] | []) => {
        if (data.length > 0) {
          const issueArray = data.map((item) => ({ ...item, status: todoStatus.TODO }));
          dispatch(setSearch({
            ...searchData,
            issues: issueArray,
          }));
        }
        setErorrs(false);
      });
    } else {
      setErorrs(true);
      dispatch(setSearch({
        ...searchData,
      }));
    }
  };

  return (
    <>
      <div className="search-bar-wrapper">
        <TextField sx={{ width: '85%' }} error={errors} id="standard-basic" label="Enter repo URL" variant="standard" value={inputValue} onChange={(e) => { handleInputValue(e.target.value); }} />
        <Button sx={{ width: '15%' }} variant="text" onClick={sendRequest}>Load issues</Button>
      </div>
      <div className="search-bar-links-container">
        {repoDisplayName ? (
          <div className="search-bar-links">
            <a className="repo-link" href={inputValue}>{`${repoDisplayName.userName}>${repoDisplayName.repoName}`}</a>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default SearchBar;
