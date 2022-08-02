var $quote = document.querySelector('#quote');

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
  }
  );
  xhr.send();
}
getData();
