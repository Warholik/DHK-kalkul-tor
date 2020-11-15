//
//Kalkulátor funkcionalitása
//

//
//Változók:
var dh1Kamat = 0.0199;
var minimalber = 120000;

/**
 * A paraméterként megadott összeget Ft nak megfelelő formátumban adja vissza
 * Felkerekíti a legközelebbi egészre a számot
 * Majd átalakítja a HUF valutának megfeleleő formátumra
 * @param  {Number} osszeg        Forintként kírandó összeg
 * @return {Intl.NumberFormat}    Forintnak megfelelő formázott objektum
 */
function formazasForintra(osszeg) {
  return Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    minimumFractionDigits: 0,
  }).format(Math.ceil(osszeg));
}

/**
 * A paraméterként megadott hónapszámot megfelelő forműtumú sringként adja vissza
 * @param  {Number} honapok Hónapok száma
 * @return {String}         Formázott stringként tér vissza: "YYYY év MM hónap"
 */
function monthInYYMM(honapok) {
  var egszEvek = Math.floor(honapok / 12);
  var fennmaradoHonapok = honapok % 12;
  return egszEvek + " év " + fennmaradoHonapok + " hónap";
}

/**
 * A csúszkaát módosítja annak érdekében, hogy megfelelő legyen a lépték.
 * Az elvárt léptél: 15e, 21e, 25e, 30e, majd 10.000Ft-ként léptet.
 * @param  {Number} eredetiErtek  a csuszka aktuális értéke
 * @return {Number}               A módosított érték, az elvártaknak megfelelően
 */
function modositottLeptek(eredetiErtek) {
  var modositottErtek;
  if (eredetiErtek <= 30000) {
    if (eredetiErtek <= 15000) {
      modositottErtek = 15000;
    } else if (eredetiErtek > 15000 && eredetiErtek <= 21000) {
      modositottErtek = 21000;
    } else if (eredetiErtek > 21000 && eredetiErtek <= 25000) {
      modositottErtek = 25000;
    } else if (eredetiErtek > 25000 && eredetiErtek <= 30000) {
      modositottErtek = 30000;
    }
  } else {
    modositottErtek = Math.round(eredetiErtek / 10000) * 10000;
  }
  return modositottErtek;
}

/**
 * A bemeneti paraméterek alapján kiszámítja a törlesztőrészlet mértékét.
 * @param  {Number} tartozas  A felvett hitel összege
 * @param  {Number} futamido  A felvett hitel futamideje
 * @param  {Number} kamat     A felvett hitel kamata
 * @return {Number}           Kiszamotott törlesztőérték
 */
function torlesztoReszletSzamitas(tartozas, futamido, kamat) {
  var honapok = futamido * 12;
  var P = (kamat * 365) / 360 / 12;
  var q = 1 + P;
  var qn = Math.pow(q, honapok);
  var qnminus1 = qn - 1;

  var torlesztoReszlet = honapok < 1 ? 0 : Math.ceil((tartozas * P * qn) / qnminus1);
  return torlesztoReszlet;
}

/**
 * A tartozás alapján kiszámolja a törlesztőrészlet % os értékét
 * @param  {Number} tartozas  A felvett hitel összege
 * @return {Number}           Kiszamotott törlesztőrészlet % os értéke
 */
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

function kamatSzamitas(kamat, osszeg) {
  return (((kamat * osszeg) / 12) * 365) / 360;
}

/**
 * A juttatási idő alatti kamat összeg kiszámítására szolgáló függvény
 * A juttatási idősakban nem fizet vissza a hallgató összeget, de ebben az időszakban is kamatozik a hitel.
 * @param  {Number} felevekSzama              A folyósítási időszak, hány féléven keresztül vesz fel pénzt
 * @param  {Number} felevenkentFelvettHitel   A félévenként folyósított összeg
 * @return {Number}                           Az összes tőketartozás kamatostul, miután az összes hitel folyósításra került
 */
function juttatsiIdoszakAlattiKamat(felevekSzama, felevenkentFelvettHitel) {
  var aktualisFelev = 1;
  var elhataroltHaviKamat = 0;
  var elhataroltKamategyenleg = 0;
  var tokeTartozas = felevenkentFelvettHitel;

  while (felevekSzama >= aktualisFelev) {
    for (i = 1; i <= 6; i++) {
      elhataroltHaviKamat = kamatSzamitas(dh1Kamat, tokeTartozas);
      elhataroltKamategyenleg = elhataroltKamategyenleg + elhataroltHaviKamat;
    }
    //ha nem egész évre vesszük fel akkor itt ki kell lépni
    if (felevekSzama <= aktualisFelev) {
      tokeTartozas = tokeTartozas + elhataroltKamategyenleg;
      break;
    } else {
      tokeTartozas = tokeTartozas + felevenkentFelvettHitel;
    }
    aktualisFelev = aktualisFelev + 1;
    for (i = 1; i <= 6; i++) {
      elhataroltHaviKamat = kamatSzamitas(dh1Kamat, tokeTartozas);
      elhataroltKamategyenleg = elhataroltKamategyenleg + elhataroltHaviKamat;
    }
    if (felevekSzama == aktualisFelev) {
      tokeTartozas = tokeTartozas + elhataroltKamategyenleg;
    } else {
      tokeTartozas = tokeTartozas + felevenkentFelvettHitel;
      tokeTartozas = tokeTartozas + elhataroltKamategyenleg;
      elhataroltKamategyenleg = 0;
    }
    aktualisFelev = aktualisFelev + 1;
  }

  return tokeTartozas;
}

/**
 * Megnézi, hogy az érték a slidernek megfelelő értékkel rendelkezi-e
 * * nagyobb-e a minimumnál
 * * kissebb-e a maximumnál
 * * megfelelő a steppnel, tehát osztható-e a steppel
 * * Ha valamelyik nem teljesül annak megfelelően beállítja az értéket.
 * Módosítás után meghívja a számító függvényt
 * @param  {Integer} inputValue  a bemeneti érték amit a felhasználó megadott az mezőben
 * @param  {Range Object} slider a slider eminek a paramétereihez hasonlítjuk az értéket
 * @param  {Integer} inputValue  a beállított bemeneti érték
 */
function minMaxBemenetEllenzese(inputValue, slider) {
  if (inputValue < slider.min) {
    inputValue = slider.min;
  } else if (inputValue > slider.max) {
    inputValue = slider.max;
  } else if (inputValue % slider.step != 0) {
    inputValue = Math.round(inputValue / slider.step) * slider.step;
  }
  return inputValue;
}

/**
 * A kalkulátorok bemenetét kezelő függvény, az alábbiakra szolgál
 * * módosítja a slider értékét
 * * Módosítja a cimke értékét és pozicióját
 * * Az inputfield és a slider értékét összehangolja
 * Módosítás után meghívja a számító függvényt
 * @param  {Input Object} input    A bemeneti beviteli mező objektuma
 * @param  {Range Object} slider   A belemeneti csúszka objektuma
 * @param  {Boolean} egyediLeptek  [egyediLeptek=false] - az egyedileg beállított lépték bekapcsolása
 */
function changeInputsValues(input, slider, label, egyediLeptek = false) {
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

    inputValue = minMaxBemenetEllenzese(inputValue, slider);
    if (egyediLeptek) inputValue = modositottLeptek(inputValue);

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

/*
 *Oldal: /felvettem-diakhitel1/
 *Kalkulátor ami használja: kalkulator_4
 */
function torlesztoreszletFutamidoAlapjan() {
  document.getElementById("torlesztoReszletCimke").innerHTML = formazasForintra(
    torlesztoReszletSzamitas(tartozasSlider.value, futamidoSlider.value, dh1Kamat),
  );
}

/*
 *Oldal: /felvettem-diakhitel2/
 *Kalkulátor ami használja: kalkulator_7, kalkulator_9, kalkulator_10
 */
function torlesztoreszletFutamidoAlapjan_DH2() {
  document.getElementById("torlesztoReszletCimke").innerHTML = formazasForintra(
    tartozasSlider.value / (futamidoSlider.value * 12),
  );
}

/*
 *Oldal: /felvettem-diakhitel2/
 *Kalkulátor ami használja: kalkulator_8
 */
function futamidoTorlesztoreszletAlapjan_DH2() {
  document.getElementById("futamidoCimke_2").innerText = monthInYYMM(
    Math.ceil(tartozasSlider_2.value / torlesztoSlider_2.value),
  );
}

/*
 *Oldal: /diakhitel2/
 *Kalkulátor ami használja: kalkulator_6
 */
function torlesztoreszletFutamidoAlapjanFelevente_DH2() {
  document.getElementById("torlesztoReszletCimke_2").innerHTML = formazasForintra(
    (tartozasSlider_2.value * felevSlider_2.value) / (futamidoSlider_2.value * 12),
  );
  document.getElementById("felvettHitelOsszegeCimke_2").innerHTML = formazasForintra(
    tartozasSlider_2.value * felevSlider_2.value,
  );
}

/*
 *Oldal: /diakhitel2/
 *Kalkulátor ami használja: kalkulator_5
 */
function futamido_DH2() {
  var feleventeFelvettHitel = tartozasSlider.value;
  var felevekSzama = felevSlider.value;
  var bruttoBer = bruttoBerSlider.value;
  var hitelTartozas = felevekSzama * feleventeFelvettHitel;
  var torlesztoReszlet = torlesztoReszletFizetesEsTartozasAlapjan(hitelTartozas);
  var torlesztoReszletErteke = (torlesztoReszlet * bruttoBer).toFixed();

  document.getElementById("torlesztoReszletSzazalekLabel").innerHTML = (torlesztoReszlet * 100).toFixed() + " %";
  document.getElementById("felvettHitelOsszegeCimke").innerHTML = formazasForintra(hitelTartozas);
  document.getElementById("torlesztoReszletCimke").innerHTML = formazasForintra(torlesztoReszletErteke);
  document.getElementById("futamidoCimke").innerText = monthInYYMM(Math.ceil(hitelTartozas / torlesztoReszletErteke));
}

/*
 *Oldal: /felvettem-diakhitel1//
 *Kalkulátor ami használja: kalkulator_4
 */
function futamidoTorlesztoreszletAlapjan() {
  /*Init the variables */
  var honapok = 1;
  var haviTorleszto = torlesztoSlider_2.value;
  var fizetettKamat = kamatSzamitas(dh1Kamat, tartozasSlider_2.value);
  var toketartozas = Math.ceil(tartozasSlider_2.value - haviTorleszto + fizetettKamat);

  while (toketartozas >= 0) {
    honapok = honapok + 1;
    fizetettKamat = kamatSzamitas(dh1Kamat, toketartozas);
    toketartozas = Math.ceil(toketartozas - haviTorleszto + fizetettKamat);
    /* Ha hosszú lenne a futamidő a kamatot negatívra állítjuk így a ciklus végetér */
    if (honapok > 1500) {
      toketartozas = -10;
    }
  }
  if (toketartozas != -10) {
    document.getElementById("futamidoCimke_2").innerText = monthInYYMM(honapok);
  } else {
    document.getElementById("futamidoCimke_2").innerHTML = "A futamidő túl hosszú, <br> módosítsa a megadott adatokat!";
  }
}

/*
 *Oldal: /diakhitel1//
 *Kalkulátor ami használja: kalkulator_1
 */
function futamidoszamitasa_DH1() {
  var torlesztoReszletElsoEv = minimalber * 0.06;
  var jovedelem = bruttoBerSlider.value;
  var torlesztoMasodikEvtol = jovedelem * 0.06 < torlesztoReszletElsoEv ? torlesztoReszletElsoEv : jovedelem * 0.06;
  var havontaFelvettHitel = parseInt(tartozasSlider.value);
  var felevekSzama = felevSlider.value;
  var felevenkentFelvettHitel = havontaFelvettHitel * 5;
  var tokeTartozas = juttatsiIdoszakAlattiKamat(felevekSzama, felevenkentFelvettHitel);

  var honapok = 1;
  var haviTorleszto = honapok <= 12 ? torlesztoReszletElsoEv : torlesztoMasodikEvtol;
  var fizetettKamat = kamatSzamitas(dh1Kamat, tokeTartozas);

  tokeTartozas = Math.ceil(tokeTartozas - haviTorleszto + fizetettKamat);

  while (tokeTartozas >= 0) {
    honapok = honapok + 1;
    haviTorleszto = honapok <= 12 ? torlesztoReszletElsoEv : torlesztoMasodikEvtol;
    fizetettKamat = kamatSzamitas(dh1Kamat, tokeTartozas);
    tokeTartozas = Math.ceil(tokeTartozas - haviTorleszto + fizetettKamat);

    if (honapok > 15000) {
      tokeTartozas = -10;
    }
  }
  document.getElementById("felvettHitelOsszegeCimke").innerText = formazasForintra(
    felevenkentFelvettHitel * felevekSzama,
  );
  document.getElementById("futamidoCimke").innerText = monthInYYMM(honapok);
  document.getElementById("torlesztoMasodikEvtolCimke").innerText = formazasForintra(torlesztoMasodikEvtol);
  document.getElementById("torlesztoreszletElsoEvCimke").innerText = formazasForintra(torlesztoReszletElsoEv);
}

/*
 *Oldal: /diakhitel1//
 *Kalkulátor ami használja: kalkulator_2
 */
function torlesztoReszletSzamitasa_DH1() {
  var havontaFelvettHitel = parseInt(tartozasSlider_2.value);
  var felevekSzama = felevSlider_2.value;
  var felevenkentFelvettHitel = havontaFelvettHitel * 5;
  var tokeTartozas = juttatsiIdoszakAlattiKamat(felevekSzama, felevenkentFelvettHitel);

  document.getElementById("torlesztoReszletCimke_2").innerHTML = formazasForintra(
    torlesztoReszletSzamitas(tokeTartozas, futamidoSlider_2.value, dh1Kamat),
  );
  document.getElementById("felvettHitelOsszegeCimke_2").innerText = formazasForintra(
    felevenkentFelvettHitel * felevekSzama,
  );
}
