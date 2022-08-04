/* exported data */
var data = {
  view: 'savedQuote',
  entries: [],
  editing: null,
  nextEntryId: 1
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

// window.addEventListener('beforeunload', saveJournal);
// function saveJournal(event) {
//   var stringifyJournalJSON = JSON.stringify(data);
//   localStorage.setItem('ajax-local-storage', stringifyJournalJSON);
// }
