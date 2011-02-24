function load_friends () {
	  FB.api ('/me/friends', function (friends) {
	    window.FRIENDS = friends.data;
	    var result = "";
	    for(var i = 0; i < friends.data.length && i < 20; i++) {
	      result += formatFriendItem(friends.data[i]);
	    }
	    $('#block-friends').html (result);
      $('#block-friends').show ();
	  });
}

function formatFriendItem(f) {
  return "<div class='friend-item'>"+
    "<div class='user_pic'><img src='http://graph.facebook.com/" + 
    f.id + "/picture'/></div><a href='#'>"+f.name+"</a></div>";
}
