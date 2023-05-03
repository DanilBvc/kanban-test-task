/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react';
import './todos.scss';
import { useSelector, useDispatch } from 'react-redux';
import { IReducer } from '../../types/store/reducersTypes/reducersType';
import TodoItem from './todoItem/todoItem';
import { issuesResponseType, todoStatus } from '../../types/reponseType/responseType';
import setSearch from '../../store/actionCreators/repoActions/setSearch';
import moveTodo from '../../store/actionCreators/repoActions/moveTodo';

const Todos = () => {
  const repoState = useSelector((state: IReducer) => state.repoReducer);
  console.log(repoState);
  const [currentTodo, setCurrentTodo] = useState<null | issuesResponseType>(null);
  const [currentBoard, setCurrentBoard] = useState<null | todoStatus>(null);
  const dispatch = useDispatch();
  const dragOverHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };
  const dragLeaveHandler = (event: React.FormEvent) => {

  };
  const dragStartHandler = (
    event: React.FormEvent,
    board: todoStatus,
    item: issuesResponseType
  ) => {
    setCurrentBoard(board);
    setCurrentTodo(item);
  };
  const dragEndHandler = (event: React.FormEvent) => {

  };
  const dropHandler = (event: React.FormEvent, board: todoStatus, item: issuesResponseType) => {
    event.preventDefault();
    if (currentBoard && currentTodo) {
      dispatch(moveTodo({
        repoUrl: repoState.repoUrl,
        issues: repoState.issues,
        changeTodoStatus: {
          fromBoard: currentBoard,
          fromTodo: currentTodo,
          toBoard: board,
          toTodo: item,
        },
      }));
    }
  };
  const dropTodoHandler = (e: React.FormEvent, board: todoStatus) => {
    if (currentBoard && currentTodo) {
      dispatch(moveTodo({
        repoUrl: repoState.repoUrl,
        issues: repoState.issues,
        changeTodoStatus: {
          fromBoard: currentBoard,
          fromTodo: currentTodo,
          toBoard: board,
        },
      }));
    }
  };
  return (
    <div>
      <div className="todo">
        {repoState.issues.map((item) => (
          <div className="board" key={item.todoStatus} onDragOver={dragOverHandler} onDrop={(e) => { dropTodoHandler(e, item.todoStatus); }}>
            {item.todoStatus}
            {item.issues ? item.issues.map((issue) => (
              <TodoItem
                onDragOver={dragOverHandler}
                onDragLeave={dragLeaveHandler}
                onDragStart={dragStartHandler}
                onDragEnd={dragEndHandler}
                onDrop={dropHandler}
                key={issue.created_at}
                issue={issue}
                board={item.todoStatus}
              />
            )) : null}
          </div>
        ))}
      </div>
      <div className="in-progress">

      </div>
      <div className="done">

      </div>
    </div>
  );
};

export default Todos;
