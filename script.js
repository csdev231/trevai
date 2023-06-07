window.addEventListener('DOMContentLoaded', function () {
  var messageContainer = document.getElementById('message-container');
  var messageInput = document.getElementById('message-input');
  var sendButton = document.getElementById('send-button');

  sendButton.addEventListener('click', function () {
    var message = messageInput.value;
    if (message.trim() !== '') {
      sendMessage(message);
      messageInput.value = '';
    }
  });

  function sendMessage(message) {
    var newMessage = document.createElement('div');
    newMessage.className = 'message sent';
    newMessage.textContent = message;
    messageContainer.appendChild(newMessage);
    scrollToBottom();

    // Send message to your REST API for processing
    // You can use fetch() or any other AJAX library to make the API request
    // Example:

    fetch("http://127.0.0.1:5000/api/v1/generate", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify({
          "prompt": message,
          "max_new_tokens": 250,
          "do_sample": true,
          "temperature": 1.3,
          "top_p": 0.1,
          "typical_p": 1,
          "epsilon_cutoff": 0,
          "eta_cutoff": 0,
          "repetition_penalty": 1.18,
          "top_k": 40,
          "min_length": 0,
          "no_repeat_ngram_size": 0,
          "num_beams": 1,
          "penalty_alpha": 0,
          "length_penalty": 1,
          "early_stopping": false,
          "mirostat_mode": 0,
          "mirostat_tau": 5,
          "mirostat_eta": 0.1,
          "seed": -1,
          "add_bos_token": true,
          "truncation_length": 2048,
          "ban_eos_token": false,
          "skip_special_tokens": true,
          "stopping_strings": []
        })

    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Process the response data from your REST API
        // Update the message container with the API response
        addResponseMessage(data.results[0].text);
        scrollToBottom();
      })
      .catch(function (error) {
        console.error('Error:', error);
      });

  }

  function addResponseMessage(message) {
    var newMessage = document.createElement('div');
    newMessage.className = 'message received';
    newMessage.textContent = message;
    messageContainer.appendChild(newMessage);
    scrollToBottom();
  }

  function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
});











