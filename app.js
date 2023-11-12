const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Create a MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "systemACCESS7",
  database: "project1",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validate password
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match. Please try again.');
    }

    // Hash the password
    const hashed_password = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const checkUserQuery = `SELECT * FROM users WHERE username = ? OR email = ?`;
    const existingUser = await db.query(checkUserQuery, [username, email]);

    if (existingUser.length > 0) {
      return res.status(400).send('Username or email already exists. Please choose a different one.');
    }

    // Insert the new user into the database
    const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    await db.query(insertUserQuery, [username, email, hashed_password]);

    console.log('User registration successful');
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error. Please try again later.');
  }
});


// Create a User table if not exists
const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

db.query(createUserTable, (err) => {
  if (err) {
    console.error('Error creating user table:', err);
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rest of the code remains the same...
app.listen(PORT);