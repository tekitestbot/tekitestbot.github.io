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

// Global variables for bot message queue and typing status
let isBotTyping = false;
let botMessageQueue = [];

function addMessage(sender, message) {

  document.getElementById('messageInput').disabled = true;

  // If it's a bot message and one is already typing, queue it
  if (sender === 'bot') {
    if (isBotTyping) {
      botMessageQueue.push({ sender, message });
      return;
    } else {
      isBotTyping = true;
      document.getElementById("messageInput").disabled = true;
    }
  }

  const chat = document.getElementById('chat');

  // Create row wrapper
  const rowDiv = document.createElement('div');
  rowDiv.className = 'row m-0 mb-3';
  rowDiv.style = "display: block; width: 100%; min-height: 40px;";

  // Create message div
  const messageDiv = document.createElement('div');
  messageDiv.className = sender;
  // Preserve spaces for bot messages
  if (sender === 'bot') {
    messageDiv.style.whiteSpace = 'pre-wrap';
  }

  rowDiv.appendChild(messageDiv);
  chat.appendChild(rowDiv);
  chat.scrollTop = chat.scrollHeight;

  if (sender === 'bot') {
    // Typing animation: reveal one character at a time
    let index = 0;
    const typingInterval = setInterval(() => {
      messageDiv.innerText += message.charAt(index);
      index++;
      chat.scrollTop = chat.scrollHeight;
      if (index >= message.length) {
        clearInterval(typingInterval);
        // Bot finished typing: reset and re-enable the input
        isBotTyping = false;
        document.getElementById("messageInput").disabled = false;
        // Process next bot message in queue, if any
        if (botMessageQueue.length > 0) {
          const next = botMessageQueue.shift();
          addMessage(next.sender, next.message);
        }
      }
    }, 50); // Adjust speed as needed
  } else {
    messageDiv.innerText = message;
  }

  chat.scrollTop = chat.scrollHeight;
  document.getElementById('messageInput').disabled = false;
}


async function sendMessageToBot(message) {
  // Simulating a bot response for the sake of the example
  checkAnswer(message);
}

const questionsReact = [
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

const correctAnswersReact = [
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

const answerKeywordsReact = [
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

const questionsTypescript = [
  "What is TypeScript?",
  "What are the advantages of using TypeScript over JavaScript?",
  "What is type inference in TypeScript?",
  "What is a tuple in TypeScript?",
  "What are generics in TypeScript?",
  "What are interfaces in TypeScript?",
  "What is the difference between type aliases and interfaces?",
  "What is the 'unknown' type in TypeScript?",
  "How does TypeScript handle modules and namespaces?",
  "What are utility types in TypeScript?"
];

const correctAnswersTypescript = [
  "TypeScript is a superset of JavaScript that adds static types. It compiles down to JavaScript and is designed to catch errors early.",
  "TypeScript offers better tooling and type safety compared to JavaScript, allowing for more robust code with fewer bugs.",
  "TypeScript can infer types based on the initial value, making it easier to work with variables without explicitly defining their types.",
  "A tuple in TypeScript is an array with a fixed number of elements of different types.",
  "Generics allow you to write flexible and reusable code by defining types that are specified at the time of usage.",
  "Interfaces in TypeScript define the structure of an object, ensuring it follows a specific shape. They help with type checking and better code organization.",
  "Type aliases and interfaces are similar but differ in flexibility. Interfaces can be extended, while type aliases can represent more complex types like unions.",
  "The 'unknown' type is a safer alternative to 'any' in TypeScript, requiring type checks before being assigned to specific types.",
  "TypeScript handles modularity through ES6 modules and its own 'namespace' feature, allowing better organization and code reusability.",
  "Utility types in TypeScript are built-in types that simplify type transformations, such as Partial<T>, Readonly<T>, and Pick<T>."
];

const answerKeywordsTypescript = [
  ["typescript", "superset", "javascript", "types", "static"],
  ["advantages", "typescript", "better", "tooling", "type safety"],
  ["type inference", "typescript", "initial value", "automatic"],
  ["tuple", "fixed", "array", "different types"],
  ["generics", "reusable", "flexible", "code"],
  ["interfaces", "typescript", "structure", "type checking", "object"],
  ["type alias", "interface", "typescript", "difference", "union", "extend"],
  ["unknown type", "typescript", "safer", "any", "type checking"],
  ["modules", "namespaces", "typescript", "ES6", "organization"],
  ["utility types", "typescript", "built-in", "transformation", "Partial", "Readonly"]
];

let currentQuestionIndex = 0;
let score = 0;
let questionCount = 0; // Counter for the number of questions asked
let correctStreak = 0;
let currentLanguage = 'react';

// Check query parameter for language selection
const urlParams = new URLSearchParams(window.location.search);
const queryLanguage = urlParams.get('lang');

// Default to 'react' if no query parameter or invalid one is passed
currentLanguage = queryLanguage === 'typescript' ? 'typescript' : 'react';

// Set the initial language in the dropdown
document.getElementById("languageSelector").value = currentLanguage;

// Event handler for language change
document.getElementById("languageSelector").addEventListener("change", function () {
  currentLanguage = this.value;

  // Update the query parameter in the URL to reflect the selected language
  const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?lang=" + currentLanguage;
  window.history.pushState({ path: newUrl }, '', newUrl);

  score = 0;
  currentQuestionIndex = 0;
  questionCount = 0;
  updateProgressBar(0);
  document.getElementById("chat").innerHTML = "";

  // Refresh questions based on the selected language
  renderQuestions();
  askNextQuestion();
});

// Function to render the questions based on the selected language
function renderQuestions(firstLoad = false) {
  if (currentLanguage === 'react') {
    questions = questionsReact; // Assuming you have a separate list for React questions
    correctAnswers = correctAnswersReact;
    answerKeywords = answerKeywordsReact;
  } else if (currentLanguage === 'typescript') {
    questions = questionsTypescript;
    correctAnswers = correctAnswersTypescript;
    answerKeywords = answerKeywordsTypescript;
  }

  // Reset the question index and start the quiz
  currentQuestionIndex = 0;
  score = 0;
  questionCount = 0;

  // Call to display the first question (or whatever logic you use to start the quiz)
  if (firstLoad) {
    askNextQuestion();
  }

}

// function checkAnswer(userAnswer) {
//   if (currentQuestionIndex < correctAnswers.length) {
//     const keywords = answerKeywords[currentQuestionIndex];
//     if (isAnswerCorrect(userAnswer, keywords)) {
//       score++;
//       correctStreak++;
//       if (correctStreak >= 3) {
//         document.getElementById("chat").classList.add("neon-border");
//       }
//       addMessage('bot', `Correct! ${correctAnswers[currentQuestionIndex]}`);
//     } else {
//       correctStreak = 0;
//       document.getElementById("chat").classList.remove("neon-border");
//       addMessage('bot', `Incorrect. The correct answer is: ${correctAnswers[currentQuestionIndex]}`);
//     }
//     currentQuestionIndex++;
//     questionCount++; // Increment question count

//     // Show alert after every 5 questions
//     // if (questionCount === 10) {
//     //   // alert("You've answered 5 questions! Keep going!");
//     //   // askForPayment(); 
//     //   var maintenanceModal = new bootstrap.Modal(document.getElementById('maintenanceModal'));
//     //   maintenanceModal.show();
//     //   return; // Exit the function to prevent asking another question immediatel
//     // }

//     // Update live score
//     updateLiveScore(score);

//     if (currentQuestionIndex < questions.length) {
//       setTimeout(() => {
//         askNextQuestion();
//       }, 1000);
//     } else {
//       setTimeout(() => {
//         showFinalScore();
//         endTest();
//       }, 1000);
//     }
//   }
// }

function checkAnswer(userAnswer) {
  if (currentQuestionIndex < correctAnswers.length) {
    const keywords = answerKeywords[currentQuestionIndex];
    if (isAnswerCorrect(userAnswer, keywords)) {
      score++;
      correctStreak++;
      if (correctStreak >= 3) {
        document.getElementById("chat").classList.add("neon-border");
      }
      addMessage('bot', `Correct! ${correctAnswers[currentQuestionIndex]}`);
      triggerAnswerAnimation(true);  // Trigger correct answer animation
    } else {
      correctStreak = 0;
      document.getElementById("chat").classList.remove("neon-border");
      addMessage('bot', `Incorrect. The correct answer is: ${correctAnswers[currentQuestionIndex]}`);
      triggerAnswerAnimation(false); // Trigger incorrect answer animation
    }
    currentQuestionIndex++;
    questionCount++; // Increment question count

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

let currentProgressValue = 0;

function updateProgressBar(progress) {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = progress + "%";

  const progressCounter = document.getElementById("progressPercentCounter");
  progressCounter.style.color = "#008080"; // plain color

  // Animate count up from currentProgressValue to the new progress
  const frames = 30;
  const increment = (progress - currentProgressValue) / frames;
  let frame = 0;
  const animationInterval = setInterval(() => {
    frame++;
    const currentValue = Math.round(currentProgressValue + increment * frame);
    progressCounter.innerText = currentValue + "%";
    if (frame >= frames) {
      clearInterval(animationInterval);
      currentProgressValue = progress;
    }
  }, 20); // 20ms per frame (approx 600ms total)
}

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
  updateTipContent();
  renderQuestions(false);
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
  streakElement.textContent = `🔥${streak}`;
}
document.addEventListener('DOMContentLoaded', updateStreak);

const messageInput = document.getElementById('messageInput');
let typingIndicator;

messageInput.addEventListener('input', () => {
  if (!typingIndicator) {
    typingIndicator = document.createElement('div');
    typingIndicator.className = 'user typing-indicator';
    typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    document.getElementById('chat').appendChild(typingIndicator);
  }

  clearTimeout(typingIndicator.timeout);
  typingIndicator.timeout = setTimeout(() => {
    if (typingIndicator) {
      typingIndicator.remove();
      typingIndicator = null;
    }
  }, 1000);

  const chat = document.getElementById('chat');
  chat.scrollTop = chat.scrollHeight;
});

document.getElementById("tipBtn").addEventListener("click", function () {
  document.getElementById("tipBox").style.display = "block";
  score -= 0.5; // Deduct points
  updateTipBox();
});

document.getElementById("closeTip").addEventListener("click", function () {
  document.getElementById("tipBox").style.display = "none";
  const tipBox = document.getElementById("tipBoxInner");
  tipBox.innerHTML = "";
});

function updateTipBox() {
  const tipBox = document.getElementById("tipBoxInner");
  const keywords = answerKeywords[currentQuestionIndex].filter(keyword => keyword.length > 2);
  const hints = document.createElement("p");
  hints.innerHTML = "<strong>Hint:</strong> " + keywords.join(", ");
  tipBox.appendChild(hints);
}

// Function to update tip content based on selected language
function updateTipContent() {
  const tipButton = document.getElementById('tipButton');
  const tipContent = document.getElementById('tipContent');

  if (currentLanguage === 'typescript') {
    tipButton.innerText = "Show TypeScript Keyword Cheat Sheet";
    tipContent.innerHTML = `<h2>TypeScript Keyword Cheat Sheet</h2>
    <ul>
      <li><b>What is TypeScript?</b> - Include: TypeScript, superset, JavaScript, types, static.</li>
      <li><b>Advantages of TypeScript:</b> - Include: advantages, TypeScript, better, tooling, type safety.</li>
      <li><b>Type Inference:</b> - Include: type inference, TypeScript, initial value, automatic.</li>
      <li><b>Tuple in TypeScript:</b> - Include: tuple, fixed, array, different types.</li>
      <li><b>Generics:</b> - Include: generics, reusable, flexible, code.</li>
      <li><b>Interfaces in TypeScript:</b> - Include: interfaces, TypeScript, object structure, type checking, contract.</li>
      <li><b>Type Aliases vs Interfaces:</b> - Include: type alias, interface, TypeScript, difference, union, extend.</li>
      <li><b>'Unknown' Type:</b> - Include: unknown type, TypeScript, safer, any, type checking, validation.</li>
      <li><b>Modules & Namespaces:</b> - Include: modules, namespaces, TypeScript, ES6, organization, import, export.</li>
      <li><b>Utility Types:</b> - Include: utility types, TypeScript, built-in, transformation, Partial, Readonly, Pick.</li>
    </ul>`;
  } else {
    tipButton.innerText = "Show React Keyword Cheat Sheet";
    tipContent.innerHTML = `<h2>React Keyword Cheat Sheet</h2>
      <ul>
        <li><b>What is React?</b> - Include: React, JavaScript, library, user interfaces, data, reloading.</li>
        <li><b>React Components:</b> - Include: components, reusable, building blocks, function-based, class-based.</li>
        <li><b>State in React:</b> - Include: state, built-in object, component, re-renders, dynamic data.</li>
        <li><b>Props in React:</b> - Include: props, properties, read-only, pass data, component.</li>
        <li><b>JSX:</b> - Include: JSX, JavaScript XML, HTML, inside JavaScript, DOM.</li>
        <li><b>React Lifecycle Methods:</b> - Include: lifecycle methods, stages, mount, update, unmount.</li>
        <li><b>Effect Hook:</b> - Include: effect hook, side effects, functional components.</li>
        <li><b>Virtual DOM:</b> - Include: virtual DOM, lightweight, update, faster.</li>
        <li><b>React Router:</b> - Include: React Router, routing, single-page application, navigation.</li>
        <li><b>Redux:</b> - Include: Redux, state, container, consistent, debug, manage.</li>
        <li><b>React Hooks:</b> - Include: hooks, functions, state, features, functional components, useState, useEffect, reusability.</li>
        <li><b>&#39;useState&#39;:</b> - Include: useState, Hook, state, functional components, initialize, setter function, update.</li>
        <li><b>&#39;useEffect&#39;:</b> - Include: useEffect, Hook, side effects, functional components, data fetching, DOM, dependencies.</li>
        <li><b>Context API:</b> - Include: Context API, data sharing, components, props, themes, user data, global settings.</li>
        <li><b>Higher-Order Component (HOC):</b> - Include: Higher-Order Component, HOC, function, returns, component, reusability, authentication, logic.</li>
        <li><b>Forms & Controlled Components:</b> - Include: forms, controlled components, input values, state, manage, validate.</li>
        <li><b>Prop Drilling:</b> - Include: Prop Drilling, data, components, Context API, Redux, data flow, manage.</li>
        <li><b>Fragments:</b> - Include: fragments, multiple elements, extra nodes, DOM, grouping, wrapper.</li>
        <li><b>Key Prop:</b> - Include: key prop, uniquely identifies, list items, track elements, updates, optimize, re-rendering.</li>
        <li><b>Memoization:</b> - Include: memoization, optimize, performance, caching, React.memo, re-renders, props change.</li>
      </ul>`;
  }
}

document.getElementById('languageSelector').addEventListener('change', function () {
  currentLanguage = this.value;
  updateTipContent();
});

// Trigger answer animation on the #chat element based on correctness
function triggerAnswerAnimation(isCorrect) {
  const chatElement = document.getElementById("chat");
  if (isCorrect) {
    chatElement.classList.add("correct-answer");
    setTimeout(() => {
      chatElement.classList.remove("correct-answer");
    }, 600); // Duration matches the CSS animation duration
  } else {
    chatElement.classList.add("incorrect-answer");
    setTimeout(() => {
      chatElement.classList.remove("incorrect-answer");
    }, 600);
  }
}
