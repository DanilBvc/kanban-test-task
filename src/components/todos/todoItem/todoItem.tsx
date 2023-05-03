/* eslint-disable camelcase */
import {
  Card, CardContent, Typography, CardActions, Button
} from '@mui/material';
import { FC } from 'react';
import { todoItemProps } from '../../../types/componentsType/componentsType';

const TodoItem: FC<todoItemProps> = ({
  issue,
  onDragOver,
  onDragLeave,
  onDragStart,
  onDragEnd,
  onDrop,
  board,
}) => {
  const {
    created_at, title, id, user, comments,
  } = issue;
  const currentTime = new Date();
  const postTime = new Date(created_at);
  const timeDiff = currentTime.getTime() - postTime.getTime();
  const diffInMin = Math.round(timeDiff / 60000);
  const diffInHrs = Math.round(timeDiff / 3600000);
  const diffInDays = Math.round(timeDiff / 86400000);
  let timeAgo = '';
  if (diffInDays > 1) {
    timeAgo = `opened ${diffInDays} days ago`;
  } else if (diffInDays === 1) {
    timeAgo = 'opened 1 day ago';
  } else if (diffInHrs > 0) {
    timeAgo = `opened ${diffInHrs} hours ago`;
  } else if (diffInMin > 0) {
    timeAgo = `opened ${diffInMin} minutes ago`;
  } else {
    timeAgo = 'just now';
  }
  return (
    <Card
      sx={{ minWidth: 275, cursor: 'pointer' }}
      draggable
      onDragOver={(e) => { onDragOver(e); }}
      onDragLeave={(e) => { onDragLeave(e); }}
      onDragStart={(e) => { onDragStart(e, board, issue); }}
      onDragEnd={(e) => { onDragEnd(e); }}
      onDrop={(e) => { onDrop(e, board, issue); }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`${id} ${timeAgo}`}
        </Typography>

        <Typography variant="body2">
          {`${user.type} | Comments: ${comments}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
