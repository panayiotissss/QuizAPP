// Get references to the HTML elements
const startQuizBtn = document.getElementById('startQuizBtn');
const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('resultContainer');





// Add event listener to start quiz button
startQuizBtn.addEventListener('click', function() {
  // Fetch the quiz questions from the backend
  fetch('http://localhost:3000/quiz')
    .then(response => response.json()) // Convert the response to JSON
    .then(quizQuestions => {
      // Call a function to display the questions
      displayQuestions(quizQuestions);
    })
    .catch(error => {
      console.error('Error fetching quiz questions:', error);
    });
});

// Function to display questions
function displayQuestions(quizQuestions) {
    quizContainer.innerHTML = ''; // Clear any existing content in quizContainer
  
    quizQuestions.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('question');
      
      // Display the question text
      questionElement.innerHTML = `
        <h3>${question.question}</h3>
        ${question.options.map((option, i) => `
          <label>
            <input type="radio" name="question${index}" value="${option}">
            ${option}
          </label><br>
        `).join('')}
      `;
      
      quizContainer.appendChild(questionElement); // Append the question to the quizContainer
    });
  


  // Add a submit button after the questions
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit Quiz';
  submitButton.addEventListener('click', submitQuiz);
  quizContainer.appendChild(submitButton);
}

// Function to submit the quiz
function submitQuiz() {
  const userAnswers = [];

  // Get all the radio buttons for the questions
  const questions = document.querySelectorAll('.question');
  
  questions.forEach((questionElement, index) => {
    const selectedOption = questionElement.querySelector('input[type="radio"]:checked');
    
    if (selectedOption) {
      // Push the selected answer into the userAnswers array
      userAnswers.push(selectedOption.value);
    } else {
      // If no answer is selected for a question, push null (or handle as needed)
      userAnswers.push(null);
    }
  });

  // Send the answers to the server using POST
  fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userAnswers }) // Send the answers in the request body
  })
    .then(response => response.json())
    .then(data => {
      // Display the score after the quiz is submitted
      displayScore(data.score);
    })
    .catch(error => {
      console.error('Error submitting quiz:', error);
    });
}

// Function to display the score
function displayScore(score) {
  resultContainer.innerHTML = `<h3>Your score: ${score}</h3>`;  // Show the score on the result container
}
