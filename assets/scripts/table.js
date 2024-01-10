var generateTableWithHead = function () {
  var $table = $("<table></table>");
  var $thead = $("<thead></thead>");
  var $tr = $("<tr></tr>");
  var $th = $("<th></th>");
  each(arguments, function (title) {
    $tr.append($th.clone().text(title));
  });
  $table.append($thead);
  $thead.append($tr);
  return $table;
};

// console.log(generateTableWithHead("1", "2", "3").html());

var generateTableRow = function () {
  var $tr = $("<tr></tr>");
  var $td = $("<td></td>");
  each(arguments, function (element) {
    $tr.append($td.clone().text(element));
  });
  return $tr;
};

// console.log(generateTableRow("1", "2", "3").html());
