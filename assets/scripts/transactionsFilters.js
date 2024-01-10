var getTransactionsCategory = (category) => {
  return findObject(storedTransactions, "category", category);
};
