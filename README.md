Here’s a README file for your "todo-using-mongodb" project:

---

# Todo App using MongoDB

A simple and efficient Todo application built with React, Node.js, Express, and MongoDB. This app allows users to manage their tasks with CRUD (Create, Read, Update, Delete) operations. Users can add new tasks, edit existing ones, mark tasks as completed, and remove tasks that are no longer needed. The application also features authentication to ensure that users' data is secure.

## Features

- **User Authentication**: Secure login and registration using JWT.
- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Task Prioritization**: Set task priority (High, Medium, Low).
- **Task Status Management**: Manage task status (Pending, In Progress, Completed).
- **Due Date Management**: Set and update due dates for tasks.
- **Responsive Design**: Optimized for both desktop and mobile use.

## Technologies Used

- **Frontend**:
  - React
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MongoDB
- **Authentication**:
  - JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/agastya3636/todo-using-mongodb.git
   cd todo-using-mongodb
   ```

2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file in the `backend` directory with the following variables:

   ```
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   PORT=8000
   CLIENT_URL=*
   ```

5. **Run the backend**:
   ```bash
   cd backend
   npm run dev
   ```

6. **Run the frontend**:
   ```bash
   cd ../frontend
   npm start
   ```

7. **Access the app**:

   Open your browser and navigate to `http://localhost:3000` to see the app in action.

## Usage

- **Add Task**: Fill out the task form and click "Add Task" to create a new task.
- **Edit Task**: Click the "Edit" button next to a task, make your changes, and click "Update Task".
- **Remove Task**: Click the "Remove" button to delete a task.
- **Change Status**: Update the task status to "Pending", "In Progress", or "Completed".
- **Set Priority**: Choose between "High", "Medium", or "Low" priority.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, feel free to open an issue on GitHub or reach out to [Agastya Kumar Yadav](https://github.com/agastya3636).

---

This README provides a comprehensive overview of your project, including setup instructions, features, and usage details.
