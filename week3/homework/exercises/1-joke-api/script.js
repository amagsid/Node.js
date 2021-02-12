const fetch = require("node-fetch");

async function printChuckNorrisJoke() {
  try {
    const response = await fetch(` http://api.icndb.com/jokes/random
    `);
    const data = await response.json();
    console.log(data);

    const joke = data.value.joke;
    console.log(joke);
  } catch (err) {
    console.log(err);
  }
}

printChuckNorrisJoke();
