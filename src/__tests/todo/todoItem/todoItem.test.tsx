import { fireEvent, render } from '@testing-library/react';
import TodoItem from '../../../components/todos/todoItem/todoItem';
import { todoStatus } from '../../../types/reponseType/responseType';

const mockTodoItem = {
  created_at: new Date().toISOString(),
  title: 'Test Issue',
  id: 1,
  user: { type: 'user' },
  comments: 0,
  number: 1,
  status: todoStatus.TODO,
};
const onDragStartMock = jest.fn();
const onDragOverMock = jest.fn();
const onDropMock = jest.fn();

describe('TodoItem', () => {
  it('renders correctly', () => {
    const { getByText } = render(<TodoItem
      issue={mockTodoItem}
      onDragOver={onDragOverMock}
      onDragStart={onDragStartMock}
      onDrop={onDropMock}
      board={todoStatus.TODO}
    />);
    expect(getByText('Test Issue')).toBeInTheDocument();
    expect(getByText('1 just now')).toBeInTheDocument();
    expect(getByText('user | Comments: 0')).toBeInTheDocument();
  });
  it('calls onDragStart with correct arguments when item is dragged', () => {
    const { container } = render(<TodoItem
      issue={mockTodoItem}
      onDragOver={onDragOverMock}
      onDragStart={onDragStartMock}
      onDrop={onDropMock}
      board={todoStatus.TODO}
    />);
    const cardElement = container.querySelector('div[draggable="true"]');
    fireEvent.dragStart(cardElement as Element);
    expect(onDragStartMock).toHaveBeenCalledWith(expect.any(Object), todoStatus.TODO, mockTodoItem);
  });

  it('calls onDragOver with correct arguments when item is dragged over', () => {
    const { container } = render(<TodoItem
      issue={mockTodoItem}
      onDragOver={onDragOverMock}
      onDragStart={onDragStartMock}
      onDrop={onDropMock}
      board={todoStatus.TODO}
    />);
    const cardElement = container.querySelector('div[draggable="true"]');
    fireEvent.dragOver(cardElement as Element);
    expect(onDragOverMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it('calls onDrop with correct arguments when item is dropped', () => {
    const { container } = render(<TodoItem
      issue={mockTodoItem}
      onDragOver={onDragOverMock}
      onDragStart={onDragStartMock}
      onDrop={onDropMock}
      board={todoStatus.TODO}
    />);
    const cardElement = container.querySelector('div[draggable="true"]');
    fireEvent.drop(cardElement as Element);
    expect(onDropMock).toHaveBeenCalledWith(expect.any(Object), todoStatus.TODO, mockTodoItem);
  });
});
