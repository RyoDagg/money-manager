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
