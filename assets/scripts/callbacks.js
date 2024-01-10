function each(array, func) {
  for (var i = 0; i < array.length; i++) {
    func(array[i], i);
  }
}

function map(array, f) {
  var acc = [];
  each(array, function (element, i) {
    acc.push(f(element, i));
  });
  return acc;
}

function filter(array, predicate) {
  var acc = [];
  each(array, function (element, index) {
    if (predicate(element, index)) {
      acc.push(element);
    }
  });
  return acc;
}

function reduce(array, f, acc) {
  if (acc === undefined) {
    acc = array[0];
    array = array.slice(1);
  }
  each(array, function (element, i) {
    acc = f(acc, element, i);
  });
  return acc;
}
