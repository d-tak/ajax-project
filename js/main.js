var $quote = document.querySelector('.quote');
var ul = document.querySelector('ul');
var $button = document.querySelector('.button');

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
    authorName = xhr.response.author;
  }
  );
  xhr.send();
}
getData();

var text;
var authorName;

function handleLike(event) {
  event.preventDefault();

  var savedQuote = {
    quote: text,
    author: authorName,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;
  // likedThought.reset();
  data.entries.unshift(savedQuote);
  renderLiked(savedQuote);
  viewSwap(savedQuote);
}

if ($button != null) {
  $button.addEventListener('click', handleLike);
}

function renderLiked(entry) {
  var card = document.createElement('li');
  // card.className('card');
  card.setAttribute('class', 'card');

  var text = document.createElement('li');
  text.textContent = entry.text;

  var person = document.createElement('li');
  person.textContent = entry.person;

  ul.appendChild(card);
  ul.appendChild(text);
  ul.appendChild(person);

}

var navLiked = document.querySelector('.nav-liked-thoughts');
navLiked.addEventListener('click', viewSwap);

function viewSwap(savedQuote) {
  var parent = document.querySelector('.content');
  parent.innerHTML = '';

  var entries;
  if ('quote' in savedQuote) {
    entries = [savedQuote];
  } else {
    entries = data.entries;
  }

  for (var k = 0; k < entries.length; k++) {
    if (entries[k] !== null) {
      if (k % 2 === 0) {
        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        parent.append(row);
      }
      var columnHalf = document.createElement('div');
      columnHalf.setAttribute('class', 'column-half');
      row.append(columnHalf);
      var card = document.createElement('div');
      card.setAttribute('class', 'card');
      columnHalf.append(card);
      var quoteList = document.createElement('ul');
      quoteList.setAttribute('class', 'quote');
      card.append(quoteList);
      var quote = document.createElement('li');
      quoteList.append(quote);
      var author = document.createElement('li');
      quoteList.append(author);

      quote.textContent = entries[k].quote;
      author.textContent = entries[k].author;

      if ('quote' in savedQuote) {
        var newButton = document.createElement('button');
        newButton.setAttribute('class', 'button');
        newButton.setAttribute('type', 'submit');
        newButton.textContent = 'LIKE';
        card.append(newButton);
      }
    }
  }
}
