function load_friends () {
  fbLoadFriends (function (friends) {
    window.TAB_FRIENDS.update (friends);

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

}

