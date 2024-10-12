# CRUD Operations with Database Connection

## Project Description
This project implements basic CRUD (Create, Read, Update, Delete) operations using Node.js, Express.js, and MySQL. The front-end is designed to be user-friendly for performing these operations, and the project uses XAMPP for managing the MySQL database. The entire development environment is set up in Visual Studio Code.

## Technologies Used
- **Node.js**
- **Express.js**
- **MySQL (using XAMPP)**
- **Visual Studio Code**

## Features
- Perform CRUD operations: Create, Read, Update, and Delete records from the database.
- Simple and user-friendly web interface for interacting with the database.
- Connected to a MySQL database for data storage and retrieval.

## Prerequisites
Make sure you have the following installed on your machine:
- **Node.js**: [Download here](https://nodejs.org/)
- **XAMPP** (for MySQL database): [Download here](https://www.apachefriends.org/index.html)
- **Visual Studio Code**: [Download here](https://code.visualstudio.com/)

## Setup Instructions

### 1. Clone the Repository
```
git clone https://github.com/iamnirusan/Intern-Tasks.git
cd CRUD-Operations
```
### 2. Navigate to the project directory
```
cd CRUD-Operations
```

### 3. Install Node.js Dependencies
Run the following command to install the necessary Node.js packages:
```bash
npm install
```

### 4. Setup MySQL Database
- Open **XAMPP** and start the **Apache** and **MySQL** services.
- Open **phpMyAdmin** (available at `http://localhost/phpmyadmin`).
- Create a new database named `crud_db`.
- **Import the Database**: Use the backup file provided (`crud_db.sql`) and import it into your `crud_db` database. You can do this in phpMyAdmin by clicking on the **Import** tab.

### 5. Set up environment variables
In the project, there is a `.env` file that handles the database connection variables. Update the credentials (username, password, etc.) based on your local XAMPP setup:

```
DB_HOST=hostname
DB_USER=username
DB_PASSWORD=yourpassword
DB_NAME=crud_db
```

### 6. Run the Project
To start the project, use the following command:
```bash
npm start
```
This will start the server, and the web application will be accessible at `http://localhost:5000`.

### 7. Using the Application
- Visit `http://localhost:5000` in your browser.
- You can create, read, update, and delete records using the simple web interface.

## License
This project is open-source and licensed under the MIT License.






---

Let me know if you need to customize anything!
