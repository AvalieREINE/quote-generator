const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

 
function showLoadingSpinner(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

 
function hideLoadingSpinner(){
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// show new quote
function newQuote() {
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
  if(!quote.author){
    authorText.textContent = 'unknown';
  }else{
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 120){
    quoteText.classList.add('long-quote');
  }else{
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  hideLoadingSpinner();
}

// get quotes from api
async function getQuotes(){
  showLoadingSpinner();
  const apiUrl ='https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
     
  }
 catch(error){
  console.log(error);
}
}

// tweet a quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}
 
// event listener
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// on load
getQuotes();
 