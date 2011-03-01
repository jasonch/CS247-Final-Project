
  function fbLoadUserInfo (callback) {

    FB.api ('/me', function (user) {
      $.ajax ({
        type: "POST",
        url: AJAX_DIR + "addUser.php",
        data: "user_id=" + user.id + "&name=" +user.name, 
        success: function(data) {
          if (data != "false") {
            window.USER_INFO = eval ('(' + data + ')');
            callback();
          }
        }
      });
    }); 
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
      function () { changeContent ("my"); } );
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
