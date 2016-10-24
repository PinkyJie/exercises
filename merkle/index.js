function hashArr(arr, hasher) {
  var len = arr.length;
  if (len === 1) {
    return arr[0];
  }
  if (len % 2 !== 0) {
    arr.push(arr[len - 1]);
  }
  var res = [];
  for (var i = 0; i < arr.length; i += 2) {
    var parentValue = hasher(
      arr[i].value.toString() + arr[i + 1].value.toString()
    );
    var parent = {
      value: parentValue,
      left: arr[i],
      right: arr[i + 1]
    };
    parent.left.parent = parent;
    parent.right.parent = parent;
    parent.left.sibling = parent.right;
    parent.right.sibling = parent.left;

    res.push(parent)
  }
  return hashArr(res, hasher);
}

function findNodeInTree(treeRoot, val) {
  var left = treeRoot.left;
  var right = treeRoot.right;
  if (!left && !right) {
    if (treeRoot.value === val) {
      var breadcrumbs = [];
      breadcrumbs.push(treeRoot.sibling.value);
      var parent = treeRoot.parent;
      while(parent) {
        if (parent.parent) {
          breadcrumbs.push(parent.sibling.value);
        }
        parent = parent.parent;
      }
      return { index: treeRoot.idx, breadcrumbs: breadcrumbs };
    } else {
      return false;
    }
  } else {
    var leftRes = findNodeInTree(left, val);
    var rightRes = findNodeInTree(right, val);
    if (leftRes !== false) {
      return leftRes;
    } else if (rightRes !== false) {
      return rightRes;
    } else {
      return false;
    }
  }
}

function merkle(arr, hasher) {
  var wrapArr = arr.map(function(item, idx) {
    return {
      value: item,
      idx: idx
    };
  });
  var root = hashArr(wrapArr, hasher);

  return {
    root: root.value,
    getVerification: function(str) {
      return findNodeInTree(root, str);
    }
  }
}

merkle.verify = function(str, root, obj, hasher) {
  var idx = obj.index;
  var res = str;
  var breadcrumbs = obj.breadcrumbs;
  for (var i = 0; i < breadcrumbs.length; i++) {
    if (idx % 2 === 0) {
      res = hasher(res.toString() + breadcrumbs[i].toString());
    } else {
      res = hasher(breadcrumbs[i].toString() + res.toString());
    }
    idx = Math.floor(idx / 2);
  }

  return res === root;
}

var hasher1 = function(str) {
  var hash = 0, i, chr, len;
  if (str.length == 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};

module.exports = merkle;
