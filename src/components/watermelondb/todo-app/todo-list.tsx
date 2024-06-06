import withObservables from '@nozbe/with-observables';
import {Query} from '@nozbe/watermelondb';
import {compose} from 'recompose';
import {database} from '../db';
import {TodoModel} from '../models';
import {TodoItem} from './todo-item';

export type EnhanceTodoListProps = {
  todos: Query<TodoModel>;
};

export type TodoListProps = {
  todos: TodoModel[];
};

const enhance = withObservables(['todos'], ({todos}: EnhanceTodoListProps) => ({
  todos: todos.observe(),
}));

export const TodoList = enhance(({todos}: TodoListProps) => {
  return (
    <ul className="todo-list">
      {
        todos.length ? 
        todos.map(todo => (<TodoItem key={todo.id} todo={todo} />)) :
        <p>数据库里暂时没有 todo.</p>
      }
    </ul>
  );
});