
const express = require('express');
const fs = require('fs').promises;

const app = express();
app.use(express.json()); 


app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


app.get('/users', async (req, res) => {
  try {
    const data = await fs.readFile('./users/users.json', 'utf8');
    const users = JSON.parse(data);
    res.json(users);
  } catch (err) {
    console.error('Error reading users.json:', err.message);
    res.status(500).send('Failed to read user data');
  }
});


app.post('/users', async (req, res) => {
  try {
    const newUser = req.body;
    const data = await fs.readFile('./users/users.json', 'utf8');
    const users = JSON.parse(data);
    users.push(newUser);

    await fs.writeFile('./users/users.json', JSON.stringify(users, null, 2));
    res.status(201).send('User added');
  } catch (err) {
    console.error('Error saving user:', err.message);
    res.status(500).send('Failed to save user');
  }
});

app.listen(3000, () => {
  console.log('Express app running at http://localhost:3000');
});