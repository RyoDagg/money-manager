var $filter = {
  category: $("#category-filter"),
  account: $("#account-filter"),
  live: $("#live-search"),
};

function filterCategory(category) {
  var filtered = filter(storedTransactions, function (transaction) {
    return transaction.category === category;
  });

  $transactions.empty();

  each(filtered, function (transaction, i) {
    transaction.render();
  });
}

each(storedAccounts, function (account) {
  $option = $("<option></option>").val(account.id).text(account.name);
  $filter.account.append($option);
  // $filter.to.append($option.clone());
});

function filterAccount(account) {
  var filtered = filter(storedTransactions, function (transaction) {
    return transaction.from === account || transaction.to === account;
  });

  $transactions.empty();

  each(filtered, function (transaction, i) {
    transaction.render();
  });
}

function filterLive(query) {
  var q = query.toUpperCase();
  var filtered = filter(storedTransactions, function (transaction) {
    return (
      transaction.fromName.toUpperCase().includes(q) ||
      transaction.toName.toUpperCase().includes(q) ||
      transaction.category.toUpperCase().includes(q) ||
      transaction.type.toUpperCase().includes(q)
    );
  });

  $transactions.empty();

  each(filtered, function (transaction, i) {
    transaction.render();
  });
}

$filter.category.on("change", function () {
  filterAccount($filter.category.val());
});

$filter.account.on("change", function () {
  filterAccount($filter.account.val());
});
$filter.live.keypress(function () {
  filterLive($filter.live.val());
});
