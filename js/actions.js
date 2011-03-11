
function getArgs () {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('/');
    for(var i = 0; i < hashes.length; i++)
    {
        //hash = hashes[i].split('=');
        vars.push(hashes[i]);
        //vars[hash[0]] = hash[1];
    }
    return vars;
}

function clearText (el) {
  if (!el.no_clear_text) {
    el.no_clear_text = true;
    el.style.color = "#000000";
    el.value = "";
  }
}

function startSearch () {
  $('#friends-search-box').keyup ( function () {
    updateFriendBlock (function (name) {
      return name.toLowerCase().indexOf(
        jQuery.trim($('#friends-search-box').val())
          .toLowerCase()) != -1;
    });
  });

}

function changeContent (page) {
  CUR_PAGE = page;
  switch (page) {
    case "vis":
      fbLoadFriends (load_goals);
      load_myinfo ();
      fbLoadFriends (load_visualization);
      break;
    default:
      fbRequireLogin(function () {
        fbLoadFriends (load_goals);
        load_myinfo ();
        fbLoadFriends (load_mycel);
      });
  }
}

function systemMessage (text) {
  $('#system-message').html (text);
  setTimeout (function (){
    $('#system-message').html("");
  }, 3000);
}

function updateStatus (el) {
  $.ajax ({
    type: "POST",
    url: AJAX_DIR + "updateStatus.php",
    data: "user_id="+ USER_INFO.user_id + "&status=" + el.value,
    success: function () {
      systemMessage ("Status successfully updated!");
    }
  });
}

function loadCurrentPage () {

  var params = getArgs ();
  if (params[0] == undefined)
    params[0] == "";

  changeContent (params[0]);
}

function selectFriendItem (friendId) {
  if (jQuery.inArray(friendId, window.autocompleteArray) == -1) {
    var name = window.FRIENDS[friendId].name;
    $('#goal-participants-box').append ($("<div class='selected-friends'></div>")
        .append ("<input type='text' value='"+name+"' size="+name.length+" disabled='true'/>")
        .show ());
    window.autocompleteArray.push (friendId);
    $('#goal-recipients').val(window.autocompleteArray.join (','));
  }
}



function friendFilter () {
  var prefix = $('#goal-participants').val().toLowerCase();
  
  var result = "";
  for (var f in window.FRIENDS) {
    if (window.FRIENDS[f].name.toLowerCase().indexOf (
      jQuery.trim (prefix)) == -1) continue;

    result += "<div class='friend-item' onClick='selectFriendItem(" + window.FRIENDS[f].id + ")'>" + window.FRIENDS[f].name + "</div>";
  }
  return result;
}

function boxOpen (open_id, open_url, parent_el) {
  $.ajax ({
    type: "GET",
    url: AJAX_DIR + open_url,
    data: "user_id="+ window.USER_INFO.user_id, 
    success: function (text) {
      $('#' + open_id).remove ();
      $("#"+ parent_el).append( $("<div id='"+ open_id + "' class='lightbox' ></div>")
      .append (text)
      .show ());
      $('.lightbox').bind ('click', function (event) {
        $('.autocomplete').remove ();
        event.stopPropagation ();
      });
    }
   });
  }

  function autocomplete (id, filter, parent_id) {
    $('#' + id).remove ();
    $('#' + parent_id).append ($("<div id='" + id + "' class='autocomplete'></div>")
      .append (filter())
      .show ());
  }


  function validateChallenge () {
    var friend = $('input:[type="hidden"][name="to_user"]').val ();
    var text = $('input:[type="text"][name="challenge"]').val ();
    var enteredStake = parseInt($('input:[type="text"][name="stake"]').val ());

    if (isNaN (enteredStake) || text  == "" || 
        enteredStake > USER_INFO.points ||
        enteredStake > FRIENDS[friend].points ) {
      alert ("You must enter a valid challenge");
      return false;
    }
    $('input:[type="text"][name="stake"]').val (
      parseInt($('input:[type="text"][name="stake"]').val()));

    $.ajax ({
      type: "POST",
      url: AJAX_DIR + "addChallenge.php",
      data: "from_user="+ USER_INFO.user_id + "&to_user=" + friend + "&stake=" + enteredStake + "&challenge=" + text,
      success: function (text) {
        $('#challenge-friend').remove ();
        if (text == "true") {
          systemMessage ("Request sent!");
          fbLoadUserInfo( function () {
            load_myinfo();
            //load_mycel ();
          });
        } else 
          systemMessage ("An error occurred with your request.");
      }
    });
    return true;  
  }

function setupGoal () {
  // remove no matter what in case people keep clicking
  $(".lightbox").remove ();

  var goal_id = $('#pool-id').val(); 
  var user_id = $('input:[type="hidden"][name="sender"]').val ();
  var recipients = $('input:[type="hidden"][name="recipients"]').val ();
  if (goal_id != undefined && goal_id != "") {
    
    $.ajax ({
      type: "POST",
      url: AJAX_DIR + "addPool.php",
      data: "from_user=" + user_id + "&to_user=" + recipients + "&goal_id=" + goal_id,
      success: function (data) {
        if (data.toLowerCase () != "false") {
          systemMessage ("Your goal is set up! Good Luck!");
        }
      }
    });
  } else {
    var goal_text = $('input:[type="text"][name="goal-text"]').val ();
    var days = $('input:[type="text"][name="goal-days"]').val ();
    $.ajax ({
      type: "POST",
      url: AJAX_DIR + "addGoal.php",
      data: "from_user=" + user_id + "&to_user=" + recipients + "&goal=" + goal_text + "&num_days=" + days,
      success: function (data) {
        if (data.toLowerCase () != "false") {
          systemMessage ("Your goal is set up! Good Luck!");
        } 
      }
    });
  }
}

function joinGoal () {
  $(".lightbox").remove ();
  var pool_id = $('#pool_id').val ();
  $("#goal-join-" + pool_id).html ("leave");
}

function clearLightbox () {
  if ($('.lightbox').length != 0) {
    $('.lightbox').remove ();
  }
}

function inviteFriend () {
  var friend = $('input:[type="hidden"][name="to_user"]').val ();
  var text = $('input:[type="text"][name="challenge"]').val ();
  if (text == "" || friend == undefined) return;
  FB.ui ({
    method: 'apprequests', 
    message: 'I want to help you stop ' + text + ' on CEL!',
    to: friend
  });

}


