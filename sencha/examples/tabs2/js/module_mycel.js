function load_mycel () {
  fbLoadFriends (function (friends) {
    Ext.Ajax.request ({
      method: "POST",
      url: AJAX_DIR + "getUserChallenges.php",
      params: { user_id: CEL.USER_INFO.user_id },
      success: function (xhr) {
       var data = xhr.responseText;
       var challenges = eval ('(' + data + ')');
        if (challenges != undefined) {
          getUserNames (challenges, friends);
          CEL.MyCEL.update (challenges);
        }
      }
    });
  });
}

function friendArrayToObject (friends) {
  var Obj = {};
  for (var i = 0; i < friends.length; i++) {
    Obj[friends[i].id] = friends[i];
  }
  return Obj;
}

function getUserNames (challenges, friends) {

  var friendsInfo = friendArrayToObject (friends);
  for (var i = 0; i < challenges.sent.length; i++) {
    if  (friendsInfo[challenges.sent[i].to_user] != undefined)
      challenges.sent[i].to_user = friendsInfo[challenges.sent[i].to_user].name;
  }
  for (var i = 0; i < challenges.received.length; i++) {
    if  (friendsInfo[challenges.received[i].from_user] != undefined)
      challenges.received[i].from_user = friendsInfo[challenges.received[i].from_user].name;
  }

}

/*
function format_mycel (challenges) {
  window.MY_CHALLENGES = challenges; // set global variable for future reference
  var result = "";
  var list = "<div class'title'> My Challenge List </div>";
  var pending = [];
  var active = [];
  
  for (var i = 0; i < challenges.received.length; i++) {
    var challenge = challenges.received[i];
  	switch (challenge.status ) {
      case "0":
    		pending.push(challenge);
        break;
      case "1":
        active.push(challenge);
        break;
  	} 
  }

  result += "<div class='title'>Challenges For Me</div>";
  for (var j = 0; j < pending.length; j++) {
    var pendingChallenge = pending[j];
    result += "<div class='challenge-item pending' id='challenge-id-" + pendingChallenge.challenge_id + "'>";
    result += window.FRIENDS[pendingChallenge.from_user].name + " has challenged you to " ;
    result += pendingChallenge.challenge + ".<br/>" ;
    result += '<button type="button" onclick="acceptChallenge (' + pendingChallenge.challenge_id + ');"> Accept </button>';
    result += '<button type="button" onclick="cancelChallenge (' + pendingChallenge.challenge_id + ');"> Decline </button>';
    result += '</div>';
  }

  var sent_pending = [];
  var sent_active = [];
  for (var i = 0; i < challenges.sent.length; i++) {
    var challenge = challenges.sent[i];
    switch (challenge.status) {
      case "0":
        sent_pending.push (challenge);
        break;
      case "1":
        sent_active.push (challenge);
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

function acceptChallenge (id) {
  $.ajax ({
    type: 'POST',
    url: AJAX_DIR + 'acceptChallenge.php',
    data: 'user_id='+window.USER_INFO.user_id+'&challenge_id='+id,
    success: function (response) {
      if (response == "true") {
        systemMessage ("Request Accepted!");
        $('#challenge-id-' + id).remove ();
        fbLoadUserInfo (load_myinfo);
        fbLoadFriends (load_mycel);
      } else {
        systemMessage ("An error occurred");
      }
    }

  });

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
        fbLoadUserInfo (load_myinfo);
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
        fbLoadUserInfo (load_myinfo);
      } else {
        systemMessage ("An error occurred");
      }
    }

  });
}
*/
