
  function fbLoadUserInfo (callback) {

    if (window.USER_INFO.user_id == undefined) {
      FB.api ('/me', function (user) {
        $.ajax ({
          type: "POST",
          url: AJAX_DIR + "addUser.php",
          data: "user_id=" + user.id + "&name=" +user.name, 
          success: function(data) {
            if (data.toLowerCase () != "false") {
              window.USER_INFO = eval ('(' + data + ')');
              callback();
            }
          }
       });
      }); 
    } else {
       $.ajax ({
        type: "POST",
        url: AJAX_DIR + "getUser.php",
        data: "user_id=" + window.USER_INFO.user_id,  
        success: function(data) {
          if (data != "false") 
            window.USER_INFO = eval ('(' + data + ')');
          callback();
        }
      });
    }   
  }

  function fbLoadFriends (callback) {
    if (window.FRIENDS == undefined) {
      FB.api ('/me/friends', function (friends) {
        window.FRIENDS = friendArrayToObject (friends.data);
        callback ();
      });
    } else 
      callback ();
  }

  function fbRequireLogin (callback) {
    if (USER_INFO.id ==  undefined) {
      FB.getLoginStatus (function (response) {
        // don't call FB.login if already logged in
        if (response.session) {
          fbLoadUserInfo (callback);
        } else {
          FB.login (function (response) {
            if (response.session) {
              fbLoadUserInfo (callback);
            } else {
              alert ("Login Required!");
            }
          });
        }
       });
    } else {
      callback ();
    }
  }

  function fbLoginStatus (response) {
    if (response.session) {
      fbLoginEvent ();
    } else {
      fbLogoutEvent ();
    }
  }

  function fbLoginEvent () {
    fbLoadUserInfo (
      function () { loadCurrentPage (); } );
  }

  function fbLogoutEvent () {
    window.USER_INFO = {};
  }

  FB.init({ 
    appId: APP_ID, cookie:true, 
    status:true, xfbml:true 
  });
  FB.getLoginStatus(fbLoginStatus);
  FB.Event.subscribe('auth.login', fbLoginEvent);
  FB.Event.subscribe('auth.logout', fbLogoutEvent);
