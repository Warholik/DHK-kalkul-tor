/**
 * A fülszöveg modulok átalakítására szolgáló függvény
 * A fülszövegekből info gombbal ellátott fülszöveget csinál
 * A fülszöveg törzsét áthelyezi az info gomb által kinyitható tooltippbe
 * @param {HTMLElement} blurb - blurb elemek az oldalon
 */
function blurbWithInfo(blurb) {
  var blurbContent = blurb.getElementsByClassName("et_pb_blurb_content")[0];
  var blurbDescription = blurb.getElementsByClassName("et_pb_blurb_description")[0];
  var infoButton = document.createElement("img");
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

//megkressi az összes fülszöveget és végrehajtha a módosítást
var infoBlurbs = document.getElementsByClassName("blurb-with-info");
for (var i = 0; i < infoBlurbs.length; i++) {
  blurbWithInfo(infoBlurbs[i]);
}


//Az alábbi függvény kezeli az tooltip megjeneését
//minden az oldalon belüli kattintásra lefut
document.addEventListener("click", function (e) {
  var infoTooltipText = document.getElementsByClassName("tooltiptext");
  //végig igerál az összes tooltipen és megnézi, hogy arra kattinttunk-e
  for (var i = 0; i < infoTooltipText.length; i++) {
    if (infoTooltipText[i].contains(e.target)) {
      //Ha a tooltippbe kattintott nem csinálunk semmit!
    } else {
      //Ha a tooltippen kívül van akkor megnézzük, hogy az i re kattintott-e és az aktív-e
      if (e.target.classList.contains("tooltip") && e.target.nextSibling.classList.contains("visible")) {
        //ha aktiv akkor inaktiváljuk
        e.target.nextSibling.classList.remove("visible");
      } else {
        //ha nem akatív akkor mindent inaktiválunk
        for (var j = 0; j < infoTooltipText.length; j++) {
          //Minden tooltippet bezárunk kivéve amelyikre kattintottunk
          if(!infoTooltipText[j].contains(e.target)) {
                infoTooltipText[j].classList.remove("visible");
          }
        }
        //Amire kattintottunk azt aktiváljuk
        e.target.nextSibling.classList.add("visible");
      }
      return;
    }
  }
});
