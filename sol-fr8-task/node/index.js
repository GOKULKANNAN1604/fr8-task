const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1/fr8', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a new schema for my  data
const userSchema = new mongoose.Schema({
  name: String,
  book: String,
  entryDate: Date, 
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/users', (req, res) => {
  const { name, book } = req.body; 

  const entryDate = new Date(); 

  const newUser = new User({ name, book, entryDate }); 
  newUser
    .save()
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

app.get('/api/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

app.put('/api/users/:id', (req, res) => {
  const { name, book } = req.body; 

  User.findByIdAndUpdate(
    req.params.id,
    { name, book }, 
    { new: true }
  )
    .then(updatedUser => res.json({ success: true, user: updatedUser }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
