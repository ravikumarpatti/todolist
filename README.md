<!-- ABOUT THE PROJECT -->
## About The Project
TodoApp

This TodoApp is a simple task management application built with React and Redux with typescript.

## Features
1. Add Task: Add a new task with a title and description where description is optional.
2. Complete Task: Mark tasks as complete or pending (you can toggle between them).
3. Delete Task: Remove tasks from the list.
4. Edit Task: Modify the title and description of existing tasks.
5. Cancel Edit: Cancel the task editing process.
6. Clear Completed: Remove all completed tasks from the list.
7. Fetch Todos from API: Fetch initial todos from JSONPlaceholder API.

## Technologies Used
React
Redux Toolkit
TypeScript
JSONPlaceholder API

## Getting Started
Setup
1. Clone the repository: git clone https://github.com/ravikumarpatti/todolist.git
2. Install dependencies: npm install
3. Run the application: npm run dev

## Usage
1. Add tasks by providing a title and description.
2. Use the "Complete" button to toggle the completion status of a task.
3. Click "Edit" to modify the title and description of a task.
4. "Delete" removes a task from the list.
5. "Clear Completed" removes all completed tasks from the list.
6. API data is fetched automatically on application startup.

## Folder Structure
src/components: React components for UI.
src/features/todos: Redux slice, actions, and thunks.
src/app: Redux store configuration.

## Contributing
If you'd like to contribute to TodoApp, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make changes and commit them.
Push to your fork and submit a pull request.