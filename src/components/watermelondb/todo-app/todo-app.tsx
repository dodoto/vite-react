import {FC, FormEvent, useEffect, useRef, useState} from 'react';
import {Query} from '@nozbe/watermelondb';
import { useCollection } from '../db';
import {TodoModel, ITodoModelAddableFields} from '../models';
import {TodoList} from './todo-list';
import './todo.css';

export const TodoApp: FC = () => {
  const { data, add } = useCollection<TodoModel, ITodoModelAddableFields>('todos');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const value = inputRef.current!.value;
    if (value.trim().length > 0) {
      add({
        taskId: new Date().getTime().toString(),
        task: value,
        prepareCompletedAt: new Date(),
      });
    }
    inputRef.current!.value = '';
  }

  return (
    <div className="todo-app">
      <form onSubmit={handleSubmit}>
        <input 
          ref={inputRef} 
          className="todo-input"
          placeholder="todo, 回车添加, 左键完成, 右键删除" 
        />
      </form>
      {data && <TodoList todos={data} />}
    </div>
  );
};