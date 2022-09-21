var userAgent = navigator.userAgent || navigator.vendor || window.opera;
if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i) || userAgent.match(/Android/i)) {
  alert("This site is not optimized for mobile devices. Please use a computer.")
}
function addMenu() {
  if ($("#menu").css("display") == "none") {
    $("#menu").css("display", "block");
  } else {
    $("#menu").css("display", "none");
  }
}
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    $("#menu").css("display", "none");
  }
};