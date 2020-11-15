/**
 * A fülszöveg modulok átalakítására szolgáló függvény
 * A fülszövegekből "Ikon mellett cím alattuk leírás csempét" csinál
 * A fülszöveg törzsét átrendezi a megfelelő layout elérése érdekében
 * @param {HTMLElement} blurb - fülszöveg elemek az oldalon
 */
function changeBlurbLayout(blurb) {
  var blurbContent = blurb.getElementsByClassName("et_pb_blurb_content")[0];
  var content = blurb.getElementsByClassName("et_pb_blurb_container")[0];
  var contentclone = content.children;
  blurbContent.appendChild(contentclone[0]);
  blurbContent.appendChild(contentclone[0]);
  content.remove();
}

//megkressi az összes fülszöveget és végrehajtha a módosítást
var blurbs = document.getElementsByClassName("custom-blurb");
for (var i = 0; i < blurbs.length; i++) {
  changeBlurbLayout(blurbs[i]);
}
