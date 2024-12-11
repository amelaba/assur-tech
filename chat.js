const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const suggestedQuestions = document.getElementById('suggested-questions');

// Simple AI responses
const botReplies = {
  "hello": "Hi there! How can I assist you today?",
  "how are you?": "I'm just a bot, but I'm here to help you!",
  "what is your name?": "I am your friendly AI chat bot.",
  "bye": "Goodbye! Have a great day!",
  "what are personal details needed?": "You need to provide your full name, complete address (including building, floor, apartment number, etc.), phone number, and email address.",
  "what should i do if there are witnesses?": "You should provide the names and contact information of any witnesses and their statements about the accident.",
  "default": "I'm sorry, I didn't understand that. Could you rephrase?"
};

// Add a message to the chat
function addMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', `${sender}-message`);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}

// Handle user input
function handleUserInput() {
  const userMessage = userInput.value.trim().toLowerCase(); // Normalize input
  if (!userMessage) return;

  // Add user message to chat
  addMessage(userInput.value, 'user'); // Original input

  // Bot response
  const botResponse = botReplies[userMessage] || botReplies['default'];
  setTimeout(() => addMessage(botResponse, 'bot'), 500);

  // Clear input
  userInput.value = '';
}

// Event listener for send button
sendBtn.addEventListener('click', handleUserInput);

// Event listener for Enter key
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleUserInput();
  }
});

// Suggested questions functionality
suggestedQuestions.addEventListener('click', (e) => {
  if (e.target && e.target.matches('li.question-option')) {
    userInput.value = e.target.textContent; // Set input field with question
    handleUserInput(); // Automatically send question
  }
});
