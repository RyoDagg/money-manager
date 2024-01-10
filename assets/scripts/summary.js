// Check for saved accounts in localStorage and retreiving them
var storedAccounts;

if (localStorage.getItem("storedAccounts")) {
  storedAccounts = JSON.parse(localStorage.getItem("storedAccounts"));
} else {
  storedAccounts = [];
}

var $overview = $("#accounts-overview");

function overview() {
  each(storedAccounts, function (account) {
    var message = "--";
    if (account.transactions.length > 0) {
      message =
        account.transactions[0].type +
        " " +
        account.transactions[0].ammount +
        "TND";
    }
    $tr = generateTableRow(account.name, account.balance, message);
    $overview.append($tr);
  });
}
overview();
