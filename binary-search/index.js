function search(arr, ele) {
  var len = arr.length;
  if (len === 0) {
    return -1;
  }

  var middleIdx = Math.floor(len / 2);
  if (arr[middleIdx] > ele) {
    return search(arr.slice(0, middleIdx), ele);
  } else if (arr[middleIdx] < ele) {
    var res = search(arr.slice(middleIdx + 1), ele);
    if (res === -1) {
      return -1;
    }
    return middleIdx + 1 + res;
  } else {
    return middleIdx;
  }
}

module.exports = search;
