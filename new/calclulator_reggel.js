<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style_calculator.css" />
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div class="calculatorContainer">
      <div>
        <div class="section-input">
          <h3>Félévenként felvett összeg</h3>
          <input
            class="number"
            id="loanAmountInput"
            type="number"
            min="30000"
            max="150000"
            step="10000"
            value="50000"
          />
          <div class="range-wrap">
            <div class="range-value" id="loanAmountSliderV"></div>
            <input
              class="range"
              id="loanAmountSlider"
              type="range"
              min="30000"
              max="150000"
              step="10000"
              value="50000"
            />
          </div>
        </div>

        <div class="section-input">
          <h3>Félévek száma</h3>
          <input id="semesterInput" class="number" type="number" min="1" max="14" step="1" value="4" />
          <div class="range-wrap">
            <div class="range-value" id="semesterSliderV"></div>
            <input id="semesterSlider" class="range" type="range" min="1" max="14" step="1" value="4" />
          </div>
        </div>

        <div class="section-input">
          <h3>Várható havi bruttó bér</h3>
          <input id="wageInput" class="number" type="number" min="100000" max="1000000" step="10000" value="140000" />
          <div class="range-wrap">
            <div class="range-value" id="wageSliderV"></div>
            <input id="wageSlider" class="range" type="range" min="100000" max="1000000" step="10000" value="140000" />
          </div>
        </div>
      </div>

      <div>
        <p>Felvett hitel összege: <span id="LoanAmountLabel"></span></p>
        <p>A bérének hány %-a a törlesztőrészlet: <span id="installment1Label"></span></p>
        <p>Törlesztőrészlet: <span id="installment2Label"></span></p>
        <p>Futamidő: <span id="monthsLabel"></span></p>
      </div>
    </div>
    <script src="GeneralFunctions.js"></script>
    <script>
      /*
       *Bemeneti mezők inicializálása
       *  Minden véltozónak 2 bemeneti mezője van és egy labelje
       *  --Az 1. egy  szám típusú bemeneti mező
       *  --A 2. egy range típusú bemeneti mező
       *  --A range bemeneti mezőhöz tartozik egy label amelyen látható az értéke.
       */

      //Félévek számához tartozó input mező
      const semesterInput = document.getElementById("semesterInput");
      //Félévek számához tartozó slider
      const semesterSlider = document.getElementById("semesterSlider");
      //Félévek számához tartozó slider labelje
      const semesterSliderV = document.getElementById("semesterSliderV");
      const setValue = () => {
        const newValue = Number(
          ((semesterSlider.value - semesterSlider.min) * 100) / (semesterSlider.max - semesterSlider.min),
        );
        const newPosition = 10 - newValue * 0.2;
        semesterSlider.style.background = `linear-gradient(to right, #1EADE8 0%, #1EADE8 ${newValue}%, #E0E0E0 ${newValue}%, #E0E0E0 100%)`;
        semesterSliderV.innerHTML = `<span>${semesterSlider.value}</span>`;
        semesterSliderV.style.left = `calc(${newValue}% + (${newPosition}px))`;
      };

      function setSliderValues(slider, label) {
        return function () {
          const newValue = Number(((slider.value - slider.min) * 100) / (slider.max - slider.min));
          const newPosition = 10 - newValue * 0.2;
          slider.style.background = `linear-gradient(to right, #1EADE8 0%, #1EADE8 ${newValue}%, #E0E0E0 ${newValue}%, #E0E0E0 100%)`;
          label.innerHTML = `<span>${slider.value}</span>`;
          label.style.left = `calc(${newValue}% + (${newPosition}px))`;
        };
      }
      document.addEventListener("DOMContentLoaded", setSliderValues(semesterSlider, semesterSliderV));
      semesterSlider.addEventListener("input", setSliderValues(semesterSlider, semesterSliderV));

      //Félévenként felvett összeghez tartozó slider
      const loanAmountSlider = document.getElementById("loanAmountSlider");
      //Félévenként felvett összeghez tartozó input mező
      const loanAmountInput = document.getElementById("loanAmountInput");
      //Félévenként felvett összegéhez tartozó slider labelje
      const loanAmountSliderV = document.getElementById("loanAmountSliderV");
      const setloanAmountSliderValue = () => {
        const newValue = Number(
            ((loanAmountSlider.value - loanAmountSlider.min) * 100) / (loanAmountSlider.max - loanAmountSlider.min),
          ),
          newPosition = 10 - newValue * 0.2;
        loanAmountSlider.style.background = `linear-gradient(to right, #1EADE8 0%, #1EADE8 ${
          ((loanAmountSlider.value - loanAmountSlider.min) / (loanAmountSlider.max - loanAmountSlider.min)) * 100
        }%, #E0E0E0 ${
          ((loanAmountSlider.value - loanAmountSlider.min) / (loanAmountSlider.max - loanAmountSlider.min)) * 100
        }%, #E0E0E0 100%)`;

        loanAmountSliderV.innerHTML = `<span>${loanAmountSlider.value}</span>`;
        loanAmountSliderV.style.left = `calc(${newValue}% + (${newPosition}px))`;
      };
      document.addEventListener("DOMContentLoaded", setloanAmountSliderValue);
      loanAmountSlider.addEventListener("input", setloanAmountSliderValue);

      const wageSlider = document.getElementById("wageSlider"),
        wageSliderV = document.getElementById("wageSliderV"),
        setwageSliderValue = () => {
          const newValue = Number(((wageSlider.value - wageSlider.min) * 100) / (wageSlider.max - wageSlider.min)),
            newPosition = 10 - newValue * 0.2;
          wageSlider.style.background = `linear-gradient(to right, #1EADE8 0%, #1EADE8 ${
            ((wageSlider.value - wageSlider.min) / (wageSlider.max - wageSlider.min)) * 100
          }%, #E0E0E0 ${
            ((wageSlider.value - wageSlider.min) / (wageSlider.max - wageSlider.min)) * 100
          }%, #E0E0E0 100%)`;

          wageSliderV.innerHTML = `<span>${wageSlider.value}</span>`;
          wageSliderV.style.left = `calc(${newValue}% + (${newPosition}px))`;
        };
      document.addEventListener("DOMContentLoaded", setwageSliderValue);
      wageSlider.addEventListener("input", setwageSliderValue);
    </script>
  </body>
</html>
