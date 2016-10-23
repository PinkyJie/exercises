function flatten(arr) {
  var res = [];
  arr.forEach(function(item) {
    if (item instanceof Array) {
      res = res.concat(flatten(item));
    } else {
      res.push(item);
    }
  });
  return res;
}

module.exports = flatten;
