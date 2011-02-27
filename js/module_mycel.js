function load_mycel () {
  $.ajax ({
    type: "POST",
    url: AJAX_DIR + "getUserChallenges.php",
    data: "user_id=" + USER_INFO.user_id,
    success: function (data) {
       var challenges = eval ('(' + data + ')');
        $('#block-my-cel').html (data);
        //if (challenges != undefined)
        // 	$('#block-my-cel').html (format_mycel (challenges));
    }
  });
}

function format_mycel (challenges) {
  window.my_challenges = challenges;
  var result = "";
  var list = "<div class'title'> My Challenge List </div>";
  for (var i = 0; i < challenges.sent.length; i++) {
    var callengeList = challenges.sent;
    var oldDate = new Date(challengeList[i].timestamp);
    var newDate = new Date();
    var numDaysLeft = newDate.getDate() - oldDate.getDate(); 
  	
  	var eChallenge = 
      "<div class='user_challenges' id='user-challenge-" + chellenges[i].challenge_id + "'><dl>" + 
	  "<dt>" + challengeList[i].challenge + "</dt>"+
	  "<dd>Number of days left for " + challengeList[i].to_User +" to complete challenge" +
	  " = " +numDaysLeft+ "</dd>" +
	  "<dd>What's at stake: $" + challengeList[i].stake+ "</dd>"+
	  "</dl>" +
      "</div>";
  	result += eChallenge;
  }

  return list+ result + "</div>";
}
