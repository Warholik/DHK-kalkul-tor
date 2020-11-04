function changeBlurbLayout(blurb) {
  var blurbContent = blurb.getElementsByClassName("et_pb_blurb_content")[0];
  var content = blurb.getElementsByClassName("et_pb_blurb_container")[0];
  var contentclone = content.children;
  blurbContent.appendChild(contentclone[0]);
  blurbContent.appendChild(contentclone[0]);
  content.remove();
}

var blurbs = document.getElementsByClassName("custom-blurb");
for (var i = 0; i < blurbs.length; i++) {
  changeBlurbLayout(blurbs[i]);
}


/**
 * A fülszöveg modulok átalakítására szolgáló függvény
 * A fülszövegekből info gombbal ellátott fülszöveget csinál
 * A fülszöveg törzsét áthelyezi az info gomb által kinyitható tooltippbe
 * @param {HTMLElement} blurb - blurb elemek az oldalon
 */
function blurbWithInfo(blurb) {
  var blurbContent = blurb.getElementsByClassName("et_pb_blurb_content")[0];
  var blurbDescription = blurb.getElementsByClassName("et_pb_blurb_description")[0];
  var infoButton= document.createElement("img");
  infoButton.classList.add("tooltip");
  infoButton.src = "/wp-content/uploads/2020/11/i.svg";
  var tooltipText = document.createElement("div");
  tooltipText.classList.add("tooltiptext");
  console.log(blurbDescription.innerHTML);
  tooltipText.innerHTML = blurbDescription.innerHTML;
  blurbDescription.remove();
  blurbContent.appendChild(infoButton);
  blurbContent.appendChild(tooltipText);
}

var infoBlurbs = document.getElementsByClassName("blurb-with-info");
for (var i = 0; i < infoBlurbs.length; i++) {
  blurbWithInfo(infoBlurbs[i]);
}

document.addEventListener("click", function (e) {
   console.log("clicked")
  var infoTooltipText = document.getElementsByClassName("tooltiptext");
  for (var i = 0; i < infoTooltipText.length; i++) {
    if (infoTooltipText[i].contains(e.target)) {
      //Ha a tooltippbe kattintott nem csinálunk semmit!
    } else {
      //Ha a tooltippen kívül van akkor megnézzük, hogy az i re kattintott-e
      if (e.target.classList.contains("tooltip")) {
        //Ha igen akkor ha  nyitva akkor zárjuk ha zárva van nyitjuk
        e.target.nextSibling.classList.toggle("visible");
        console.log( e.target.nextSibling)
        return
      } else {
        infoTooltipText[i].classList.remove("visible")
      }
    }
  }
});


