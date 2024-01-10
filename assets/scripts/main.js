function generateID() {
  var count = 0;
  return function () {
    return count++;
  };
}

var findObject = (array, key, value) => {
  return filter(array, function (object) {
    return object[key] == value;
  });
};

function transact(type, from, ammount, to, fee = 0) {
  // console.log(...arguments);
  var fromAccount = findObject(storedAccounts, "id", from)[0];
  fromAccount.whidhraw(ammount + fee);
  if (!(to === undefined)) {
    var toAccount = findObject(storedAccounts, "id", to)[0];

    toAccount.deposit(ammount);
  }
}
