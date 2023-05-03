import { issuesResponseType, todoStatus } from '../reponseType/responseType';

export type todoItemProps = {
  issue: issuesResponseType;
  board: todoStatus;
  onDragOver: (event: React.FormEvent) => void;
  onDragLeave: (event: React.FormEvent) => void;
  onDragStart: (event: React.FormEvent,
    board: todoStatus,
    item: issuesResponseType) => void;
  onDragEnd: (event: React.FormEvent) => void;
  onDrop: (event: React.FormEvent, board: todoStatus, item: issuesResponseType) => void;
};
