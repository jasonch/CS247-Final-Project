function load_visualization () {
  $.ajax ({
    type: 'POST',
    url: AJAX_DIR + 'getUserGoals.php',
    data: 'user_id=' + window.USER_INFO.user_id,
    success: function (response) {
      var goals = [];//eval ('(' + response + ')');
      renderVis (goals);
    }
  });
}

function formatVisMyCel (goal) {
  var result = goal.status == 0? "failed": "succeed";
  return "<tr><td>" + goal.date_started + "</td>" + 
    "<td>" + goal.date_finished + "</td>" + 
    "<td>" + goal.goal + "</td>" + 
    "<td><img src='images/" + result + ".png' width='40px' title='" + result + "' /></td></tr>";
 
}

function renderVis (goals) {
  $('#block-content').html ("<table id='vis-table'></table>");


  $('#vis-table').append ("<tr><th id='vis-table-from'>From</th><th id='vis-table-to'>To</th><th id='vis-table-description'>Description</th><th id='vis-table-result' class='result' rel='3'>Result</th></tr>");

  $('#vis-table').append (" <tr><td>Feb. 26</td><td>Feb. 28</td><td>No Caffeine</td><td><img src='images/succeed.png' width='40px' title='succeed' /></td></tr> \
          <tr><td>Feb. 27</td><td>Feb. 28</td><td>Going to the gym</td><td><img src='images/succeed.png' width='40px' title='succeed' /></td></tr> \
          <tr><td>Mar. 1</td><td>Mar. 4</td><td>quitting facebook</td><td><img src='images/failed.png' width='40px' title='failed'/></td></tr> \
          <tr><td>Mar. 2</td><td>Mar. 6</td><td>no kicking kittens</td><td><img src='images/succeed.png' width='40px' title='succeeded'/></td></tr>");

  $('#vis-table-from').bind ('click', function () {
    $('#vis-table').sortTable ({
      onCol: 1,
      keepRelationships: true,
      sortType: 'ascii'
    });
  });
  $('#vis-table-to').bind ('click', function () {
    $('#vis-table').sortTable ({
      onCol: 2,
      keepRelationships: true,
      sortType: 'ascii'
    });
  });
  $('#vis-table-description').bind ('click', function () {
    $('#vis-table').sortTable ({
      onCol: 3,
      keepRelationships: true,
      sortType: 'ascii'
    });
  });
  $('#vis-table-result').bind ('click', function () {
    //$('#vis-table').sortTable ({
    //  onCol: 4,
    //  keepRelationships: true,
    //  sortType: 'ascii'
    //});
  });
  $('#block-content').append ("<div id='top-friend-list'></div>");

  $('#top-friend-list').append (" \
    <div class='title'>Top Friends</div> \
    <div class='top-friend-item'><div class='top-friend-name'>Sean Woolfolk</div><div class='top-friend-num' id='top-friend-goals-1'>2 goals</div></div> \
    <div class='top-friend-item'><div class='top-friend-name'>Jeffrey Heer</div><div class='top-friend-num' id='top-friend-goals-2'>1 goal</div></div> \
    <div class='top-friend-item'><div class='top-friend-name'>Darius Liddell</div><div class='top-friend-num' id='top-friend-goals-3'>1 goal</div></div> \
    </div>");
 

  $('.top-friend-num').bind ('click', function () {
    boxOpen("top-friend-goals", "friendGoals.php?user_id="+USER_INFO.user_id+"&friend_id=12345", this.id);
  });

 
}
