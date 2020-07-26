window.addEventListener('load', start);

let redRange;
let greenRange;
let blueRange;

function start() {
  redRange = document.getElementById('red-range');
  greenRange = document.getElementById('green-range');
  blueRange = document.getElementById('blue-range');

  redRange.addEventListener('input', changeValue);
  greenRange.addEventListener('input', changeValue);
  blueRange.addEventListener('input', changeValue);

  changeValue();
}

function changeValue() {
  const redValue = redRange.value;
  const greenValue = greenRange.value;
  const blueValue = blueRange.value;

  setLabelsValue(redValue, greenValue, blueValue);
  setColorInPanel(redValue, greenValue, blueValue);
}

function setLabelsValue(redValue, greenValue, blueValue) {
  document.getElementById('red-label').value = redValue;
  document.getElementById('green-label').value = greenValue;
  document.getElementById('blue-label').value = blueValue;
}

function setColorInPanel(redValue, greenValue, blueValue) {
  const color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
  document.getElementById('panel-color').style.backgroundColor = color;
}
