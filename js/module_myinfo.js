function load_myinfo () {
    $('#block-my-info').html (formatUserInfo(window.USER_INFO));
}

function formatUserInfo(user) {
  var result =  "<div class='myinfo'>"+
    "<div class='user_pic'><img src='http://graph.facebook.com/"+user.user_id+"/picture?type=normal'/></div>" +
    "<div class='user_name'>" + user.name + "</div>";
  if (user.status == null) {
    result += "<div class='user_status'><input type='text' id='user-status-box' value='set your status here' onclick='clearText(this)' onChange='updateStatus(this);' size='60'></input></div>";
  } else {
    result += "<div class='user_status'><input id='user-status-box' type='text' value='" + user.status + "' onChange='updateStatus(this);' size='60'></input></div>";
  }
  result += "</div>";
  return result;
}
