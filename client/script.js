'use strict';

// Wrap function definitions in jQuery ready callback to avoid defining them globally
// (otherwise browser extensions may call them)
$(() => {
  class Message {
    constructor (content, authorId, timestamp) {
      this.content = content;
      this.authorId = authorId;
      this.timestamp = timestamp;
    }
  }

  function genRandomMs () {
    // Returns a random number between 0 and 10 seconds, in milliseconds
    return Math.floor(Math.random() * 1e4);
  }

  function prettifyDate (timestamp) {
    // Returns the date in hh:mm am/pm format
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(timestamp).toLocaleTimeString('en-US', options);
  }

  function showMessage (msg) {
    const { content, authorId, timestamp } = msg;
    const $HtmlMsg = $(`
      <div class="message ${authorId ? 'right' : 'left'}">
        <div class="message-text">${content}</div>
        <div class="message-time">${prettifyDate(timestamp)}</div>
      </div>
    `);
    $('.messages-container').append($HtmlMsg);
  }

  function simulateIncomingMessages () {
    setTimeout(() => {
      $.get('http://cw-api.eu-west-3.elasticbeanstalk.com/quotes/random', data => {
        const msg = new Message(data.result.text, false, Date.now());

        showMessage(msg);
        scrollToBottom ();
      });
    }, genRandomMs());
  }

  function scrollToBottom () {
    const $messages = $('.messages-container');
    $messages.animate({
      scrollTop: $messages[0].scrollHeight
    });
  }

  $('#msg-form').on('submit',(e) => {
    e.preventDefault();
    const content = $('#text').val();
    if (content) {
      $('#text').val('');
      const msg = new Message(content, true, Date.now());

      showMessage(msg);
      scrollToBottom ();
      simulateIncomingMessages();
    }
  });
});
