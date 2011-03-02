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
  var pending = [];
  
  for (var i = 0; i < challenges.received.length; i++) {
  	if (challenges.received[i].message == 0) { // The challenge is pending...
  		var challenge = challenges.received[i];
  		pending.push(challenge);
  	}
  }
  
  for (var j = 0; j < pending.length; j++) {
    var pendingChallenge = pending[j];
    result += 
      pendingChallenge.fromUser + "has challenged you to" + pendingChallenge.challenge + "." + "<button type='button'> Accept </button> <button type='button'> Decline </button>";
  }
  return result;
  
 }
