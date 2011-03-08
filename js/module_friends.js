/*
function load_friends () {
  fbLoadFriends (function (friends) {
    updateFriendBlock (function () {return true;});
	});
}

function friendArrayToObject (friends) {
  var Obj = {};
  for (var i = 0; i < friends.length; i++) {
    Obj[friends[i].id] = friends[i];
  }
  return Obj;
}

function formatFriendItem(f, id) {
  var result = "<div class='friend-item' id='friend-item-"+id+"'>"+
    "<div class='user_pic'><img src='http://graph.facebook.com/" + 
    f.id + "/picture'/></div><div class='friend-name'>"+f.name+"</div>";
  if (f.message != undefined)
    result += "<div class='friends-message'>" + f.message + "</div>";
  result += "</div>\n";
  return result;
}

function updateFriendBlock (nameFilter) {
  var result = "";
  var count = 0;
  $('#friends-list').html ("");
  for(var i in window.FRIENDS) {
    if (!nameFilter (FRIENDS[i].name)) continue;
    $('#friends-list').append (formatFriendItem(FRIENDS[i], FRIENDS[i].id));
    // binds the click event to this item, need to be in formatFriendItem if append is done asynchronously...
    $('#friend-item-' + FRIENDS[i].id).bind ('click', {fid:FRIENDS[i].id, fname: FRIENDS[i].name}, function (event) {
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

function friendArrayToObject (friends) {
  var Obj = {};
  for (var i = 0; i < friends.length; i++) {
    Obj[friends[i].id] = friends[i];
  }
  return Obj;
}



/*load a random compilation of goals in the box */
function load_goals () {
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
  var result = "<div class='goal-item' id='goal-item-" + goal.goal_id + "'>" +
  goal.goal + "<div class='goal-num-following'>" + goal.num_following + " participating</div></div>";
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
	$('#goal-list').html (result);

    for (var i = 0, count = 0; i < goals.length; i++) {
      if (!nameFilter (goals[i].goal)) continue;
      var id = goals[i].goal_id;
      var goal = goals[i].goal;
      $('#goal-item-' + id).bind ('click', {gid:id, goal_text: goal}, function (event) {
        boxOpen ("goal-setup-box",
          "setup_goal.php?goal_id="+event.data.gid+"&user_id="+window.USER_INFO.user_id , "goal-item-"+ event.data.gid);
      });
      count++;
      if (count > 20) break;
    }

    $('.goal-item').bind('mouseenter mouseleave', function () {
      $(this).toggleClass('focused');
    });

}

