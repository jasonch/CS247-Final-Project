function formatResolution (user, resolution, day) {
  var txt = "<div class='resolution'><div class='username'>"
    + user + "</div><div class='resolution_text'>wants to stop "
    + resolution + " for " + day;
  if (day == 1)
    txt += " day";
  else
    txt += " days";
  txt += "</div></div>";

  return txt;
}

function formatMyCEL (text) {

  var cels = eval('('+ text + ')');
 
 
  $str = "<div class='mycel'>";
  for (var i = 0; i < cels.length; i++) {
    var res = cels[i];

    $str += "<div class='cel'>";
    $str += "Stop " + res.resolution + " for " + res.num_days;
    if (res.num_days == 1) $str += " day";
    else $str += " days";
    $str += "<div class='res_until'>until ";

    var d = new Date (res.time_stamp);
    d.setDate (parseInt(d.getDate()) + parseInt(res.num_days));

    $str += d.toTimeString() +" "+ d.getHours()+":"+d.getMinutes();

    $str += "</div>";
    $str += "</div>";
  }
  $str += "</div>";

  return $str;

}
