document.getElementById('sendBtn').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value;
  if (message.trim() !== '') {
    addMessage('user', message);
    sendMessageToBot(message);
    document.getElementById('messageInput').value = '';
  }
});

document.getElementById('messageInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('sendBtn').click();
  }
});

function addMessage(sender, message) {
  const chat = document.getElementById('chat');
  const messageDiv = document.createElement('div');
  messageDiv.className = sender;
  messageDiv.innerText = message;
  chat.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessageToBot(message) {
  // Simulating a bot response for the sake of the example
  checkAnswer(message);
}

const questions = [
  "What is React?",
  "Can you explain React components?",
  "What is state in React?",
  "What are properties in React?",
  "What is JavaScript XML?",
  "What are React lifecycle methods?",
  "What is the effect hook in React?",
  "What is the virtual Document Object Model?",
  "What is React Router?",
  "What is Redux?"
];

const correctAnswers = [
  "React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can change data, without reloading the page.",
  "Components are the building blocks of a React application. They are reusable pieces of code that return a React element to be rendered to the page. Components can be either class-based or function-based.",
  "State is a built-in object that stores property values that belong to a component. When the state object changes, the component re-renders. State is used for managing dynamic data in an application.",
  "Properties (also known as props) are read-only attributes used to pass data from one component to another. They are passed to the component in a way similar to arguments passed in a function call.",
  "JavaScript XML stands for JavaScript XML. It allows us to write HTML inside JavaScript and place them in the DOM without using functions like createElement() or appendChild().",
  "Lifecycle methods are functions that get called at different stages of a component's life in React. They include methods like componentDidMount, componentDidUpdate, and componentWillUnmount.",
  "The effect hook is a function in React that allows you to perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React class components.",
  "The virtual Document Object Model is a lightweight representation of the real Document Object Model. When the state of an object changes, the virtual Document Object Model changes only the object in the real Document Object Model, rather than reloading the entire Document Object Model. This makes the update process faster.",
  "React Router is a standard library for routing in React. It enables navigation among views or different components in a React application, allowing for single-page applications with navigation without refreshing the whole page.",
  "Redux is a predictable state container for JavaScript applications. It helps you manage the state of your application in a consistent way, making it easier to manage and debug. It is often used with React for managing state across the entire application."
];

const answerKeywords = [
  ["react", "javascript", "library", "user interfaces"],
  ["components", "building","blocks", "react", "applications", "reusable"],
  ["state", "built-in", "object", "component", "re-renders", "dynamic"],
  ["properties", "read-only", "pass", "data", "component"],
  ["javascript xml", "html", "inside", "javascript"],
  ["lifecycle", "methods", "stages", "component", "life", "react"],
  ["effect hook", "side effects", "function", "components"],
  ["virtual document object model", "lightweight", "real document object model", "update", "faster"],
  ["react router", "routing", "single-page", "navigation", "views"],
  ["redux", "state", "container", "consistent", "manage", "debug"]
];

let currentQuestionIndex = 0;
let score = 0;

function checkAnswer(userAnswer) {
  if (currentQuestionIndex < correctAnswers.length) {
    const keywords = answerKeywords[currentQuestionIndex];
    if (isAnswerCorrect(userAnswer, keywords)) {
      score++;
      addMessage('bot', `Correct! ${correctAnswers[currentQuestionIndex]}`);
    } else {
      addMessage('bot', `Incorrect. The correct answer is: ${correctAnswers[currentQuestionIndex]}`);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setTimeout(() => {
        askNextQuestion();
      }, 1000);
    } else {
      setTimeout(() => {
        showFinalScore();
      }, 1000);
    }
  }
}

// function isAnswerCorrect(userAnswer, keywords) { 
//   const normalizedUserAnswer = userAnswer.toLowerCase().trim();

//   // Check if all relevant keywords are present in the user's answer
//   return keywords.every(keyword => {
//     const regex = new RegExp(`\\b${keyword}\\b`);
//     return regex.test(normalizedUserAnswer);
//   });
// }

// function isAnswerCorrect(userAnswer, keywords) {
//   const normalizedUserAnswer = userAnswer.toLowerCase();

//   // Check if all relevant keywords are present in the user's answer
//   return keywords.every(keyword => {
//     const keywordLower = keyword.toLowerCase();
//     return normalizedUserAnswer.includes(keywordLower);
//   });
// }
function isAnswerCorrect(userAnswer, keywords) {
  const normalizedUserAnswer = userAnswer.toLowerCase().trim();

  // Check if a majority of relevant keywords are present in the user's answer
  const matchCount = keywords.reduce((count, keyword) => {
    const keywordLower = keyword.toLowerCase();
    return normalizedUserAnswer.includes(keywordLower) ? count + 1 : count;
  }, 0);

  // Consider correct if more than 80% of keywords match
  return matchCount / keywords.length >= 0.8;
}

function askNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    addMessage('bot', questions[currentQuestionIndex]);
  }
}

function showFinalScore() {
  addMessage('bot', `You've completed the test! Your score is ${score}/${questions.length}.`);
  addMessage('bot', score >= 7 ? "Great job! You have a solid understanding of React." : "Keep practicing! Review some concepts to improve your score.");

  const refreshBtn = document.createElement('button');
  refreshBtn.innerText = "Restart Test";
  refreshBtn.id = "restartBtn";
  refreshBtn.style.marginTop = "10px";
  refreshBtn.style.padding = "10px 20px";
  refreshBtn.style.backgroundColor = "#007acc";
  refreshBtn.style.color = "white";
  refreshBtn.style.border = "none";
  refreshBtn.style.cursor = "pointer";
  refreshBtn.style.borderRadius = "5px";
  refreshBtn.onclick = () => location.reload();
  
  document.getElementById('chat-container').appendChild(refreshBtn);
}

window.onload = () => {
  askNextQuestion();
};
