// Check for saved transactions in localStorage and retreiving them
var storedTransactions;
var lastTransactionId;

if (localStorage.getItem("storedTransactions")) {
  storedTransactions = JSON.parse(localStorage.getItem("storedTransactions"));
} else {
  storedTransactions = [];
}

if (localStorage.getItem("lastTransactionId")) {
  lastTransactionId = Number(localStorage.getItem("lastTransactionId"));
} else {
  lastTransactionId = 0;
}
// defining Transaction class and ID generator
var transactionID = generateID(lastTransactionId);

var Transaction = (
  type,
  from,
  fromName,
  to,
  toName,
  category,
  ammount,
  fee,
  id
) => {
  var instance = {};

  if (id === undefined) {
    instance.id = transactionID();
    localStorage.setItem("lastTransactionId", instance.id);
  } else {
    instance.id = id;
  }

  instance.type = type;
  instance.from = from;
  instance.fromName = fromName;
  instance.to = to;
  instance.toName = toName;
  instance.category = category;
  instance.ammount = ammount;
  instance.fee = fee;

  // Methods
  instance.render = renderTransaction;
  // instance.getTransactions = getTransactions;

  return instance;
};

var renderTransaction = function ($tag) {
  // console.log(this);
  $tr = generateTableRow(
    this.type,
    this.fromName,
    this.toName,
    this.category,
    this.ammount,
    this.fee
  );
  if ($tag) {
    $tag.prepend($tr);
  } else {
    $transactions.prepend($tr);
  }
};

var $transactions = $("#transactions");

var $transactionInputs = {
  type: $("#type"),
  account: $("#account"),
  to: $("#to"),
  category: $("#category"),
  ammount: $("#ammount"),
  fee: $("#fee"),
  submit: $("#submit-transaction"),
};

$transactionInputs.to.attr("disabled", true);
$transactionInputs.fee.attr("disabled", true);

// append accounts options
each(storedAccounts, function (account) {
  $option = $("<option></option>").val(account.id).text(account.name);
  $transactionInputs.account.append($option);
  $transactionInputs.to.append($option.clone());
});

// var tr = {
//   type: $type.val(),
//   acc: $acc.val(),
//   categ: $categ.val(),
//   ammount: $ammount.val(),
// };
// console.log(tr);

var appendTransaction = function () {
  var invalidInput = isNaN($transactionInputs.ammount.val());
  if (invalidInput) {
    alert("Invalid Input Check Again");
  } else {
    var to, toName, fee, category;
    var from = $transactionInputs.account.find("option:selected").val();
    if ($transactionInputs.type.find("option:selected").val() === "Transfer") {
      to = $transactionInputs.to.find("option:selected").val();
      toName = $transactionInputs.to.find("option:selected").text();
      fee = Number($transactionInputs.fee.val());
      category = "--";

      transact(
        $transactionInputs.type.find("option:selected").val(),
        from,
        Number($transactionInputs.ammount.val()),
        to,
        fee
      );
    } else {
      to = "--";
      toName = "--";
      fee = "--";
      if ($transactionInputs.type.find("option:selected").val() === "Income") {
        category = "--";
      } else {
        category = $transactionInputs.category.find("option:selected").val();
      }

      transact(
        $transactionInputs.type.find("option:selected").val(),
        from,
        Number($transactionInputs.ammount.val())
      );
    }

    var transaction = Transaction(
      $transactionInputs.type.find("option:selected").val(),
      from,
      $transactionInputs.account.find("option:selected").text(),
      to,
      // $transactionInputs.to.val(),
      toName,
      category,
      Number($transactionInputs.ammount.val()),
      // Number($transactionInputs.fee.val())
      fee
    );
    // console.log(transaction);
    storedTransactions.unshift(transaction);
    transaction.render();

    $transactionInputs.ammount.val("");
    // $transactionInputs.category.val("");
    // $transactionInputs.balance.val("");
    storeTransactionAccount(from, transaction, to);
    // store account in local storage
    localStorage.setItem(
      "storedTransactions",
      JSON.stringify(storedTransactions)
    );
  }
};

$transactionInputs.type.on("change", function () {
  // console.log($transactionInputs.type.find("option:selected").val());
  if ($transactionInputs.type.find("option:selected").val() === "Transfer") {
    $transactionInputs.to.removeAttr("disabled");
    $transactionInputs.fee.removeAttr("disabled");
    $transactionInputs.category.attr("disabled", true);
  } else if (
    $transactionInputs.type.find("option:selected").val() === "Income"
  ) {
    $transactionInputs.to.attr("disabled", true);
    $transactionInputs.category.attr("disabled", true);
    $transactionInputs.fee.attr("disabled", true);
  } else {
    $transactionInputs.to.attr("disabled", true);
    $transactionInputs.category.attr("disabled", true);
    $transactionInputs.category.removeAttr("disabled");
  }
});

// $transactionInputs.submit.on("click", function () {
//   for (const key in $transactionInputs) {
//     console.log(key, $transactionInputs[key].val());
//   }
// });
$transactionInputs.submit.on("click", appendTransaction);

$transactionInputs.ammount.keypress(function (event) {
  if (event.which == 13) {
    appendTransaction();
  }
});

$transactionInputs.fee.keypress(function (event) {
  if (event.which == 13) {
    appendTransaction();
  }
});

storedTransactions = map(storedTransactions, function (transaction) {
  return Transaction(
    transaction.type,
    transaction.from,
    transaction.fromName,
    transaction.to,
    transaction.toName,
    transaction.category,
    transaction.ammount,
    transaction.fee,
    transaction.id
  );
});
each(storedTransactions, function (transaction, i) {
  transaction.render();
});

var $latest = $("#latest-transactions");
function latest() {
  each(storedTransactions.slice(0, 10), function (transaction, i) {
    transaction.render($latest);
  });
}
latest();
