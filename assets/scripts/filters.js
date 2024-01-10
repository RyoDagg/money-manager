var $filter = {
  category: $("#category-filter"),
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

$filter.category.on("change", function () {
  filterCategory($filter.category.val());
});
