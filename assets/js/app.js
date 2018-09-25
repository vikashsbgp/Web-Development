//Variables
const tweetList = document.getElementById('tweet-list');


//Event Listeners
eventListeners();

function eventListeners() {
    //Form Submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    //remove tweet from the list
    tweetList.addEventListener('click', removeTweet);

    //Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}



//Functions


function newTweet(e) {
    e.preventDefault();

    //Read the textarea value
    const tweet = document.getElementById('tweet').value;
   
    //create the remove button
    const removeBtn  = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    //create an li element
    const li = document.createElement('li');
    li.textContent = tweet;
    

    //Add the remove button to each tweet
    li.appendChild(removeBtn);

    //Add to the list
    tweetList.appendChild(li);

    //add tweets to Local Storage
    addTweetLocalStorage(tweet);
}

//Remove Tweet function
function removeTweet(e) {
    if(e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }

    //Remove from storage
    removeTweetLocalStorage( e.target.parentElement.textContent );
}

//add tweets to Local Storage
function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();

    //add the tweet into the array
    tweets.push(tweet);

    //Convert array into string
    localStorage.setItem('tweets', JSON.stringify( tweets ) );
}

//Get tweets from Local Storage
function getTweetsFromStorage() {
    let tweets;
    let tweetLS = localStorage.getItem('tweets');
    //Get the values, if null value returned then we create an empty array
    if(tweetLS === null) {
        tweets = [];
    }
    else {
        tweets = JSON.parse(tweetLS);
    }
    return tweets;
}

//prints from Local storage
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();
    
    //Loop through storage and then print
    tweets.forEach(function(tweet) {
        //create the remove button
        const removeBtn  = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        //create an li element
        const li = document.createElement('li');
        li.textContent = tweet;
        

        //Add the remove button to each tweet
        li.appendChild(removeBtn);

        //Add to the list
        tweetList.appendChild(li);
    });
}

//Remove from local storage
function removeTweetLocalStorage(tweet) {
    //get tweets from storage
    let tweets = getTweetsFromStorage();


    //Remove the 'X' frome the tweet
    const tweetDelete = tweet.substring( 0, tweet.length - 1 );

    //Loop through the tweets and remove the tweets from storage
    tweets.forEach(function( tweetLS, index ) {
        if(tweetDelete === tweetLS){
            tweets.splice( index, 1 );
        }
    });

    //Save the data to local storage
    localStorage.setItem( 'tweets', JSON.stringify( tweets ) );
}