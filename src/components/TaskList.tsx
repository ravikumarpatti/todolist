import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTodos,
  completeTask,
  deleteTask,
  edit,
  Todo,
  fetchTodosAsync
} from '../features/todos/todoSlice';

// type FetchTodosAction = ReturnType<typeof fetchTodosAsync.fulfilled>;

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const handleComplete = (taskId: string) => {
    dispatch(completeTask(taskId));
  };

  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleEdit = (task: Todo) => {
    dispatch(edit(task));
  };

  React.useEffect(() => {
    // Dispatch the async thunk when the component mounts
    dispatch(fetchTodosAsync() as any);
  }, [dispatch]);

  return (
    <div>
      <ul style={{ padding: "0px", width: "100%", listStyleType: "none" }}>
        {todos && todos.map((task, index) => (
          <li
            key={task.id}
            style={{
              width: "100%",
              backgroundColor: index % 2 === 0 ? "#E0E0E0" : "white",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                padding: "0.5rem",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <span
                style={{
                  textDecoration: task.isComplete ? "line-through" : "none",
                  fontWeight: 'bold'
                }}
              >
                {task.title}
              </span>
              {task.description && <p>{task.description}</p>}
            </div>
            <div>
              <button
                style={{ margin: "0.5rem" }}
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
              <button
                style={{ margin: "0.5rem", border: !task.isComplete ? '2px solid red': '2px solid green' }}
                onClick={() => handleComplete(task.id)}
              >
                {task.isComplete ? 'Completed' : 'Pending'}
              </button>
              <button
                style={{ margin: "0.5rem" }}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
