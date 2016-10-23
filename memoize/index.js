function memoize(func) {
  var resArr = [];
  return function() {
    var args = [].slice.call(arguments);
    var resIdx = findRes(resArr, args)
    if (resIdx !== -1) {
      return resArr[resIdx].result;
    }
    var res = func.apply(null, arguments);
    resArr.push({
      args: args,
      result: res
    });
    return res;
  }
}

function findRes(resultArr, args) {
  if (resultArr.length === 0) {
    return -1;
  }
  for (var i = 0; i < resultArr.length; i++) {
    if (arrayEqual(args, resultArr[i].args)) {
      return i;
    }
  }
  return -1;
}

// check if two arguments are the same
function arrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

module.exports = memoize;
