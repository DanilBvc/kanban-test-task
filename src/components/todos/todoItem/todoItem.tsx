import {
  Card, CardContent, Typography, CardActions, Button
} from '@mui/material';
import { FC } from 'react';

export type todoItemProps = {
  title: string;
  id: number;
  date: string;
  admin: string;
  comments: number;
};
const TodoItem: FC<todoItemProps> = ({
  title, id, date, admin, comments,
}) => {
  const currentTime = new Date();
  const postTime = new Date(date);
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
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`${id} ${timeAgo}`}
        </Typography>

        <Typography variant="body2">
          {`${admin} | Comments: ${comments}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
