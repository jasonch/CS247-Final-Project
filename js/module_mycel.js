function load_mycel () {
  $.ajax ({
    type: "POST",
    url: AJAX_DIR + "getUserChallenges.php",
    data: "user_id=" + USER_INFO.user_id,
    success: function (data) {
       var challenges = eval ('(' + data + ')');
        //$('#block-my-cel').html (data);
        if (challenges != undefined)
         	$('#block-my-cel').html (format_mycel (challenges));
    }
  });
}

function format_mycel (challenges) {
  window.MY_CHALLENGES = challenges; // set global variable for future reference
  var result = "";
  var list = "<div class'title'> My Challenge List </div>";

  var pending = []; // need to distinguish whether the challengee has accepted
  
  for (var j = 0; j < challenges.recieved.length; j++) {
  	if (challenges.recieved[i].status == 0) { // The challenge is pending...
  		var challenge = challenges.recieved[i];
  		pending.push(challenge);
  	}
  }
  for (var k = 0; k < pending.length k++) {
    var pendingChallenge = pending[k];
    var ePendingChallenge = 
      pendingChallenge.fromUser + "has challenged you to" + pendingChallenge.challenge + "." + "<button type='button'>" + Accept + "</button> <button type='button'>" + Decline + "</button>";
  }
  
  var started = []; // by checking the status of the challenge
  for (var i = 0; i < challenges.sent.length; i++) {
    var chellenge = challenges.sent[i];

    var oldDate = new Date(challenge.timestamp);
    var newDate = new Date();
    var numDaysLeft = (newDate.getTime () - oldDate.getTime ()) / 86400; // num seconds difference divided by number of seconds in a day
    if (numDaysLeft < 0); // call some functions to handle challenge passed
    if (challenge.status == 1); // add to pending list
	  
  
  	var eChallenge = 
      "<div class='user_challenges' id='user-challenge-" + challenge.challenge_id + "'><dl>" + 
	  "<dt>" + challenge.challenge + "</dt>"+
	  "<dd>Number of days left for " + challenge.to_user +" to complete challenge" +
	  " = " +numDaysLeft+ "</dd>" +
	  "<dd>What's at stake: $" + challenge.stake+ "</dd>"+
	  "</dl>" +
      "</div>";
  	result += eChallenge;
  }
  return list+ result + "</div>";
}
