import React, { useState } from 'react';
import styles from './todoApp.module.css';
import Icon from '@mdi/react';
import { mdiDeleteOutline } from '@mdi/js';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className={styles.listItem}
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
    >
      <button
        className={styles.checkbox}
        onClick={() => completeTodo(index)}
        style={{
          backgroundColor: todo.isCompleted ? 'dodgerblue' : null,
        }}
      ></button>
      {todo.text}
      <button className={styles.deleteButton} onClick={() => removeTodo(index)}>
        {' '}
        <Icon path={mdiDeleteOutline} size={1} />{' '}
      </button>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form className={styles.addButtonWrapper}>
      <input
        type="text"
        className="input"
        placeholder="Write here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSubmit} className={styles.addButton}>
        ADD
      </button>
    </form>
  );
}

function ToDoApp() {
  const [todos, setTodos] = React.useState([
    {
      text: 'Create TODO APP',
      isCompleted: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos[index]);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>TODO APP</header>
      <TodoForm addTodo={addTodo} />
      <div className={styles.list}>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDoApp;
