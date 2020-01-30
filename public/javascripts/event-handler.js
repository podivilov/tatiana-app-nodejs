document.addEventListener('invalid', (function () {
  return function (e) {
    e.preventDefault();
    document.getElementById("botui-actions-text-submit").focus();
  };
})(), true);
