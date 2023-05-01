import { useState } from 'react';
import './todos.scss';
import { useSelector } from 'react-redux';
import { IReducer } from '../../types/store/reducersTypes/reducersType';
import TodoItem from './todoItem/todoItem';

const Todos = () => {
  const [dragging, setDragging] = useState(false);
  const repoState = useSelector((state: IReducer) => state.repoReducer);
  const handleDragEnter = (event: React.FormEvent) => {
    event.preventDefault();
    setDragging(true);
  };
  return (
    <div>
      <div className="todo">
        {repoState.issues.map((issue) => (
          <TodoItem
            key={issue.created_at}
            title={issue.title}
            id={issue.number}
            date={issue.created_at}
            admin={issue.user.type}
            comments={issue.comments}
          />
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
