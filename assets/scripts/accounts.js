// Check for saved accounts in localStorage and retreiving them
var storedAccounts;
var lastAccountId;

if (localStorage.getItem("storedAccounts")) {
  storedAccounts = JSON.parse(localStorage.getItem("storedAccounts"));
} else {
  storedAccounts = [];
}

if (localStorage.getItem("lastAccountId")) {
  lastAccountId = Number(localStorage.getItem("lastAccountId"));
} else {
  lastAccountId = 0;
}

// defining Account class and ID generator
var accountsID = generateID(lastAccountId);

var Account = (
  name,
  category,
  balance,
  totalIn = balance,
  totalOut = 0,
  id,
  transactions
) => {
  var instance = {};

  if (id === undefined) {
    instance.id = accountsID();
    localStorage.setItem("lastAccountId", instance.id);
  } else {
    instance.id = id;
  }
  instance.name = name;
  instance.category = category;
  instance.balance = balance;
  instance.totalOut = totalOut;
  instance.totalIn = totalIn;
  if (transactions) {
    instance.transactions = transactions;
  } else {
    instance.transactions = [];
  }

  // Methods
  instance.render = renderAccount;
  instance.whidhraw = whidhraw;
  instance.deposit = deposit;

  return instance;
};

var renderAccount = function () {
  console.log(this);
  var $div = $("<div></div>");
  var $sectionTitle = $div.clone().attr({
    class: "section-title",
  });
  var $h1 = $("<h1></h1>").text(this.name + ": " + this.balance + "TND");
  $sectionTitle.append($h1);

  var $sectionBody = $div.clone().attr({
    class: "section-body",
  });
  $div.attr({
    class: "column-section",
  });
  $table = generateTableWithHead(
    "Type",
    "From",
    "To",
    "Category",
    "Ammount",
    "Fee"
  );
  var $tbody = $("<tbody></tbody>");
  $table.append($tbody);

  each(this.transactions.slice(0, 6), function (transaction) {
    $tbody.append(
      generateTableRow(
        transaction.type,
        transaction.fromName,
        transaction.toName,
        transaction.category,
        transaction.ammount,
        transaction.fee
      )
    );
  });
  $sectionBody.append($table);
  $div.append($sectionTitle);
  $div.append($sectionBody);
  $content.append($div);
};

var whidhraw = function (ammount) {
  // console.log("removing", ammount, "from", this.name);
  this.balance -= ammount;
  this.totalOut += ammount;
  // console.log(this.balance, "jdid");
};

var deposit = function (ammount) {
  this.balance += ammount;
  this.totalIn += ammount;
  // console.log(this.balance, "jdid");
};

// DOM manipulation
// Get all Account Dom elements
var $summary = $("#summary tbody");
var $content = $("#content");

var $accountInputs = {
  name: $("#name"),
  category: $("#category"),
  balance: $("#balance"),
  submit: $("#submit-account"),
};

var appendAccount = function () {
  var invalidInput =
    $accountInputs.name.val() === "" || isNaN($accountInputs.balance.val());
  if (invalidInput) {
    alert("Invalid Input Check Again");
  } else {
    var account = Account(
      $accountInputs.name.val(),
      $accountInputs.category.val(),
      Number($accountInputs.balance.val())
    );
    storedAccounts.push(account);
    account.render();

    $accountInputs.name.val("");
    // $accountInputs.category.val("");
    $accountInputs.balance.val("");

    // store account in local storage
    localStorage.setItem("storedAccounts", JSON.stringify(storedAccounts));
    summary();
  }
};

$accountInputs.submit.on("click", appendAccount);

$accountInputs.name.keypress(function (event) {
  if (event.which == 13) {
    appendAccount();
  }
});

$accountInputs.balance.keypress(function (event) {
  if (event.which == 13) {
    appendAccount();
  }
});

// Displaying stored accounts
storedAccounts = map(storedAccounts, function (account) {
  return Account(
    account.name,
    account.category,
    account.balance,
    account.totalIn,
    account.totalOut,
    account.id,
    account.transactions
  );
});
each(storedAccounts, function (account, i) {
  // console.log(2);

  account.render();
});
function summary() {
  $summary.empty();

  each(storedAccounts, function (account) {
    $tr = generateTableRow(
      account.name,
      account.category,
      account.balance,
      account.totalIn,
      account.totalOut
    );
    $summary.append($tr);
  });
}
summary();
// summary();
// console.log(storedAccounts[0].id);
