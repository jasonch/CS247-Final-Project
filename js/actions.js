
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

function startResolution () {
  var resolution = jQuery.trim($('#resolution').val());
  var days = $('#days').val();

  if (resolution == "") return;

  fbRequireLogin (function () {
    addResolution (resolution, days);
  });
}

function clearText (el) {
  if (!el.no_clear_text) {
    el.no_clear_text = true;
    el.value = "";
  }
}

function addResolution (resolution, day) {
  $.ajax ({
    type: "POST",
    url: AJAX_DIR + "addResolution.php",
    data: "user_id=" +USER_INFO.id+ "&resolution=" + resolution + "&day=" + day,
    success: function (text) {
      var intVal = parseInt (text);
      switch (intVal) {
        case -1:
          alert("You have already added this goal! You can do it!");
          break;
        default:
          if ($.inArray (intVal, USER_INFO.addedRes) == -1) {
            USER_INFO.addedRes.push (parseInt(text));
            addToContent(formatResolution (USER_INFO.name, resolution, day));
          }
      }
    }
  });
}

function addToContent (htmlText) {
  $('#content').html (htmlText +$('#content').html());
}

function changeContent (page) {
  CUR_PAGE = page;
  switch (page) {
    default:
      fbRequireLogin(load_friends);
      fbRequireLogin(load_myinfo);
  }

}

function loadCurrentPage () {
  var params = getArgs ();
  console.log (params);
  if (params["loc"] == undefined)
    params["loc"] == "";

  if (params["loc"] != CUR_PAGE)
    changeContent (params["loc"]);
}
