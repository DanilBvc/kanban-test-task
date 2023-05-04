/* eslint-disable camelcase */
import {
  Card, CardContent, Typography
} from '@mui/material';
import { FC } from 'react';
import { todoItemProps } from '../../../types/componentsType/componentsType';
import getTimeAgo from '../../../utils/getTimeAgo';

const TodoItem: FC<todoItemProps> = ({
  issue,
  onDragStart,
  onDragOver,
  onDrop,
  board,
}) => {
  const {
    created_at, title, id, user, comments,
  } = issue;

  return (
    <Card
      sx={{ cursor: 'pointer' }}
      draggable
      onDragOver={(e) => { onDragOver(e); }}
      onDragStart={(e) => { onDragStart(e, board, issue); }}
      onDrop={(e) => { onDrop(e, board, issue); }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`${id} ${getTimeAgo(created_at)}`}
        </Typography>

        <Typography variant="body2">
          {`${user.type} | Comments: ${comments}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
