
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

function changeContent (page) {
  CUR_PAGE = page;
  switch (page) {
    case "my":
      fbRequireLogin(function () {
        load_myinfo ();
        setTimeout (load_mycel, 500);
        setTimeout (load_friends, 1000);
      });
      break;
    default:
  }

}

function updateStatus (el) {
  $.ajax ({
    type: "POST",
    url: AJAX_DIR + "updateStatus.php",
    data: "user_id="+ USER_INFO.user_id + "&status=" + el.value,
    success: function () {
      $('#system-message').html ("Status successully updated.");
      setTimeout (function (){
        $('#system-message').html("");
      }, 3000);}
  });
}

function loadCurrentPage () {
  var params = getArgs ();
  if (params["loc"] == undefined)
    params["loc"] == "";

  if (params["loc"] != CUR_PAGE)
    changeContent (params["loc"]);
}
