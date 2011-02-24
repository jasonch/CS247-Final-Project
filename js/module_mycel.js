function load_mycel () {
  $.ajax ({
    type: "POST",
    url: AJAX_DIR + "getUserChallenges.php",
    data: "user_id=" + USER_INFO.user_id,
    success: function (data) {
       var challenges = eval ('(' + data + ')');
        $('#block-my-cel').html (data);
       	$('#block-my-cel').html (format_mycel (challenges));
    }
  });
}

function formatMyCel (challenges) {
  var result = "";
  var list = "<body My Challenge List </body>";
  var oldDate = new Date(challenge[i].timestamp);
  var newDate = new Date();
  var numDaysLeft = newDate.getDate() - oldDate.getDate(); 
  for (var i = 0; i < challenges.from.length; i++) {
  	
  	var eChallenge = 
      "<div class=user_challenges>" +
      "id='user-challenge'" +
      "<dl>
	  "<dt> + challenges[i].challenge + </dt>"+
	  "<dd>Number of days left for " + challenge[i].to_User +" to complete challenge" +
	  " = " +numDaysLeft+ "</dd>" +
	  "<dd>What's at stake: $" + challenge[i].stake+ "</dd>"+
	  "</dl>" +
      "</div>";
  	
  }
}