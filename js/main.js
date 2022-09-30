var $like = document.querySelector('i');
var quoteText = document.querySelector('.quote-text');
var quoteAuthor = document.querySelector('.quote-author');
var $form = document.querySelector('#form-input');
var blankMessage = document.querySelector('.blank-message');

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
  blankMessage.classList.add('hidden');
}

renderDailyQuote();

$like.addEventListener('click', handleLike);
$form.addEventListener('submit', handleSubmit);

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

function handleSubmit(event) {
  event.preventDefault();

  var completedEntry = {
    quote: data.currentQuote.quote,
    author: data.currentQuote.author,
    notes: $form.elements.notes.value,
    journalId: data.nextJournalId
  };

  data.nextQuotationId++;
  data.nextJournalId++;
  data.entries.unshift(completedEntry);
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
  var formInput = document.querySelector('#form-input');
  dailyQuote.classList.add('hidden');
  formInput.classList.add('hidden');
  parent.replaceChildren();
  for (var i = 0; i < data.quotations.length; i++) {
    var likedThought = renderQuote(data.quotations[i]);
    parent.append(likedThought);
  }
  if (data.quotations.length === 0) {
    blankMessage.className = 'blank-message view';
  }
}

var navJournal = document.querySelector('.nav-journal');
navJournal.addEventListener('click', journal);

function renderJournal(entry) {
  var columnFull = document.createElement('div');
  columnFull.setAttribute('class', 'column-full');

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  columnFull.append(row);

  var columnHalf = document.createElement('div');
  columnHalf.setAttribute('class', 'column-half');
  row.append(columnHalf);

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

  var columnHalf2 = document.createElement('div');
  columnHalf2.setAttribute('class', 'column-half');
  row.append(columnHalf2);

  var journalHeader = document.createElement('h4');
  journalHeader.setAttribute('class', 'h4');
  columnHalf2.append(journalHeader);
  journalHeader.textContent = '- Thoughts -';

  var notes = document.createElement('li');
  notes.setAttribute('class', 'notes');
  journalHeader.append(notes);
  notes.textContent = entry.notes;

  return columnFull;
}

function journal(viewJournal) {
  var parent = document.querySelector('.entries-container');
  var dailyQuote = document.querySelector('#daily-quote');
  var formInput = document.querySelector('#form-input');
  dailyQuote.classList.add('hidden');
  formInput.classList.add('hidden');
  parent.replaceChildren();
  for (var i = 0; i < data.quotations.length; i++) {
    var journal = renderJournal(data.entries[i]);
    parent.append(journal);
  }
  if (data.quotations.length === 0) {
    blankMessage.className = 'blank-message view';
  }
}
