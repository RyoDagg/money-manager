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
