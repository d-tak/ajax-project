/* exported data */
var data = {
  view: 'savedQuote',
  quotations: [],
  editing: null,
  nextQuotationId: 1,
  currentQuote: null
};

var previousEntryJSON = localStorage.getItem('ajax-local-storage');
if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', likedThought);

function likedThought(event) {
  var stringifyQuoteJSON = JSON.stringify(data);
  localStorage.setItem('ajax-local-storage', stringifyQuoteJSON);
}
