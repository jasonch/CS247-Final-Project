/*function load_friends () {
	  FB.api ('/me/friends', function (friends) {
      window.FRIENDS = friends.data;
      updateFriendBlock (function () {return true;});
	  });
}

function formatFriendItem(f, id) {

  return "<div class='friend-item' id='friend-item-"+id+"'>"+
    "<div class='user_pic'><img src='http://graph.facebook.com/" + 
    f.id + "/picture'/></div>"+f.name+"</div>\n";
}

function updateFriendBlock (nameFilter) {
	    var result = "";
      var count = 0;
      console.log (FRIENDS.length);
	    for(var i = 0; i < FRIENDS.length; i++) {
        if (!nameFilter (FRIENDS[i].name)) continue;
	      result += formatFriendItem(FRIENDS[i], FRIENDS[i].id);
        count++;
        if (count > 20) break;
	    }
	    $('#friends-list').html (result);

      for (var i = 0, count = 0; i < FRIENDS.length; i++) {
        if (!nameFilter (FRIENDS[i].name)) continue;
        var id = FRIENDS[i].id;
        var friendname = FRIENDS[i].name;
        $('#friend-item-' + id).bind ('click', {fid:id, fname: friendname}, function (event) {
          boxOpen ("challenge-friend",
            "challengeFriend.php?from="+USER_INFO.user_id + "&to=" + event.data.fid+"&fname="+event.data.fname, "friend-item-"+ event.data.fid);
        });
        count++;
        if (count > 20) break;
      }
      $('.friend-item').bind('mouseenter mouseleave', function () {
        $(this).toggleClass('focused');
      });

}*/

/*load a random compilation of goals in the box */
function load_goals () {
      var goals = [];
      goals = getGoals();
      if(goals == -1) return; /* there are no goals yet */
      updateGoalBlock (goals, function (){return true;} );
}

function getGoals() {
  $.ajax ({
    type: "POST",
    url: AJAX_DIR + "getGoals.php",
    data: "user_id=" + USER_INFO.user_id,
    success: function (data) {
       var goals = eval ('(' + data + ')');
        if (goals != undefined)
          updateGoalBlock (goals, function (){return true;} );
    }
  });
}


function formatGoals (goal) {
  var result = "<div class='goal' id='user-challenge-" + goal.goal_id + "'" +
  "<ul><li>Goal: " + goal.goal +"</li><li>Friends Involved: " + goal.num_following + "</li></ul></div>";
  return result;
}

function updateGoalBlock (goals, nameFilter) {
	var result = "";
    var count = 0;
	for(var i = 0; i < goals.length; i++) {
		if (!nameFilter (goals[i].goal)) continue;
		result += formatGoals(goals[i]);
        count++;
        if (count > 20) break;
	}
	$('#goals-list').html (result);

    for (var i = 0, count = 0; i < goals.length; i++) {
    if (!nameFilter (goals[i].goal)) continue;
        var id = goals[i].id;
        var goal = goals[i].goal;
        $('#goal-item-' + id).bind ('click', {fid:id, fname: goal}, function (event) {
          boxOpen ("join-pool",
            "joinPool.php?from="+USER_INFO.user_id + "&to=" + event.data.fid+"&fname="+event.data.fname, "goal-item-"+ event.data.fid);
        });
        count++;
        if (count > 20) break;
      }
      $('.goal-item').bind('mouseenter mouseleave', function () {
        $(this).toggleClass('focused');
      });

}

