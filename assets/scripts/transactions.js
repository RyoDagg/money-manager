var storedTransactions;
// if (Modernizr.localstorage) {
//   $storedTransactions = localStorage.getItem("storedTransactions");
// } else {
//   $storedTransactions = [];
// }

if (localStorage.getItem("storedTransactions")) {
  storedTransactions = JSON.parse(localStorage.getItem("storedTransactions"));
} else {
  storedTransactions = [];
}

var $type = $("#type");
var $acc = $("#acc");
var $categ = $("#categ");
var $ammount = $("#ammount");
var $submit = $("#submit");
var $transactions = $("#transactions");

var tr = {
  type: $type.val(),
  acc: $acc.val(),
  categ: $categ.val(),
  ammount: $ammount.val(),
};
console.log(tr);

$submit.on("click", function () {
  console.log("rrr");
  $transactions.prepend(`<tr>
    <td>${$type.val()}</td>
    <td>${$acc.val()}</td>
    <td>--</td>
    <td>${$categ.val()}</td>
    <td>${$ammount.val()}</td>
    <td>--</td>
</tr>`);

  storedTransactions.unshift({
    type: $type.val(),
    acc: $acc.val(),
    categ: $categ.val(),
    ammount: $ammount.val(),
  });

  localStorage.setItem(
    "storedTransactions",
    JSON.stringify(storedTransactions)
  );
});
