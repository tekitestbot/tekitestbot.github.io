function createConfetti() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 5 + 2,
      dx: (Math.random() - 0.5) * 4,
      dy: Math.random() * 3 + 2,
      color: ["#008080", "#754fa4", "#1c1c1c"][Math.floor(Math.random() * 3)],
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.y += p.dy;
      p.x += p.dx;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(drawParticles);
  }

  drawParticles();
  setTimeout(() => {
    document.body.removeChild(canvas);
  }, 3000);
}

function endTest() {
  createConfetti();
}

document.getElementById('sendBtn').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value;
  if (message.trim() !== '') {
    addMessage('user', message);
    sendMessageToBot(message);
    document.getElementById('messageInput').value = '';
    updateProgressBar(calculatePercentage(questions.length, questionCount));
  }
});

function calculatePercentage(total, part) {
  return (part / total) * 100;
}

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
  "What is Redux?",
  //
  "What are React Hooks?",
  "What is `useState` in React?",
  "What does `useEffect` do in React?",
  "What is the Context API in React?",
  "What is a Higher-Order Component (HOC) in React?",
  "How does React handle forms and controlled components?",
  "What is Prop Drilling in React, and how do you solve it?",
  "What are fragments in React, and why use them?",
  "How does React’s key prop work, and why is it important?",
  "What is memoization in React, and when should you use `React.memo`?"
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
  "Redux is a predictable state container for JavaScript applications. It helps you manage the state of your application in a consistent way, making it easier to manage and debug. It is often used with React for managing state across the entire application.",

  "React Hooks are functions that let you use state and other React features in functional components, like `useState` for state management and `useEffect` for side effects. They simplify code and improve reusability.",
  "`useState` is a Hook that allows you to add state to functional components. You can initialize state with a value and use the setter function to update it.",
  "`useEffect` is a Hook for managing side effects in functional components, like fetching data, subscriptions, or changing the DOM. It can run after every render or conditionally with dependencies.",
  "The Context API is a feature that allows data to be shared across components without passing props through every level. It’s useful for themes, user data, and global settings.",
  "A Higher-Order Component (HOC) is a function that takes a component and returns a new component. It’s used for reusing component logic, like authentication or logging.",
  "In controlled components, React handles form input values through state. Each input's value is set by React state, making it easier to manage and validate.",
  "Prop Drilling occurs when data is passed through multiple components, which can be inefficient. Solutions include the Context API and Redux for managing data flow more effectively.",
  "Fragments let you return multiple elements without adding extra nodes to the DOM. They’re useful for grouping elements without a wrapper.",
  "The key prop uniquely identifies list items, helping React track elements between updates. It optimizes re-rendering and ensures correct element associations.",
  "Memoization optimizes performance by caching results. `React.memo` prevents unnecessary re-renders by only re-rendering when props change."
];

const answerKeywords = [
  ["react", "javascript", "library", "user interfaces"],
  ["components", "building", "blocks", "react", "applications", "reusable"],
  ["state", "built-in", "object", "component", "re-renders", "dynamic"],
  ["properties", "read-only", "pass", "data", "component"],
  ["JSX", "javascript xml", "html", "inside", "javascript"],
  ["lifecycle", "methods", "stages", "component", "life", "react"],
  ["effect hook", "side effects", "function", "components"],
  ["virtual document object model", "lightweight", "real document object model", "update", "faster"],
  ["react router", "routing", "single-page", "navigation", "views"],
  ["redux", "state", "container", "consistent", "manage", "debug"],

  ["hooks", "functions", "state", "features", "functional components", "useState", "useEffect", "reusability"],
  ["useState", "Hook", "state", "functional components", "initialize", "setter function", "update"],
  ["useEffect", "Hook", "side effects", "functional components", "data fetching", "DOM", "dependencies"],
  ["Context API", "data sharing", "components", "props", "themes", "user data", "global settings"],
  ["Higher-Order Component", "HOC", "function", "returns", "component", "reusability", "authentication", "logic"],
  ["forms", "controlled components", "input values", "state", "manage", "validate"],
  ["Prop Drilling", "data", "components", "Context API", "Redux", "data flow", "manage"],
  ["fragments", "multiple elements", "extra nodes", "DOM", "grouping", "wrapper"],
  ["key prop", "uniquely identifies", "list items", "track elements", "updates", "optimize", "re-rendering"],
  ["memoization", "optimize", "performance", "caching", "React.memo", "re-renders", "props change"]
];

let currentQuestionIndex = 0;
let score = 0;
let questionCount = 0; // Counter for the number of questions asked

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
    questionCount++; // Increment question count

    // Show alert after every 5 questions
    // if (questionCount === 10) {
    //   // alert("You've answered 5 questions! Keep going!");
    //   // askForPayment(); 
    //   var maintenanceModal = new bootstrap.Modal(document.getElementById('maintenanceModal'));
    //   maintenanceModal.show();
    //   return; // Exit the function to prevent asking another question immediatel
    // }

    // Update live score
    updateLiveScore(score);

    if (currentQuestionIndex < questions.length) {
      setTimeout(() => {
        askNextQuestion();
      }, 1000);
    } else {
      setTimeout(() => {
        showFinalScore();
        endTest();
      }, 1000);
    }
  }
}

function updateLiveScore(score) {
  const scoreElement = document.getElementById('score');
  scoreElement.innerText = `Score: ${score}`;
}

function askForPayment() {
  // Example payment prompt
  const userConfirmed = confirm("You've answered 5 questions. Please pay to continue.");
  if (userConfirmed) {
    // Redirect to payment page or handle payment process
    window.location.href = 'payment.html'; // Replace with your payment URL
  } else {
    // Optionally, handle what happens if the user cancels the payment
    alert("You need to complete the payment to continue.");
  }
}

function updateProgressBar(progress) {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = progress + "%";
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

function updateStreak() {
  const streakElement = document.getElementById('streak-display');
  let streak = parseInt(localStorage.getItem('streak')) || 0;
  let lastVisit = localStorage.getItem('lastVisit');
  const today = new Date().toDateString();

  if (lastVisit === today) {
    // Already visited today; no change.
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastVisit === yesterday.toDateString()) {
      streak++;
    } else {
      streak = 1;
    }
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastVisit', today);
  }
  streakElement.textContent = `🔥${streak} ${streak > 1 ? 's' : ''}`;
}
document.addEventListener('DOMContentLoaded', updateStreak);