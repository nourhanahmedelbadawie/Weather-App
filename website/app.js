/* Global Variables */

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
let baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apikey = ",us&appid=87b5b7bc706328814a16c9de516fe6bf";
document.getElementById("generate").addEventListener("click", () => {
  let zip = document.getElementById("zip").value;

  sendData(baseUrl, apikey, zip);
});

const sendData = async (baseUrl, apikey, zip) => {
  console.log(zip, "zip");
  let response = await fetch(baseUrl + zip + apikey);
  try {
    let result = await response.json();
    let feeling = document.getElementById("feelings").value;

    await postData(result.main.temp, feeling);
  } catch (err) {
    console.log(err);
  }
};

const postData = async (data, feeling) => {
  console.log(
    "data to send",
    JSON.stringify({
      date: newDate,
      temp: data,
      feel: feeling,
    })
  );
  let response = await fetch("http://localhost:8000/postdata", {
    method: "POST",

    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: newDate,
      temp: data,
      feel: feeling,
    }),
  })
    .then((res) => {
      console.log("post req", res);
      updateUI();
    })
    .catch((err) => {
      console.log(err);
    });
};
const updateUI = async () => {
  let response = await fetch("http://localhost:8000/getdata", {
    method: "GET",

    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    let dataToUI = res.json();
    dataToUI.then((res) => {
      document.getElementById("date").innerHTML = res.date;
      document.getElementById("temp").innerHTML = res.temp;
      document.getElementById("content").innerHTML = res.feel;
    });
  });
};
