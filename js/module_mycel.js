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

  result += "<div class='title'>Challenges For Me</div>";
  for (var j = 0; j < pending.length; j++) {
    var pendingChallenge = pending[j];
    result += 
      pendingChallenge.fromUser + " has challenged you to" + pendingChallenge.challenge + "." + "<button type='button'> Accept </button> <button type='button'> Decline </button>";
  }

  var sent_pending = [];
  var sent_active = [];
  for (var i = 0; i < challenges.sent.length; i++) {
    var challenge = challenges.sent[i];
    switch (challenge.status) {
      case "0":
        sent_pending.push (challenge);
        break;
    }
  }

  result += "<div class='title'>Challenges I Sent</div>";
  for (var i = 0; i < sent_pending.length; i++) {
    var challenge = sent_pending[i];
    result += "<div class='challenge-item pending' id='challenge-id-" + challenge.challenge_id + "'>";
    result += window.FRIENDS[challenge.to_user].name + " has not accepted your challenge to stop " + challenge.challenge + " for $" + challenge.stake;
    result += " <a onclick='cancelChallenge("+challenge.challenge_id+")' href='#'>Cancel</a>";
    result += "</div>";
  }

  // 259200 = 24 * 60 * 60 * 3
  for (var i = 0; i < sent_active.length; i++) {
    var challenge = sent_active[i];
    var days_left = ((new Date (challenge.timestamp).getTime () + 259200 - (new Date ()).getTime())) / 259200;
    result += "<div class='challenge-item active' id='challenge-id-" + challenge.challenge_id + "'>";
    result += window.FRIENDS[challenge.to_user].name + " has " + days_left + " left without " + challenge.challenge;
    result += " <a onclick='busted("+challenge.challenge_id+")' href='#'>Busted!</a>";
    result += "</div>";
  } 

  return result;
  
 }


function cancelChallenge (id) {
  $.ajax ({
    type: 'POST',
    url: AJAX_DIR + 'cancelChallenge.php',
    data: 'user_id='+window.USER_INFO.user_id+'&challenge_id='+id,
    success: function (response) {
      if (response == "true") {
        systemMessage ("Request Cancelled");
        $('#challenge-id-' + id).remove ();
      } else {
        systemMessage ("An error occurred");
      }
    }

  });
}
function busted (id) {
  $.ajax ({
    type: 'POST',
    url: AJAX_DIR + 'bustChallenge.php',
    data: 'user_id='+window.USER_INFO.user_id+'&challenge_id='+id,
    success: function (response) {
      if (response == "true") {
        systemMessage ("BUSTED!");
        $('#challenge-id-' + id).remove ();
        load_myinfo ();
      } else {
        systemMessage ("An error occurred");
      }
    }

  });
}

