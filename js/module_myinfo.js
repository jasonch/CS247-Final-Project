function load_myinfo () {
    console.log (window.USER_INFO);
    $('#block-my-info').html (formatUserInfo(window.USER_INFO));
}

function formatUserInfo(user) {
  var result =  "<div class='myinfo'>"+
    "<div class='user_pic'><img src='http://graph.facebook.com/"+user.user_id+"/picture?type=normal'/></div>" +
    "<div class='user_name'>" + user.name + "</div>";
  if (user.message == null) {
    result += "<div class='user_status'><input type='text' id='user-status-box' value='set your status here' onclick='clearText(this)' onChange='updateStatus(this);'></input></div>";
  } else {
    result += "<div class='user_status'><input type='text' value='" + user.message + "' onChange='updateStatus(this);' ></input></div>";
  }
  result += "<div class='user_pts'>" + user.points + " Points</div>";

  result += "</div>";
  return result;
}
