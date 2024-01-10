function generateID(initial) {
  var count = initial;
  return function () {
    return ++count;
  };
}

var findObject = (array, key, value) => {
  return filter(array, function (object) {
    return object[key] == value;
  });
};

function transact(type, from, ammount, to, fee = 0) {
  // console.log(to);
  var fromAccount = findObject(storedAccounts, "id", from)[0];
  if (type === "Income") {
    fromAccount.deposit(ammount);
  } else {
    fromAccount.whidhraw(ammount + fee);
    if (to !== undefined) {
      var toAccount = findObject(storedAccounts, "id", to)[0];
      toAccount.deposit(ammount);
    }
  }
  // update stored accounts
  // localStorage.setItem("storedAccounts", JSON.stringify(storedAccounts));
}

function storeTransactionAccount(from, transaction, to) {
  // console.log(to);
  var fromAccount = findObject(storedAccounts, "id", from)[0];
  fromAccount.transactions.unshift(transaction);
  if (to !== "--") {
    var toAccount = findObject(storedAccounts, "id", to)[0];
    toAccount.transactions.unshift(transaction);
  }
  // update stored accounts
  console.log(fromAccount.transactions);
  localStorage.setItem("storedAccounts", JSON.stringify(storedAccounts));
}
