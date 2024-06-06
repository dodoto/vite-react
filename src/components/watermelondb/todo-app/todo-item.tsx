import withObservables from '@nozbe/with-observables';
import { MouseEventHandler } from 'react';
import {TodoModel} from '../models';

// export type EnhanceTodoItemProps = {
//   todo: Query<TodoModel>;
// };

export type TodoItemProps = {
  todo: TodoModel;
};

const enhance = withObservables(['todo'], ({todo}: TodoItemProps) => ({
  todo,
}));

export const TodoItem = enhance(({todo}: TodoItemProps) => {
  const handleDelete: MouseEventHandler = (e) => {
    e.preventDefault();
    todo.deleteTodo();
  };
  const handleComplete = () => {
    todo.completeTodo();
  };
  const className = todo.isCompleted ? 'todo-item todo-item-completed' : 'todo-item'
  return (
    <li 
      className={className}
      onContextMenu={handleDelete}
      onClick={handleComplete}>
        <>
          {todo.task}
          {
            todo.helpText && todo.helpText
          }
        </>
      </li>
  );
});