function map(arr, project, context) {
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    res.push(project.call(context, arr[i], i, arr));
  }
  return res;
}

module.exports = map;
