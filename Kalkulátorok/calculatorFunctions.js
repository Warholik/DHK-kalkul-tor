function torlesztoreszletFutamidoAlapjan() {
  var honapok = futamidoSlider.value * 12;
  var tartozasOsszege = tartozasSlider.value;
  var P = (kamat * 365) / 360 / 12;
  var q = 1 + P;
  var qn = Math.pow(q, honapok);
  var qnminus1 = qn - 1;

  var torleszto =
    honapok < 1 ? 0 : Math.ceil((tartozasOsszege * P * qn) / qnminus1);
  document.getElementById("torlesztoReszletLabel").innerHTML = formazasForintra(
    torleszto
  );
}

function torlesztoreszletFutamidoAlapjan_DH2() {
  document.getElementById("torlesztoReszletLabel").innerHTML = formazasForintra(
    tartozasSlider.value / (futamidoSlider.value * 12)
  );
}

function torlesztoreszletFutamidoAlapjanFelevente_DH2() {
  document.getElementById("torlesztoReszletLabel").innerHTML = formazasForintra(
    (tartozasSlider.value * felevSlider.value) / (futamidoSlider.value * 12)
  );
}

function torlesztoReszletTartozasAlapjan() {
  var evesFizetes = bruttoBerSlider.value * 12;
  var torlesztoReszlet = 0;
  if (evesFizetes <= 1000000) {
    torlesztoReszlet = 0.04;
  } else if (evesFizetes <= 2000000) {
    torlesztoReszlet = 0.05;
  } else if (evesFizetes <= 3000000) {
    torlesztoReszlet = 0.07;
  } else if (evesFizetes <= 4000000) {
    torlesztoReszlet = 0.09;
  } else if (evesFizetes > 4000000) {
    torlesztoReszlet = 0.11;
  }
  return torlesztoReszlet;
}

function futamidoFelevente_DH2() {
  var felvettHitelOsszege = tartozasSlider.value * felevSlider.value;
  var torlesztoreszlet = 0;
  var berTorlesztoHanyad = (bruttoBerSlider.value / torlesztoreszlet) * 100;
}

function futamidoTorlesztoreszletAlapjan() {
  /*Init the variables */
  var honapok = 1;
  var haviTorleszto = torlesztoSlider.value;
  var fizetettKamat = ((kamat / 12) * tartozasSlider.value * 365) / 360;
  var toketartozas = Math.ceil(
    tartozasSlider.value - haviTorleszto + fizetettKamat
  );
  var tokeTorlesztes =
    haviTorleszto - fizetettKamat < 0 ? 0 : haviTorleszto - fizetettKamat;

  while (toketartozas >= 0) {
    honapok = honapok + 1;
    fizetettKamat = ((kamat / 12) * toketartozas * 365) / 360;
    toketartozas = Math.ceil(toketartozas - haviTorleszto + fizetettKamat);
    tokeTorlesztes =
      haviTorleszto - fizetettKamat < 0 ? 0 : haviTorleszto - fizetettKamat;
    console.log(honapok);
    /* if something gone wrong... */
    if (honapok > 1500) {
      toketartozas = -10;
    }
  }
  if (toketartozas != -10) {
    document.getElementById("futamidoLabel").innerText = monthInYYMM(honapok);
  } else {
    document.getElementById("futamidoLabel").innerHTML =
      "A futamidő túl hosszú, <br> módosítsa a megadott adatokat!";
  }
}

function futamidoszamitasa_DH1() {
  /*Init the variables */
  var minimalber = 120000;
  var torlesztoElsoEv = minimalber * 0.06;
  var jovedelem = wageSlider.value;
  var torlesztoMasodikEvtol =
    jovedelem * 0.06 < torlesztoElsoEv ? torlesztoElsoEv : jovedelem * 0.06;

  // első hónap számításai
  var elhataroltHaviKamat = 0;
  var elhataroltKamategyenleg = 0;

  var felevenkentFelvettHitel = parseInt(loanAmountSlider.value);
  var tokeTartozas = felevenkentFelvettHitel;
  var felevek = 1;
  var honapok = 1;

  while (semesterSlider.value >= felevek) {
    for (i = 1; i <= 6; i++) {
      elhataroltHaviKamat = (((tokeTartozas * kamat) / 12) * 365) / 360;
      elhataroltKamategyenleg = elhataroltKamategyenleg + elhataroltHaviKamat;
    }
    tokeTartozas =
      tokeTartozas + felevenkentFelvettHitel + elhataroltKamategyenleg;
    felevek = felevek + 1;
    console.log(tokeTartozas);
  }

  var haviTorleszto = honapok <= 12 ? torlesztoElsoEv : torlesztoMasodikEvtol;
  var fizetettKamat = ((kamat / 12) * tokeTartozas * 365) / 360;
  tokeTartozas = Math.ceil(tokeTartozas - haviTorleszto + fizetettKamat);
  var tokeTorlesztes =
    haviTorleszto - fizetettKamat < 0 ? 0 : haviTorleszto - fizetettKamat;

  while (tokeTartozas >= 0) {
    honapok = honapok + 1;
    haviTorleszto = honapok <= 12 ? torlesztoElsoEv : torlesztoMasodikEvtol;
    fizetettKamat = ((kamat / 12) * tokeTartozas * 365) / 360;
    tokeTartozas = Math.ceil(tokeTartozas - haviTorleszto + fizetettKamat);
    tokeTorlesztes =
      haviTorleszto - fizetettKamat < 0 ? 0 : haviTorleszto - fizetettKamat;
    if (honapok > 15000) {
      tokeTartozas = -10;
    }
  }
  LoanAmountLabel.innerText = felevenkentFelvettHitel * semesterSlider.value;
  monthsLabel.innerText = monthInYYMM(honapok);
  installment2Label.innerText = torlesztoMasodikEvtol;
}

function futamidoTorlesztoreszletAlapjan_DH2() {
  document.getElementById("futamidoLabel").innerText = monthInYYMM(
    Math.ceil(tartozasSlider.value / torlesztoSlider.value)
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

    //a label elcsúsztatásához és a megfelelő háttérszín beállításához szükséges változó
    //kiszámolja, hogy hány százalékon áll a csúszszka
    const sliderPercentageValue = Number(
      ((inputValue - slider.min) * 100) / (slider.max - slider.min)
    );
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
