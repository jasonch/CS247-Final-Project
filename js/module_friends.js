function load_friends () {
    var searchbox = 
      "<div class='friends-search'>" +
      "   <input type='text' id='friends-search-box' value='search...' onclick='clearText(this);'></input>" + 
      "</div>";

	  FB.api ('/me/friends', function (friends) {
	    var result = "";
	    for(var i = 0; i < friends.data.length && i < 20; i++) {
	      result += formatFriendItem(friends.data[i], friends.data[i].id);
	    }
	    $('#block-friends').html (searchbox + result);

      for (var i = 0; i < friends.data.length && i < 20; i++) {
        var id = friends.data[i].id;
        var friendname = friends.data[i].name;
        $('#friend-item-' + id).bind ('click', {fid:id, fname: friendname}, function (event) {
          boxOpen ("challenge-friend",
            "challengeFriend.php?from="+USER_INFO.user_id + "&to=" + event.data.fid+"&fname="+event.data.fname, "friend-item-"+ event.data.fid);
        });
      }
      $('.friend-item').bind('mouseenter mouseleave', function () {
        $(this).toggleClass('focused');
      });

	  });
}

function formatFriendItem(f, id) {

  return "<div class='friend-item' id='friend-item-"+id+"'>"+
    "<div class='user_pic'><img src='http://graph.facebook.com/" + 
    f.id + "/picture'/></div>"+f.name+"</div>";
}
