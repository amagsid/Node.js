const fetch = require("node-fetch");

const body = {
  name: "Ahmad",
  numberOfPeople: 10,
};

const stringfiedBody = JSON.stringify(body);

async function makeReservation() {
  try {
    const response = await fetch(
      "https://reservation100-sandbox.mxapps.io/api/reservations",
      {
        method: "post",
        body: stringfiedBody,
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    console.log(data.message);
  } catch (err) {
    console.log(err);
  }
}

makeReservation();
