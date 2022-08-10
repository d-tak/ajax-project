var $like = document.querySelector('i');
var quoteText = document.querySelector('.quote-text');
var quoteAuthor = document.querySelector('.quote-author');

function renderDailyQuote() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.goprogram.ai/inspiration');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    quoteText.textContent = xhr.response.quote;
    quoteAuthor.textContent = xhr.response.author;
    data.currentQuote = xhr.response;
  }
  );
  xhr.send();
}

renderDailyQuote();

$like.addEventListener('click', handleLike);
// $button.addEventListener('click', handleLike);

function handleLike(event) {
  event.preventDefault();

  var savedQuote = {
    quote: data.currentQuote.quote,
    author: data.currentQuote.author,
    quotationId: data.nextQuotationId
  };

  data.nextQuotationId++;
  data.quotations.unshift(savedQuote);
}

function renderQuote(entry) {
  var columnHalf = document.createElement('li');
  columnHalf.setAttribute('class', 'column-half');

  var card = document.createElement('div');
  card.setAttribute('class', 'card');
  columnHalf.append(card);

  var quoteList = document.createElement('div');
  quoteList.setAttribute('class', 'quote');
  card.append(quoteList);

  var quote = document.createElement('p');
  quoteList.append(quote);
  quote.textContent = entry.quote;

  var author = document.createElement('p');
  quoteList.append(author);
  author.textContent = entry.author;

  return columnHalf;
}

var navLiked = document.querySelector('.nav-liked-thoughts');
navLiked.addEventListener('click', likedCards);

function likedCards(viewLiked) {
  var parent = document.querySelector('.quote-container');
  var dailyQuote = document.querySelector('#daily-quote');
  dailyQuote.classList.add('hidden');
  parent.replaceChildren();
  for (var i = 0; i < data.quotations.length; i++) {
    var likedThought = renderQuote(data.quotations[i]);
    parent.append(likedThought);
  }
}
