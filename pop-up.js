var isActive = true;
var activationTime = 1; //second
var deactivateTime = 15000; // second

if (isActive) {
  setTimeout(() => {
    document.getElementById("popupp").style.position = "fixed";
  }, activationTime * 1000);
  setTimeout(() => {
    document.getElementById("popupp").style.display = "none";
  }, (activationTime + deactivateTime) * 1000);

  document.getElementById("popuppCloseButton").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("popupp").style.display = "none";
  });
} else {
  document.getElementById("popupp").style.display = "none";
}
