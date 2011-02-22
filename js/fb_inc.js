
  function fbLoadUserInfo (callback) {

    FB.api ('/me', function (user) {
      $.ajax ({
        type: "POST",
        url: AJAX_DIR + "addUser.php",
        data: "user_id=" + user.id + "&name=" +user.name, 
        success: function(data) {
          if (data == "true") {
            window.USER_INFO = user;
            callback();
          }
        }
      });
    }); 
  }

  function fbRequireLogin (callback) {
    if (USER_INFO.id ==  undefined) {
      FB.login (function (response) {
        if (response.session) {
          console.log (response);
          fbLoadUserInfo (callback);
        } else {
          alert ("Login Required!");
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
    fbLoadUserInfo (EMPTY_FUNC);
    changeContent ("");
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
