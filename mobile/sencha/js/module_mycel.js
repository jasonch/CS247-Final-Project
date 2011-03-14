function load_mycel () {
  $('#block-content').html ("");
  $.ajax ({
    type: "POST",
    url: AJAX_DIR + "getUserGoals.php",
    data: "user_id=" + CEL.USER_INFO.user_id,
    success: function (data) {
       var goals = eval ('(' + data + ')');
        if (goals != undefined)
         	CEL.MyCEL.update (prepareGoals(goals));
    }
  });
}

function prepareGoals (goals) {
  window.MY_GOALS = goals;
  for (var i = 0; i < goals.length; i++) {
    if (goals[i].status == 0)
      goals[i].type = 'pending';
    else
      goals[i].type = 'active';

    if (goals[i].participants != undefined) {
      var party = eval ('('+ goals[i].participants + ')');
      if (party.length != 0)
        goals[i].participants_str = "with " + party.join(', ');
    }
 }
 return goals;
}

function format_mycel (goals) {
  window.MY_GOALS = goals;
  var pending = [];
  var active = [];
  var ended = [];


  for (var k = 0; k < goals.length; k++) {
    if (goals[k].status == 0)
      pending.push (goals[k]);
    else
      active.push (goals[k]);
  }

  var result = "";

  if (pending.length > 0) {
    result += "<div class='title'>Pending Invites</div>";
    for (var i = 0; i < pending.length; i++) {
      result += formatPendingGoal(pending[i]);
    }
  }
  if (active.length > 0) {
    result += "<div class='title'>Active C&Eacute;L</div>";
    for (var i = 0; i < active.length; i++) {
      result += formatActiveGoal(active[i]);
    }
  } 

  return result;
}

function formatPendingGoal (goal) {
  var participants = eval ('(' + goal.participants + ')');
  var friends = ""
  if (participants != undefined)
    friends = participants.join (", ");

  return "<div class='my-goal-item pending'>" + 
    "Work on <span class='my-goal-text'>" + goal.goal + "</span> for "+ goal.num_days + 
    " days with " + friends + "<span class='my-goal-links'><a href='#'>Accept</a><a href='#'>Ignore</a>" + 
    "</span></div>";
}

function formatActiveGoal (goal) {
  return "<div class='my-goal-item active'>" + 
    goal.num_days + " days left to <span class='my-goal-text'>" + goal.goal + 
    '</span><span class="my-goal-links"><a href="#" onClick="boxOpen(\'report-progress\', \'reportProgress.php\', \'my-goal-item-\');">report progress</a><a href="#">finished</a></span>' + 
    "</div>";
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

/*function accomplished (id, bool) {
    $.ajax ({
        type: 'POST',
        url: AJAX_DIR + 'accomplishChallenge.php',
        data: 'challenge_id='+ id ,
        success: function (response) {
            if (response == "true") {
                systemMessage ("ACCOMPLISHED!");
                $fbLoadUSerInfo (load_myinfo);
            } else {
                systemMessage ("An error occured");
            }
        }
    });
}
*/

