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

function renderVis (goals) {
  $('#block-content').html (" \
        <table id='vis-table'> \
          <tr><th>From</th><th>To</th><th>Description</th><th class='result'>Result</th></tr> \
          <tr><td>Feb. 26</td><td>Feb. 28</td><td>No Caffeine</td><td><div class='succeed'/></td></tr> \
          <tr><td>Feb. 27</td><td>Feb. 28</td><td>Going to the gym</td><td><div class='succeed'/></td></tr> \
          <tr><td>Mar. 1</td><td>Mar. 4</td><td>quitting facebook</td><td><div class='failed'/></td></tr> \
          <tr><td>Mar. 2</td><td>Mar. 6</td><td>no kicking kittens</td><td><div class='succeed'/></td></tr> \
        </table> ");

  $('#vis-table th').bind ('click', function () {
    console.log (this);
    //$('#vis-table').sortTable ({
      
    //});
  }); 

  $('#block-content').append (" \
    <div class='title'>Top Friends</div> \
    <div class='top-friend-item'><div class='top-friend-name'>Sean Woolfolk</div><div class='top-friend-num'><a href='#'>2 goals</a></div></div> \
    <div class='top-friend-item'><div class='top-friend-name'>Jeffrey Heer</div><div class='top-friend-num'><a href='#'>1 goal</a></div></div> \
    <div class='top-friend-item'><div class='top-friend-name'>Darius Liddell</div><div class='top-friend-num'><a href='#'>1 goal</a></div></div> \
    </div>");
  
}
