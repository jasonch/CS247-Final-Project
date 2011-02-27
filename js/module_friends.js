function load_friends () {
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

}

