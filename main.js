// fetch json data
var jsonData = [];

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    jsonData = data;
    appendData(jsonData, "Daily");
  })
  .catch(function (error) {
    console.log(error);
  });

// prepare selection
const selectElements = (element) => document.querySelectorAll(element);

var period = selectElements(".period-link");

// add click event listener
for (var i = 0; i < period.length; i++) {
  period[i].addEventListener("click", (e) => {
    console.log(e.srcElement.innerHTML);
    if (!e.srcElement.classList.contains("active")) {
      desactivateAll();
      e.srcElement.className += " active";
      appendData(jsonData, e.srcElement.innerHTML);
    }
  });
}

// Reset all period selection class
function desactivateAll() {
  for (var i = 0; i < period.length; i++) {
    period[i].classList.remove("active");
  }
}

// Inject data as HTML
function appendData(data, periodName) {
  var mainContainer = document.getElementById("cards");
  mainContainer.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    var card = document.createElement("section");
    card.className = `${data[i].title}`;
    card.innerHTML = `
    <div class="card-container">
    <h3>${data[i].title}</h2>
    <h2><span class="current">${
      periodName == "Daily"
        ? data[i].timeframes.daily.current
        : periodName == "Weekly"
        ? data[i].timeframes.weekly.current
        : data[i].timeframes.monthly.current
    }</span>hrs</h2>
    <div class="points"></div>
    <p>Last week - <span class="previous">${
      periodName == "Daily"
        ? data[i].timeframes.daily.previous
        : periodName == "Weekly"
        ? data[i].timeframes.weekly.previous
        : data[i].timeframes.monthly.previous
    }</span>hrs</p>
    </div>`;
    mainContainer.appendChild(card);
  }
}
