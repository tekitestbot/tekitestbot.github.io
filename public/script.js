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
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    addMessage('bot', data.response);
    askNextQuestion();
  }
  
  function askNextQuestion() {
    const questions = [
      "What is React?",
      "Can you explain React components?",
      "What is state in React?",
      "What are props in React?",
      "What is JSX?",
      "What are React lifecycle methods?",
      "What is the useEffect hook in React?",
      "What is the virtual DOM?",
      "What is React Router?",
      "What is Redux?"
    ];
  
    const chat = document.getElementById('chat');
    const botMessages = chat.getElementsByClassName('bot');
  
    if (botMessages.length < questions.length) {
      setTimeout(() => {
        addMessage('bot', questions[botMessages.length]);
      }, 1000);
    } else {
      setTimeout(() => {
        addMessage('bot', "Thank you for the chat!");
      }, 1000);
    }
  }
  
  window.onload = () => {
    askNextQuestion();
  };
  