const webSocket = new WebSocket("ws://localhost:5001");

webSocket.onopen = function (event) {
  console.log("Websocket is open now.");
  webSocket.send(JSON.stringify("hello server!"));
};

const slider1 = document.querySelector("#mySlider1");
const slider2 = document.querySelector("#mySlider2");
const slider3 = document.querySelector("#mySlider3");
const slider4 = document.querySelector("#mySlider4");
const slider5 = document.querySelector("#mySlider5");
const slider6 = document.querySelector("#mySlider6");


slider1.oninput = function () {
  console.log(this.value);
  webSocket.send(JSON.stringify({ slider1: this.value }));
};
slider2.oninput = function () {
  console.log(this.value);
  webSocket.send(JSON.stringify({ slider2: this.value }));
};
slider3.oninput = function () {
  console.log(this.value);
  webSocket.send(JSON.stringify({ slider3: this.value }));
};
slider4.oninput = function () {
  console.log(this.value);
  webSocket.send(JSON.stringify({ slider4: this.value }));
};
slider5.oninput = function () {
  console.log(this.value);
  webSocket.send(JSON.stringify({ slider5: this.value }));
};
slider6.oninput = function () {
  console.log(this.value);
  webSocket.send(JSON.stringify({ slider6: this.value }));
  // Update the display value with country name
  const countryName = countries[this.value] || "No country selected";
  document.querySelector("#slider6Value").innerHTML = countryName;
};

const countries = {
    1: "Belgium",
    2: "Netherlands",
    3: "Germany",
    4: "France",
    5: "Spain"
};

