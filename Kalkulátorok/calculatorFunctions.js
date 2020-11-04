function torlesztoreszletFutamidoAlapjan() {
  var honapok = futamidoSlider.value * 12;
  var tartozasOsszege = tartozasSlider.value;
  var P = (kamat * 365) / 360 / 12;
  var q = 1 + P;
  var qn = Math.pow(q, honapok);
  var qnminus1 = qn - 1;

  var torleszto = honapok < 1 ? 0 : Math.ceil((tartozasOsszege * P * qn) / qnminus1);
  document.getElementById("torlesztoReszletLabel").innerHTML = formazasForintra(torleszto);
}

function torlesztoreszletFutamidoAlapjan_DH2() {
  document.getElementById("torlesztoReszletLabel").innerHTML = formazasForintra(
    tartozasSlider.value / (futamidoSlider.value * 12),
  );
}

function torlesztoreszletFutamidoAlapjanFelevente_DH2() {
  document.getElementById("torlesztoReszletLabel_2").innerHTML = formazasForintra(
    (tartozasSlider_2.value * felevSlider_2.value) / (futamidoSlider_2.value * 12),
  );
  document.getElementById("felvettHitelOsszegeCimke_2").innerHTML = formazasForintra(
    tartozasSlider_2.value * felevSlider_2.value,
  );
}

function torlesztoReszletFizetesEsTartozasAlapjan(tartozas) {
  var torlesztoReszlet = 0;
  if (tartozas <= 1000000) {
    torlesztoReszlet = 0.04;
  } else if (tartozas > 1000000 && tartozas <= 2000000) {
    torlesztoReszlet = 0.05;
  } else if (tartozas > 2000000 && tartozas <= 3000000) {
    torlesztoReszlet = 0.07;
  } else if (tartozas > 3000000 && tartozas <= 4000000) {
    torlesztoReszlet = 0.09;
  } else if (tartozas > 4000000) {
    torlesztoReszlet = 0.11;
  }
  return torlesztoReszlet;
}

function futamido_DH2() {
  var feleventeFelvettHitel = tartozasSlider.value;
  var felevekSzama = felevSlider.value;
  var bruttoBer = bruttoBerSlider.value;
  var hitelTartozas = felevekSzama * feleventeFelvettHitel;
  var torlesztoReszlet = torlesztoReszletFizetesEsTartozasAlapjan(hitelTartozas);

  var torlesztoReszletErteke = (torlesztoReszlet * bruttoBer).toFixed();
  document.getElementById("torlesztoReszletSzazalekLabel").innerHTML = (torlesztoReszlet * 100).toFixed() + " %";
  document.getElementById("felvettHitelOsszegeCimke").innerHTML = formazasForintra(hitelTartozas);
  document.getElementById("torlesztoReszletLabel").innerHTML = formazasForintra(torlesztoReszletErteke);
  document.getElementById("futamidoLabel").innerText = monthInYYMM(Math.ceil(hitelTartozas / torlesztoReszletErteke));
}

function futamidoTorlesztoreszletAlapjan() {
  /*Init the variables */
  var honapok = 1;
  var haviTorleszto = torlesztoSlider_2.value;
  var fizetettKamat = ((kamat / 12) * tartozasSlider_2.value * 365) / 360;
  var toketartozas = Math.ceil(tartozasSlider_2.value - haviTorleszto + fizetettKamat);
  var tokeTorlesztes = haviTorleszto - fizetettKamat < 0 ? 0 : haviTorleszto - fizetettKamat;

  while (toketartozas >= 0) {
    honapok = honapok + 1;
    fizetettKamat = ((kamat / 12) * toketartozas * 365) / 360;
    toketartozas = Math.ceil(toketartozas - haviTorleszto + fizetettKamat);
    tokeTorlesztes = haviTorleszto - fizetettKamat < 0 ? 0 : haviTorleszto - fizetettKamat;
    /* if something gone wrong... */
    if (honapok > 1500) {
      toketartozas = -10;
    }
  }
  if (toketartozas != -10) {
    document.getElementById("futamidoLabel_2").innerText = monthInYYMM(honapok);
  } else {
    document.getElementById("futamidoLabel_2").innerHTML = "A futamidő túl hosszú, <br> módosítsa a megadott adatokat!";
  }
}

function futamidoszamitasa_DH1() {
  /*Init the variables */
  var kamat = 0.0199;
  var minimalber = 120000;
  var torlesztoElsoEv = minimalber * 0.06;
  var jovedelem = bruttoBerSlider.value;
  var torlesztoMasodikEvtol = jovedelem * 0.06 < torlesztoElsoEv ? torlesztoElsoEv : jovedelem * 0.06;

  // első hónap számításai
  var elhataroltHaviKamat = 0;
  var elhataroltKamategyenleg = 0;
  var havontaFelvettHitel = parseInt(tartozasSlider.value);
  var felevekSzama = felevSlider.value;

  var felevenkentFelvettHitel = havontaFelvettHitel * 5;
  var tokeTartozas = felevenkentFelvettHitel;
  var aktualisFelev = 1;
  var honapok = 1;

  console.log("#################### szamitas megkezdese ###################");
  console.log("Félévenként felvett hitel: " + felevenkentFelvettHitel);
  console.log("Folyósítandó Hónapok száma : " + felevekSzama);
  while (felevekSzama >= aktualisFelev) {
    for (i = 1; i <= 6; i++) {
      console.log("tőketartozás: " + tokeTartozas);
      elhataroltHaviKamat = (((kamat * tokeTartozas) / 12) * 365) / 360;
      elhataroltKamategyenleg = elhataroltKamategyenleg + elhataroltHaviKamat;
      console.log("Elhatarolt Kamategyenleg: " + elhataroltKamategyenleg);
    }
    console.log(aktualisFelev + " . félév telt el");
    //ha nem egész évre vesszük fel akkor itt ki kell lépni
    if (felevekSzama <= aktualisFelev) {
      tokeTartozas = tokeTartozas + elhataroltKamategyenleg;
      console.log(
        "Nem egész éves a konstrukció, végetér a folyósítás, csak az elhatárolt kamategynleget adjuk hozzá: " +
          tokeTartozas,
      );
      break;
    } else {
      tokeTartozas = tokeTartozas + felevenkentFelvettHitel;
      console.log("Féléves folyósítás utáni tartozás : " + tokeTartozas);
    }
    aktualisFelev = aktualisFelev + 1;
    for (i = 1; i <= 6; i++) {
      console.log("tőketartozás: " + tokeTartozas);
      elhataroltHaviKamat = (((kamat * tokeTartozas) / 12) * 365) / 360;
      elhataroltKamategyenleg = elhataroltKamategyenleg + elhataroltHaviKamat;
      console.log("Elhatarolt Kamategyenleg: " + elhataroltKamategyenleg);
    }
    console.log(aktualisFelev + " . félév telt el, ez egy egész év elteltét jelenti");
    if (felevekSzama == aktualisFelev) {
      tokeTartozas = tokeTartozas + elhataroltKamategyenleg;
      console.log("Végetér a folyósítás, csak az elhatárolt kamategynleget adjuk hozzá: " + tokeTartozas);
    } else {
      tokeTartozas = tokeTartozas + felevenkentFelvettHitel;
      console.log("Egész év, összeg folyósítása utáni tartozás: " + tokeTartozas);
      tokeTartozas = tokeTartozas + elhataroltKamategyenleg;
      console.log("Elhatárolt kamategyenleg hozzáadása a tőketartozáshoz:" + tokeTartozas);
      elhataroltKamategyenleg = 0;
    }

    aktualisFelev = aktualisFelev + 1;
  }

  var haviTorleszto = honapok <= 12 ? torlesztoElsoEv : torlesztoMasodikEvtol;
  var fizetettKamat = ((kamat / 12) * tokeTartozas * 365) / 360;
  tokeTartozas = Math.ceil(tokeTartozas - haviTorleszto + fizetettKamat);
  var tokeTorlesztes = haviTorleszto - fizetettKamat < 0 ? 0 : haviTorleszto - fizetettKamat;

  while (tokeTartozas >= 0) {
    honapok = honapok + 1;
    haviTorleszto = honapok <= 12 ? torlesztoElsoEv : torlesztoMasodikEvtol;
    fizetettKamat = (((kamat * tokeTartozas) / 12) * 365) / 360;
    tokeTartozas = Math.ceil(tokeTartozas - haviTorleszto + fizetettKamat);
    tokeTorlesztes = haviTorleszto - fizetettKamat < 0 ? 0 : haviTorleszto - fizetettKamat;
    if (honapok > 15000) {
      tokeTartozas = -10;
    }
  }
  document.getElementById("felvettHitelOsszegeCimke").innerText = formazasForintra(
    felevenkentFelvettHitel * felevekSzama,
  );
  document.getElementById("futamidoCimke").innerText = monthInYYMM(honapok);
  document.getElementById("torlesztoMasodikEvtolCimke").innerText = formazasForintra(torlesztoMasodikEvtol);
  document.getElementById("torlesztoreszletElsoEvCimke").innerText = formazasForintra(torlesztoElsoEv);
}

function torlesztoReszletSzamitasa_DH1() {
  /*Init the variables */
  var kamat = 0.0199;
  // első hónap számításai
  var elhataroltHaviKamat = 0;
  var elhataroltKamategyenleg = 0;
  var havontaFelvettHitel = parseInt(tartozasSlider_2.value);
  var felevekSzama = felevSlider_2.value;

  var felevenkentFelvettHitel = havontaFelvettHitel * 5;
  var tokeTartozas = felevenkentFelvettHitel;
  var aktualisFelev = 1;
  var honapok = 1;

  console.log("#################### szamitas megkezdese ###################");
  console.log("Félévenként felvett hitel: " + felevenkentFelvettHitel);
  console.log("Folyósítandó Hónapok száma : " + felevekSzama);
  while (felevekSzama >= aktualisFelev) {
    for (i = 1; i <= 6; i++) {
      console.log("tőketartozás: " + tokeTartozas);
      elhataroltHaviKamat = (((kamat * tokeTartozas) / 12) * 365) / 360;
      elhataroltKamategyenleg = elhataroltKamategyenleg + elhataroltHaviKamat;
      console.log("Elhatarolt Kamategyenleg: " + elhataroltKamategyenleg);
    }
    console.log(aktualisFelev + " . félév telt el");
    //ha nem egész évre vesszük fel akkor itt ki kell lépni
    if (felevekSzama <= aktualisFelev) {
      tokeTartozas = tokeTartozas + elhataroltKamategyenleg;
      console.log(
        "Nem egész éves a konstrukció, végetér a folyósítás, csak az elhatárolt kamategynleget adjuk hozzá: " +
          tokeTartozas,
      );
      break;
    } else {
      tokeTartozas = tokeTartozas + felevenkentFelvettHitel;
      console.log("Féléves folyósítás utáni tartozás : " + tokeTartozas);
    }
    aktualisFelev = aktualisFelev + 1;
    for (i = 1; i <= 6; i++) {
      console.log("tőketartozás: " + tokeTartozas);
      elhataroltHaviKamat = (((kamat * tokeTartozas) / 12) * 365) / 360;
      elhataroltKamategyenleg = elhataroltKamategyenleg + elhataroltHaviKamat;
      console.log("Elhatarolt Kamategyenleg: " + elhataroltKamategyenleg);
    }
    console.log(aktualisFelev + " . félév telt el, ez egy egész év elteltét jelenti");
    if (felevekSzama == aktualisFelev) {
      tokeTartozas = tokeTartozas + elhataroltKamategyenleg;
      console.log("Végetér a folyósítás, csak az elhatárolt kamategynleget adjuk hozzá: " + tokeTartozas);
    } else {
      tokeTartozas = tokeTartozas + felevenkentFelvettHitel;
      console.log("Egész év, összeg folyósítása utáni tartozás: " + tokeTartozas);
      tokeTartozas = tokeTartozas + elhataroltKamategyenleg;
      console.log("Elhatárolt kamategyenleg hozzáadása a tőketartozáshoz:" + tokeTartozas);
      elhataroltKamategyenleg = 0;
    }

    aktualisFelev = aktualisFelev + 1;
  }

  var honapok = futamidoSlider_2.value * 12;
  var tartozasOsszege = tokeTartozas;
  var P = (kamat * 365) / 360 / 12;
  var q = 1 + P;
  var qn = Math.pow(q, honapok);
  var qnminus1 = qn - 1;

  var torleszto = honapok < 1 ? 0 : Math.ceil((tartozasOsszege * P * qn) / qnminus1);
  document.getElementById("torlesztoReszletLabel_2").innerHTML = formazasForintra(torleszto);
  document.getElementById("felvettHitelOsszegeCimke_2").innerText = formazasForintra(felevenkentFelvettHitel * felevekSzama);
}

function futamidoTorlesztoreszletAlapjan_DH2() {
  document.getElementById("futamidoLabel_2").innerText = monthInYYMM(
    Math.ceil(tartozasSlider_2.value / torlesztoSlider_2.value),
  );
}

/*
 * Felkerekítjük a legközelebbi egészre a számot
 * Majd átalakítjuk a HUF valutának megfeleleő kiírásara
 */
function formazasForintra(amout) {
  return Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    minimumFractionDigits: 0,
  }).format(Math.ceil(amout));
}

function monthInYYMM(months) {
  var dateYears = Math.floor(months / 12);
  var dateMonths = months % 12;
  var formattedMonths = dateYears + " év " + dateMonths + " hónap";
  return formattedMonths;
}



function changeInputsValues(input, slider, label) {
  return function () {
    //Deklaráljuk a megváltoztatott bemeneti értéket
    var inputValue;
    //A bemeneti mező kiválasztása ami okozta a változást
    if (event.target.type == "number") {
      //az input mező által elsütött event
      inputValue = Number(input.value);
    } else if (event.target.type == "range") {
      //a slider által elsütött event
      inputValue = Number(slider.value);
    } else {
      //amikor egyik sem igaz akkor a DOMContentLoaded event sül el, az oldal betöltésekor
      inputValue = Number(slider.value);
    }

    if (inputValue < slider.min) {
      inputValue = slider.min;
    } else if (inputValue > slider.max) {
      inputValue = slider.max;
    } else if (inputValue % slider.step != 0) {
      inputValue = Math.round(inputValue / slider.step) * slider.step;
    }
    //a label elcsúsztatásához és a megfelelő háttérszín beállításához szükséges változó
    //kiszámolja, hogy hány százalékon áll a csúszszka
    const sliderPercentageValue = Number(((inputValue - slider.min) * 100) / (slider.max - slider.min));
    const newLabelPosition = 10 - sliderPercentageValue * 0.2;
    //A slider csúszkájának megfelelő szín beállítása
    slider.style.background = `linear-gradient(to right, #1EADE8 0%, #1EADE8 ${sliderPercentageValue}%, #E0E0E0 ${sliderPercentageValue}%, #E0E0E0 100%)`;
    //A Labelre kiírjuk az aktuális értéket
    if (slider.dataset.format == "Ft") {
      label.innerHTML = `<span>${formazasForintra(inputValue)}</span>`;
    } else {
      label.innerHTML = `<span>${inputValue}  ${slider.dataset.format}</span>`;
    }

    //A labelt eltoljuk a megfelelő értékkel
    label.style.left = `calc(${sliderPercentageValue}% + (${newLabelPosition}px))`;

    //beállítjuk a slidernek és az inputmezőnek a legfrissebben változtatott értékeket
    slider.value = inputValue;
    input.value = inputValue;
    kalkulatorKimenet();
  };
}

//A csúszka 15e, 21e, 25e, 30e, majd 10.000Ft-ként léptethető 150e-ig.
function correctingValueStep(value) {
  var newValue;

  if (value <= 30000) {
    if (value <= 15000) {
      newValue = 15000;
    } else if (value > 15000 && value <= 21000) {
      newValue = 21000;
    } else if (value > 21000 && value <= 25000) {
      newValue = 25000;
    } else if (value > 25000 && value <= 30000) {
      newValue = 30000;
    }
  } else {
    newValue = Math.round(value / 10000) * 10000;
  }
  return newValue;
}

function changeInputsValues_lelptetos(input, slider, label) {
  return function () {
    //Deklaráljuk a megváltoztatott bemeneti értéket
    var inputValue;
    var correctedValue;
    //A bemeneti mező kiválasztása ami okozta a változást
    if (event.target.type == "number") {
      //az input mező által elsütött event
      inputValue = Number(input.value);
    } else if (event.target.type == "range") {
      //a slider által elsütött event
      inputValue = Number(slider.value);
    } else {
      //amikor egyik sem igaz akkor a DOMContentLoaded event sül el, az oldal betöltésekor
      inputValue = Number(slider.value);
    }

    if (inputValue < slider.min) {
      inputValue = slider.min;
    } else if (inputValue > slider.max) {
      inputValue = slider.max;
    } else if (inputValue % slider.step != 0) {
      inputValue = Math.round(inputValue / slider.step) * slider.step;
    }

    correctedValue = correctingValueStep(inputValue);

    //a label elcsúsztatásához és a megfelelő háttérszín beállításához szükséges változó
    //kiszámolja, hogy hány százalékon áll a csúszszka
    const sliderPercentageValue = Number(((correctedValue - slider.min) * 100) / (slider.max - slider.min));
    const newLabelPosition = 10 - sliderPercentageValue * 0.2;
    //A slider csúszkájának megfelelő szín beállítása
    slider.style.background = `linear-gradient(to right, #1EADE8 0%, #1EADE8 ${sliderPercentageValue}%, #E0E0E0 ${sliderPercentageValue}%, #E0E0E0 100%)`;
    //A Labelre kiírjuk az aktuális értéket
    if (slider.dataset.format == "Ft") {
      label.innerHTML = `<span>${formazasForintra(correctedValue)}</span>`;
    } else {
      label.innerHTML = `<span>${inputValue} ${slider.dataset.format}</span>`;
    }

    //A labelt eltoljuk a megfelelő értékkel
    label.style.left = `calc(${sliderPercentageValue}% + (${newLabelPosition}px))`;

    //beállítjuk a slidernek és az inputmezőnek a legfrissebben változtatott értékeket
    slider.value = correctedValue;
    input.value = correctedValue;
    kalkulatorKimenet();
  };
}
