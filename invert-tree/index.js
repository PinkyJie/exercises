function invertTree(root) {
  var left = root.left;
  var right = root.right;
  var newLeft, newRight;
  if (left) {
    root.right = invertTree(left);
  } else {
    delete root.right;
  }
  if (right) {
    root.left = invertTree(right);
  } else {
    delete root.left;
  }

  return root;
}

module.exports = invertTree;
