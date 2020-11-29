var isActive = true;
var activationTime = 1; //second
var deactivateTime = 15000; // second
var popupCookie = document.getElementById("popup-verzio").getElementsByTagName('p')[0].innerHTML; // a popuphoz tartozó eltárolt érték

checkPopup();

function checkPopup() {
  if (getWithExpiry(popupCookie)) {
    document.getElementById("popupp").style.display = "none";
  } else {
    if (isActive) {
      setTimeout(() => {
        document.getElementById("popupp").style.position = "fixed";
      }, activationTime * 1000);
      setTimeout(() => {
        document.getElementById("popupp").style.display = "none";
      }, (activationTime + deactivateTime) * 1000);
    } else {
      document.getElementById("popupp").style.display = "none";
    }
  }
}

document.getElementById("popuppCloseButton").addEventListener("click", function (event) {
  event.preventDefault();
  // 604800000 milliszekundum = 1 hét
  setWithExpiry(popupCookie, "true", 604800000);
  document.getElementById("popupp").style.display = "none";
});

document.getElementById("popuppCloseButton-mobil").addEventListener("click", function (event) {
  event.preventDefault();
  // 604800000 milliszekundum = 1 hét
  setWithExpiry(popupCookie, "true", 604800000);
  document.getElementById("popupp").style.display = "none";
});
