const { NlpManager } = require('node-nlp');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Initialize the NLP Manager
const manager = new NlpManager({ languages: ['en'] });

// Load training data from JSON file
const trainingData = JSON.parse(fs.readFileSync('trainingData.json', 'utf8'));

Object.keys(trainingData).forEach(intent => {
  const { questions, answers } = trainingData[intent];
  questions.forEach(question => {
    manager.addDocument('en', question, intent);
  });
  answers.forEach(answer => {
    manager.addAnswer('en', intent, answer);
  });
});
// Object.keys(trainingData).forEach(topic => {
//   Object.keys(trainingData[topic]).forEach(intent => {
//     const intentData = trainingData[topic][intent];
//     if (intentData && Array.isArray(intentData.questions) && Array.isArray(intentData.answers)) {
//       intentData.questions.forEach(question => {
//         manager.addDocument('en', question, `${topic}.${intent}`);
//       });
//       intentData.answers.forEach(answer => {
//         manager.addAnswer('en', `${topic}.${intent}`, answer);
//       });
//     } else {
//       console.warn(`Missing questions or answers for ${topic}.${intent}`);
//     }
//   });
// });

(async () => {
  try {
    await manager.train();
    manager.save();
    console.log('Model trained');
  } catch (err) {
    console.error('Training error:', err);
  }
})();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle chat messages
app.post('/chat', async (req, res) => {
  const userInput = req.body.message;
  console.log('Received message:', userInput);

  try {
    const response = await manager.process('en', userInput);
    const botResponse = response.answer || "Sorry, I didn't understand that.";
    console.log('Bot response:', botResponse);
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
