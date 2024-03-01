import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function TodoApp() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
      <h1>Todo App</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default TodoApp;
