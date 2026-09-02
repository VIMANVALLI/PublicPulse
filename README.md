# 📊 Public Opinion Analysis System

### React + FastAPI Full-Stack Web Application

A full-stack web application designed to collect, manage, and analyze public opinions. The system provides separate functionalities for **Administrators** and **Users**, including dataset management, opinion collection, feedback analysis, and recommendations.

---

## 🌐 Project Links

### 🚀 Live Project

👉 **https://publicpulse-vv.onrender.com/**

### 🎥 Project Video / Tutorial

👉 **https://youtu.be/Qd1UTL0NWyc?si=_WNR8GBkwQNRLPnf**

### 📂 GitHub Repository

👉 **Add your GitHub repository URL here**

---

# 📌 Project Overview

The **Public Opinion Analysis System** is a full-stack web application developed using **React.js** for the frontend and **Python FastAPI** for the backend.

The application allows administrators to upload datasets, analyze public opinions, and monitor positive and negative feedback. Users can create accounts, log in, view available datasets, submit their opinions, and view feedback and recommendations.

The system uses **SQLite** as the database and **JWT authentication** to provide secure login and authorization.

---

# 🎯 Objectives

The main objectives of this project are:

* To provide a platform for collecting public opinions.
* To analyze positive and negative opinions.
* To allow administrators to manage datasets.
* To provide separate Admin and User functionalities.
* To implement secure authentication using JWT.
* To generate recommendations based on collected opinions.
* To provide an easy-to-use web interface.
* To demonstrate full-stack application development using React and FastAPI.

---

# 🛠️ Technology Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM
* JavaScript
* HTML
* CSS

## Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* JWT Authentication

## Database

* SQLite

## Deployment

* Render

## Development Tools

* Visual Studio Code
* Git
* GitHub
* npm
* Python
* Postman / Swagger UI

---

# 🏗️ System Architecture

The application follows a full-stack architecture:

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │   Tailwind CSS      │
                    └──────────┬──────────┘
                               │
                         Axios / API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   FastAPI Backend   │
                    │      Python         │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │    SQLite DB    │        │ Dataset Uploads │
        └─────────────────┘        └─────────────────┘
```

---

# 📁 Project Structure

The project is divided into two main parts:

```text
PublicPulse/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.css
│   │
│   └── package.json
│
└── backend/
    ├── main.py
    ├── models.py
    ├── schemas.py
    ├── database.py
    ├── auth.py
    ├── requirements.txt
    └── uploads/
```

---

# 🖥️ FRONTEND SETUP

## 📁 Frontend Folder Structure

```text
frontend/
│
├── src/
│   ├── pages/
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   └── index.css
│
└── package.json
```

---

# 🔧 Install Frontend Dependencies

Open a terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install the existing project dependencies:

```bash
npm install
```

If required, install Axios and React Router:

```bash
npm install axios react-router-dom
```

---

# 🎨 Install Tailwind CSS

Install Tailwind CSS and its dependencies:

```bash
npm install -D tailwindcss@3 postcss autoprefixer
```

Initialize Tailwind CSS:

```bash
npx tailwindcss init -p
```

---

# ⚙️ Tailwind Configuration

The `tailwind.config.js` file can be configured as follows:

```javascript
export default {
  content: ["./src/**/*.{js,jsx}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

# 🎨 CSS Configuration

Inside:

```text
src/index.css
```

add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

# ▶️ Run Frontend

Start the React development server:

```bash
npm start
```

The frontend will normally run at:

```text
http://localhost:3000
```

---

# 🐍 BACKEND SETUP

## 📁 Backend Folder Structure

```text
backend/
│
├── main.py
├── models.py
├── schemas.py
├── database.py
├── auth.py
├── requirements.txt
└── uploads/
```

---

# 🔧 Install Backend Dependencies

Navigate to the backend directory:

```bash
cd backend
```

Install all required Python packages:

```bash
pip install -r requirements.txt
```

---

# ▶️ Run Backend

Start the FastAPI server using Uvicorn:

```bash
uvicorn main:app --reload
```

The backend will normally run at:

```text
http://localhost:8000
```

---

# 📚 API Documentation

FastAPI automatically provides interactive API documentation.

Open:

```text
http://localhost:8000/docs
```

The Swagger UI allows developers to:

* View available API endpoints.
* Test API requests.
* Check request parameters.
* Check API responses.
* Test authentication-protected endpoints.

---

# 🔐 Authentication

The application uses **JWT (JSON Web Token)** based authentication.

The authentication system provides:

* User registration.
* User login.
* Token generation.
* Authenticated API requests.
* Role-based access for Admin and User functionality.

After successful login, the authentication token can be used to access protected backend APIs.

---

# 👨‍💼 ADMIN FEATURES

The Admin section provides functionality for managing and analyzing public opinion data.

## Admin can:

* Login securely.
* Upload datasets.
* View uploaded datasets.
* Analyze datasets.
* View user opinions.
* View positive feedback.
* View negative feedback.
* View recommendations.
* Monitor collected public opinions.

---

# 👤 USER FEATURES

The User section provides functionality for normal users.

## Users can:

* Create an account.
* Login securely.
* View available datasets.
* Submit opinions.
* View feedback.
* View recommendations.
* Interact with the public opinion system.

---

# 📊 Dataset Management

Administrators can upload datasets through the Admin dashboard.

Uploaded files are stored in:

```text
backend/uploads/
```

The backend processes the uploaded data and makes it available for analysis.

Dataset analysis helps identify patterns in public opinions.

---

# 👍 Positive and Negative Opinions

The system collects user opinions and categorizes them into:

* Positive opinions
* Negative opinions

This allows administrators to understand how users feel about the information or subjects represented in the dataset.

---

# 💡 Recommendation System

The application provides recommendations based on the available opinion and analysis data.

The recommendation functionality is intended to help users understand the analyzed results and discover relevant information.

---

# 🔗 FRONTEND–BACKEND CONNECTION

The React frontend communicates with the FastAPI backend through REST API requests.

The API configuration is located at:

```text
frontend/src/services/api.js
```

Example local development configuration:

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export default API;
```

For production deployment, the frontend should use the deployed backend URL instead of the local `localhost` URL.

---

# 🌍 DEPLOYMENT

The project is deployed using **Render**.

## Frontend

Live application:

```text
https://publicpulse-vv.onrender.com/
```

The deployed frontend provides access to the Public Opinion Analysis System through a web browser.

---

# 🧪 TEST FLOW

The following flow can be used to test the complete application:

### Step 1 — Start Backend

```bash
cd backend
uvicorn main:app --reload
```

### Step 2 — Start Frontend

Open another terminal:

```bash
cd frontend
npm start
```

### Step 3 — Admin Login

Login using the administrator account configured for the application.

### Step 4 — Upload Dataset

Upload a dataset through the Admin dashboard.

### Step 5 — Analyze Dataset

Use the analysis functionality to process and view the dataset.

### Step 6 — Create User Account

Register a new user using the signup page.

### Step 7 — User Login

Login using the newly created user account.

### Step 8 — Submit Opinion

Submit a positive or negative opinion.

### Step 9 — Admin Verification

Return to the Admin dashboard and verify that the submitted opinion is available.

### Step 10 — View Recommendations

Check the recommendation section based on the available analysis and opinions.

---

# 🧪 Testing

The following areas should be tested:

| Test Case           | Expected Result                              |
| ------------------- | -------------------------------------------- |
| User Registration   | Account should be created                    |
| User Login          | User should be authenticated                 |
| Invalid Login       | Login should be rejected                     |
| Admin Login         | Admin dashboard should open                  |
| Dataset Upload      | Dataset should be uploaded                   |
| Dataset View        | Uploaded dataset should be displayed         |
| Dataset Analysis    | Analysis should be generated                 |
| Submit Opinion      | Opinion should be stored                     |
| Positive Opinion    | Positive feedback should be displayed        |
| Negative Opinion    | Negative feedback should be displayed        |
| Recommendations     | Recommendations should be displayed          |
| Unauthorized Access | Protected functionality should be restricted |

---

# 🔒 Security

The application implements authentication and authorization using JWT.

Security-related features include:

* JWT-based authentication.
* Protected API endpoints.
* Separate Admin and User functionality.
* Authenticated user requests.
* Backend validation.
* CORS configuration.

> For production applications, secret keys, passwords, and other sensitive credentials should be stored using environment variables rather than being committed to GitHub.

---

# 🗄️ DATABASE

The project uses **SQLite** as its database.

The database file is:

```text
app.db
```

The database is responsible for storing application-related information such as:

* User information.
* Authentication-related data.
* Opinions.
* Dataset-related information.
* Other application records.

---

# 📦 IMPORTANT FILES

## `main.py`

The main FastAPI application file.

It contains the application's API routes and backend logic.

## `models.py`

Contains database models used by the application.

## `schemas.py`

Contains data schemas used for request and response validation.

## `database.py`

Contains database configuration and connection-related functionality.

## `auth.py`

Contains authentication-related functionality such as JWT handling and authentication logic.

## `api.js`

Contains the Axios configuration used by the React frontend to communicate with the backend.

---

# 📌 Developer Notes

* Uploaded datasets are stored in `backend/uploads/`.
* The SQLite database is stored as `app.db`.
* The frontend communicates with the backend using Axios.
* FastAPI provides interactive Swagger API documentation.
* JWT is used for authentication.
* CORS is configured to allow frontend-backend communication.
* Production credentials and secret keys should be stored securely.
* Do not commit `.env` files containing sensitive credentials to GitHub.

---

# ▶️ RUN THE COMPLETE PROJECT

Open two terminals.

## Terminal 1 — Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

## Terminal 2 — Frontend

```bash
cd frontend
npm install
npm start
```

Frontend:

```text
http://localhost:3000
```

---

# 🚀 Production Project

The project is available online at:

### PublicPulse

**https://publicpulse-vv.onrender.com/**

Users can access the deployed application directly through a web browser.

---

# 🎥 Video Resource

A video related to the project is available here:

**https://youtu.be/Qd1UTL0NWyc?si=_WNR8GBkwQNRLPnf**

---

# ⭐ Key Features Summary

```text
                    PUBLICPULSE
                        │
        ┌───────────────┴───────────────┐
        │                               │
      ADMIN                            USER
        │                               │
  ┌─────┴─────┐                   ┌─────┴─────┐
  │           │                   │           │
Dataset    Analysis            Register     Login
Management     │                   │           │
  │        Opinions             View        Submit
  │        Analysis           Dataset       Opinion
  │            │                   │           │
  └────── Recommendations ─────────┴───────────┘
```

---

# 🔮 Future Enhancements

The following features can be added in future versions:

* Advanced sentiment analysis.
* AI-powered opinion classification.
* Interactive charts and graphs.
* Real-time opinion analytics.
* Advanced recommendation algorithms.
* Export analysis reports.
* Cloud database integration.
* Email notifications.
* Improved role-based access control.
* Mobile application.
* Advanced admin analytics dashboard.

---

# ✅ Advantages

* Simple and user-friendly interface.
* Full-stack architecture.
* Separate Admin and User roles.
* Secure JWT authentication.
* Dataset management.
* Opinion collection.
* Positive and negative feedback analysis.
* Recommendation functionality.
* REST API architecture.
* Interactive FastAPI documentation.
* Deployable web application.

---

# ⚠️ Limitations

* SQLite is mainly suitable for lightweight applications and development.
* Advanced analytics may require additional data-processing capabilities.
* The application depends on backend availability.
* More advanced AI-based sentiment analysis can be added in future versions.
* Production deployments require proper environment and security configuration.

---

# 📖 Learning Resources

### React.js

React is used to build the interactive frontend of the application.

### FastAPI

FastAPI is used to create the Python REST API backend.

### Tailwind CSS

Tailwind CSS is used for styling and responsive UI development.

### SQLite

SQLite is used as the application's lightweight relational database.

### JWT

JWT is used for authentication and secure access to protected functionality.

---

# 👨‍💻 Developer

**Public Opinion Analysis System**

Full-stack project developed using:

```text
React.js
+
Tailwind CSS
+
Python FastAPI
+
SQLite
+
JWT
+
Axios
```

---

# 📄 License

This project is created for educational and project development purposes.

---

# 🟢 Project Status

**Status: Completed / Deployed**

🌐 **Live Application:**
https://publicpulse-vv.onrender.com/


---

## ⭐ Thank You

Thank you for visiting the **Public Opinion Analysis System** project.
