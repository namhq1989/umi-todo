import { useState } from 'react';

export default () => {
  const [newTodoName, setNewTodoName] = useState('');
  const onNewTodoNameChange = (value: string) => setNewTodoName(value);
  return { newTodoName, onNewTodoNameChange };
};