function load_mycel () {
  $.ajax ({
    type: "POST",
    url: AJAX_DIR + "getUserChallenges.php",
    data: "user_id=" + USER_INFO.user_id,
    success: function (data) {
       var challenges = eval ('(' + data + ')');
        $('#block-my-cel').html (data);
       //$('#block-my-cel').html (format_mycel (challenges));
    }
  });
}

function formatMyCel (challenges) {
  var result = "";
  for (var i = 0; i < challenges.from.length; i++) {
  }
}
