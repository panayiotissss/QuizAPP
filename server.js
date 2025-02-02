const express = require('express');  // Import Express
const quizQuestions = require('./backend/quizData');  // Import quiz data from the backend folder
const cors = require('cors');  // Import CORS package
const app = express();  // Initialize the Express app

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500' // Only allow requests from this domain
}));


// Route to fetch quiz questions
app.get('/quiz', (req, res) => {
  res.json(quizQuestions);  // Send quiz questions to the frontend
});

// Route to handle quiz submission and calculate score
app.post('/submit', (req, res) => {
  const userAnswers = req.body.userAnswers;
  let score = 0;

  // Calculate score based on correct answers
  quizQuestions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      score++;  // Increase score if the answer is correct
    }
  });

  res.json({ score });  // Send back the score
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
