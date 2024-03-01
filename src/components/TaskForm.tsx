import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, cancelEdit, editTask, clear } from '../features/todos/todoSlice';

interface RootState {
  todos: {
    isEdit: boolean;
    editTask: {
      id: string;
      title: string;
      description: string;
    };
    todos: []
  };
}

function TaskForm() {
  const dispatch = useDispatch();
  const  { isEdit, editTask: editedTask, todos } = useSelector((state: RootState) => state.todos);
  const [taskTitle, setTaskTitle] = useState(editedTask?.title || '');
  const [taskDescription, setTaskDescription] = useState(editedTask?.description || '');

  const handleTask = () => {
    if (taskTitle) {
      if (isEdit) {
        dispatch(editTask({ title: taskTitle, description: taskDescription }));
      } else {
        dispatch(addTask({ title: taskTitle, description: taskDescription }));
      }
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  const onCancel = () => {
    dispatch(cancelEdit());
  };
  
  useEffect(() => {
    setTaskTitle(editedTask.title || '');
    setTaskDescription(editedTask.description || '');
  }, [editedTask.description, editedTask.title, isEdit]);

  const onClear = () => {
    dispatch(clear())
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        style={{ padding: '0.5rem', margin: '0.25rem' }}
      />
      <input
        type="text"
        placeholder="Task description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        style={{ padding: '0.5rem', margin: '0.25rem' }}
      />
      <button style={{ padding: '0.5rem', margin: '0.25rem' }} onClick={handleTask}>
        {isEdit ? 'Edit Task' : 'Add Task'}
      </button>
      {isEdit && (
        <button style={{ padding: '0.5rem', margin: '0.25rem' }} onClick={onCancel}>
          Cancel
        </button>
      )}
      {todos.length > 0 && !isEdit && (
        <button style={{ padding: '0.5rem', margin: '0.25rem' }} onClick={onClear}>
        Clear
      </button>
      )}
    </div>
  );
}

export default TaskForm;
