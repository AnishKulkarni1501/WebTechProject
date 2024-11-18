const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');  // Import path module

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the build folder of your React app
app.use(express.static(path.join(__dirname, 'signup-login', 'build')));

// MongoDB connection URI and database name
const uri = 'mongodb://localhost:27017';  // Local MongoDB URI
const dbName = 'userdb';  // Database name

// MongoDB Client
const MongoClient = mongodb.MongoClient;

// Serve Sign-Up page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Serve Sign-In page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle user Sign-Up (Registration)
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('users');

    // Check if username already exists
    const existingUser = await collection.findOne({ username: username });
    if (existingUser) {
      res.send('Username already exists. Please choose another.');
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    await collection.insertOne({ username: username, password: hashedPassword });

    res.send('Sign-Up successful! You can now <a href="/">Log In</a>.');
    client.close();
  } catch (error) {
    console.error('Error during Sign-Up:', error);
    res.send('Error during Sign-Up. Please try again later.');
  }
});

// Handle user Sign-In (Login)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('users');

    // Find user by username
    const user = await collection.findOne({ username: username });

    if (user) {
      // Compare password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.send('Login successful!');
      } else {
        res.send('Invalid password');
      }
    } else {
      res.send('User not found');
    }

    client.close();
  } catch (error) {
    console.error('Error during Sign-In:', error);
    res.send('Error during Sign-In. Please try again later.');
  }
});

// Serve the React app by default (for all other requests)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup-login', 'build', 'index.html'));
});

// Listen on port 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
