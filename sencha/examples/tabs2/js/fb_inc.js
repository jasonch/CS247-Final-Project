
  function fbLoadUserInfo (callback) {

    if (CEL.USER_INFO.user_id == undefined) {
      FB.api ('/me', function (user) {
        Ext.Ajax.request ({
          url: AJAX_DIR + "addUser.php",
          params: {
            user_id: user.id,
            name: user.name
          },
          method: 'POST',
          success: function (data) {
            if (data.responseText != "false") {
              CEL.USER_INFO = eval ('(' + data.responseText + ')');
              callback(CEL.USER_INFO);
            }
          }
        });
      }); 
    } else {
       Ext.Ajax.request ({
        url: AJAX_DIR + "getUser.php",
        params: { user_id: CEL.USER_INFO.user_id},
        method: 'POST',
        success: function(xhr) {
          var data = xhr.responseText;
          if (data != "false") 
            CEL.USER_INFO = eval ('(' + data + ')');
          callback(CEL.USER_INFO);
        }
      });
    }   
  }

  function fbLoadFriends (callback) {
    if (window.FRIENDS == undefined) {
      FB.api ('/me/friends', function (friends) {
        window.FRIENDS = friends.data; 
        callback (friends.data);
      });
    } else 
      callback (window.FRIENDS);
  }

  function fbRequireLogin (callback) {
    if (CEL.USER_INFO.id ==  undefined) {
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
    fbLoadUserInfo (EMPTY_FUNC );
  }

  function fbLogoutEvent () {
    CEL.USER_INFO = {};
  }

  FB.init({ 
    appId: APP_ID, cookie:true, 
    status:true, xfbml:true 
  });
  FB.getLoginStatus(fbLoginStatus);
  FB.Event.subscribe('auth.login', fbLoginEvent);
  FB.Event.subscribe('auth.logout', fbLogoutEvent);
