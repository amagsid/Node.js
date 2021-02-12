const fetch = require("node-fetch");

async function printBooks() {
  try {
    const response = await fetch(
      `https://restapiabasicauthe-sandbox.mxapps.io/api/books`,
      {
        headers: { Authorization: "Basic YWRtaW46aHZnWDhLbFZFYQ==" },
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

printBooks();
