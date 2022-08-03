var $quote = document.querySelector('#quote');
var ul = document.querySelector('ul');

function getData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.goprogram.ai/inspiration');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // for (var i = 0; i < xhr.response.length; i++) {
    var $text = document.createElement('li');
    $text.textContent = xhr.response.quote;
    var $author = document.createElement('li');
    $author.textContent = xhr.response.author;
    $quote.appendChild($text);
    $quote.appendChild($author);
    text = xhr.response.quote;
    dood = xhr.response.author;
  }
  );
  xhr.send();
}
getData();

var likedThought = document.querySelector('#form-input');
var text;
var dood;

function handleClick(event) {
  event.preventDefault();

  var savedQuote = {
    quote: text,
    author: dood
  };

  data.nextEntryId++;
  likedThought.reset();
  data.entries.unshift(likedThought);
  ul.prepend(savedQuote);

}

likedThought.addEventListener('click', handleClick);
