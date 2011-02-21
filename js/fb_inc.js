
  function fbLoadUserInfo (callback) {
    FB.api ('/me', function (user) {
      $.ajax ({
        type: "POST",
        url: AJAX_DIR + "addUser.php",
        data: "user_id="+user.id+"&first_name=" +user.first_name+ "&last_name=" + user.last_name,
        success: function(data) {
          if (data == "true") {
            window.USER_INFO = user;
            window.USER_INFO.addedRes = [];
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

  function fbLoginStatus(response) {
     if(response.session) {
       fbLoadUserInfo(EMPTY_FUNC);
     } else {
        window.USER_INFO = {};
     }
  }


  FB.init({ 
    appId: APP_ID, cookie:true, 
    status:true, xfbml:true 
  });
  FB.getLoginStatus(fbLoginStatus);
  FB.Event.subscribe('auth.statusChange', fbLoginStatus);
