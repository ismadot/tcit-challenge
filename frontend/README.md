# 🚀 TCIT Challenge Repository

Welcome to the **TCIT Challenge Repository**! This project includes a modern full-stack web application with a Flask-based backend and a React + Redux frontend. Everything is containerized using Docker for easy setup and deployment.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [Endpoints](#endpoints)
- [Development Notes](#development-notes)
- [FAQ](#faq)

---

## 🔧 Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- Node.js (for optional local frontend testing)
- Python 3.9 (for optional local backend testing)

---

## 📂 Project Structure

```
├── backend
│   ├── app.py           # Main Flask app
│   ├── models.py        # Database models
│   ├── routes.py        # API endpoints
│   ├── migrations/      # Alembic migration files
│   ├── requirements.txt # Python dependencies
│   └── populate_db.sh   # Script to populate the database
├── frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # React pages
│   │   └── store/       # Redux store
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite config
├── docker-compose.yml   # Docker Compose file
├── README.md            # This file
└── .env                 # Environment variables
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/ismadot/tcit-challenge.git
cd tcit-challenge
```

### 2. Environment Setup

Create a `.env` file in the `backend` directory:
```env
DATABASE_URL=postgresql://user:password@db:5432/mydatabase
```

If you prefer to use SQLite instead of PostgreSQL, no additional setup is required, as the backend is configured to fall back to SQLite by default.

### 3. Build and Run the Containers

Build and start the entire application:
```bash
docker-compose up --build
```
This will:
- Set up a PostgreSQL database
- Start the Flask backend
- Start the React frontend
- Populate the database with sample data (if empty)

### Optional: Populate the Database
If you want to add custom records, run the `populate_db.sh` script manually:
```bash
docker exec -it populate_db ./populate_db.sh
```
This script checks if the database is empty and inserts 15 creative sample records if no data exists.

### Running Without Docker

#### Backend (Flask):
1. Create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows use venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask app:
   ```bash
   python app.py
   ```

#### Frontend (React):
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### Populate the Database Manually (Without Docker):
1. Ensure your backend is running and connected to the PostgreSQL or SQLite database.
2. Run the `populate_db.sh` script:
   ```bash
   cd backend
   chmod +x populate_db.sh
   ./populate_db.sh
   ```
   This script will check if the `Posts` table is empty and populate it with 15 records if necessary.

---

## 📜 Available Scripts

### Backend (Flask)

- Access the backend logs:
  ```bash
  docker logs backend_app
  ```

- Run database migrations manually:
  ```bash
  docker exec -it backend_app flask db upgrade
  ```

### Frontend (React)

- Access the frontend logs:
  ```bash
  docker logs frontend_app
  ```

- Install new npm packages (optional):
  ```bash
  docker exec -it frontend_app npm install <package-name>
  ```

---

## 📡 Endpoints

### Backend API Endpoints

- **GET /posts**
  Fetch all posts.

- **POST /posts**
  Add a new post.

- **PUT /posts/<id>**
  Update a specific post.

- **DELETE /posts/<id>**
  Delete a specific post.

---

## 📝 Development Notes

- The frontend is built using **React** with **Redux Toolkit** and **Vite** for fast builds.
- The backend uses **Flask**, **SQLAlchemy**, and **Flask-Migrate** for database migrations.
- Docker ensures consistency across environments.

### Common Issues

- **Database Connection Errors:** Ensure the `DATABASE_URL` in `.env` matches your database settings.
- **CORS Issues:** Make sure the Flask app includes proper CORS settings.

---

## 🙋‍♂️ FAQ

### How do I stop the application?
Run:
```bash
docker-compose down
```

### How do I reset the database?
Remove the volume and re-run migrations:
```bash
docker-compose down -v
rm -rf backend/migrations
```
Then start the containers again:
```bash
docker-compose up --build
```

### How can I access the frontend?
Open your browser and navigate to:
```
http://localhost:5173
```

---

Happy coding! 🎉

