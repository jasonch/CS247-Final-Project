function load_friends () {
	  FB.api ('/me/friends', function (friends) {
      window.FRIENDS = friendArrayToObject (friends.data); 
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

  return "<div class='friend-item' id='friend-item-"+id+"'>"+
    "<div class='user_pic'><img src='http://graph.facebook.com/" + 
    f.id + "/picture'/></div>"+f.name+"</div>\n";
}

function updateFriendBlock (nameFilter) {
	    var result = "";
      var count = 0;
      $('#friends-list').html ("");
	    for(var i in FRIENDS) {
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

}

