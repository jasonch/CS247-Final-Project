
function getArgs () {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('/');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function clearText (el) {
  if (!el.no_clear_text) {
    el.no_clear_text = true;
    el.value = "";
  }
}

function startSearch () {
  $('#friends-search-box').change ( function () {
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
    default:
      fbRequireLogin(function () {
        load_myinfo ();
        load_mycel ();
        load_friends ();
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
/*
  var params = getArgs ();
  if (params["loc"] == undefined)
    params["loc"] == "";

  if (params["loc"] != CUR_PAGE)
    changeContent (params["loc"]);
*/
  changeContent ("");
}


function boxOpen (open_id, open_url, parent_el) {
  $.ajax ({
    type: "POST",
    url: AJAX_DIR + open_url,
    success: function (text) {
      $('#' + open_id).remove ();
      $("#"+ parent_el).append( $("<div id='"+ open_id + "' class='lightbox' ></div>")
      .append (text)
      .show ());
      $('.lightbox').bind ('click', function (event) {
        event.stopPropagation ();
      });
    }
   });
}


  function validateChallenge () {
    var friend = $('input:[type="hidden"][name="to_user"]').val ();
    var text = $('input:[type="text"][name="challenge"]').val ();
    var enteredStake = parseInt($('input:[type="text"][name="stake"]').val ());
    if (isNaN (enteredStake) ||
        text  == "" || 
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
        if (text != "false") 
          systemMessage ("Request sent!");
        else 
          systemMessage ("An error occurred with your request.");
      }
    });
    return true;  
  }
