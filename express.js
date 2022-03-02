var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000; 

var tweets = [
  {

    id: 2384071,
    name: 'Tim O' + "' " + 'Rielly',
    screen: 'timoreilly'
  },
  {
    id: 2408481,
    name: 'Mark Ury',
    screen: 'MarkUry'
  },
  {
    id: 633,
    name: 'danah boyd',
    screen: 'zephoria'
  },
  {
    id: 14078377,
    name: 'SarahPrevette',
    screen: 'SarahPrevette'
  },
  {
    id: 15414807,
    name: 'johnmaeda',
    screen: 'johnmaeda'
  }
  
]

var tweetinfo = [
{
  time: 'Wed Mar 13 23:01:36 +0000 2013',
  tweetid: 311975360667459585,
  tweettext: "Was wondering why @billgates cc'd me on story abt @MSFTResearch cool viral search tool; discovered I'm featured in it http:\/\/t.co\/g6oSeEIEUr"
},
{
  time: 'Wed Mar 13 22:16:59 +0000 2013',
  tweetid: 311964132205268992,
  tweettext: "The one page everyone in Hollywood is watching http:\/\/t.co\/jaX0uQqk4W  This is the film industry's Pebble Watch moment."
},
{
  time: 'Wed Mar 13 13:16:30 +0000 2013',
  tweetid: 311828115477372928,
	tweettext: "I reflected on why the #sxsw induction means so much to me and it took &gt;140 chars: http:\/\/t.co\/rJWz0jKrqf"
},
{
  time: 'Tue Mar 12 13:29:12 +0000 2013',
  tweetid: 311468922962587651,
  tweettext: "How to Create an Early Stage Pitch Deck\nhttp:\/\/t.co\/TdYB5I6xBl\n(Great advice from @ryanspoon )"
},
{
  time: 'Tue Mar 12 11:05:00 +0000 2013',
  tweetid: 311432631726264320,
  tweettext: "1st gear Empathy, 2nd gear Prototype, 3rd gear Align w\/ Reality http:\/\/t.co\/QxDfp2GLcQ by @Jabaldaia http:\/\/t.co\/CLcxKevjrY"
}
]
 
var searchinfo = [
  {
    tID: 0,
    tweettime: '',
    tweettext2: ''
  }
]

//Date for new tweets
var today = new Date();
today = Date(Date.now());

app.use(express.static(__dirname));
app.use(bodyParser.json());

//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  res.send({ tweets: tweets});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  res.send({ tweetinfo: tweetinfo});
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  res.send({ searchinfo: searchinfo})
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  const tweetId3 = req.body.tweetid;
  
  const words = tweetId3.split(';');

  var ID = 
  tweetinfo.push({
    tweetid: words[0],
    tweettext: words[1],
    time: today

  });

  res.send('Successfully created tweet!');

});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  var searchedid = req.body.tID;
  var temptext = "";
  var temptime = "";

  for (let i = 0; i < 5; i++) {
    if (tweetinfo[i].tweetid == searchedid) {
      temptime = tweetinfo[i].tweettext;
      temptext = tweetinfo[i].time;
    }

  }

  searchinfo.push({
    tID: searchedid,
    tweettext2: temptext,
    tweettime: temptime
  });

  res.send('Shown tweet');
});

//Update
app.put('/tweets/:id', function(req, res) {
  var id = req.params.id;
  var newName = req.body.sc;
  var found = false

  tweets.forEach(function(tweet, index){
    if (!found && tweet.id === Number(id)) {
      tweet.screen = newName;
    }

  });

  res.send('Successfully updated tweet');

});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  var id = req.body.tweetid;   
  console.log(id);
  var found = false;

  tweetinfo.forEach(function(tweet, index){
    if (!found && tweet.tweetid === Number(id)) {
      tweetinfo.splice(index, 1);
    }

  });

  res.send('Successfully deleted product');

});

function test_print(){

  console.log("test code")

}

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});