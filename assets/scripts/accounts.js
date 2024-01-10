// Check for saved accounts in localStorage and retreiving them
var storedAccounts;

if (localStorage.getItem("storedAccounts")) {
  storedAccounts = JSON.parse(localStorage.getItem("storedAccounts"));
} else {
  storedAccounts = [];
}

// defining Account class and ID generator
var accountsID = generateID();

var Account = (name, category, balance, id) => {
  var instance = {};

  if (id === undefined) {
    instance.id = accountsID();
  } else {
    instance.id = id;
  }
  instance.name = name;
  instance.category = category;
  instance.balance = balance;

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
  $sectionBody.append($table);
  $div.append($sectionTitle);
  $div.append($sectionBody);
  $content.append($div);
};

var whidhraw = function (ammount) {
  console.log("removing", ammount, "from", this.name);
  this.balance -= ammount;
  console.log(this.balance);
};

var deposit = function (ammount) {
  this.balance += ammount;
};

// DOM manipulation
// Get all Account Dom elements
var $summary = $("#summary");
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
  return Account(account.name, account.category, account.balance, account.id);
});
each(storedAccounts, function (account, i) {
  // console.log(2);

  account.render();
});
// console.log(storedAccounts[0].id);
