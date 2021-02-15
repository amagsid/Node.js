const Handlebars = require("handlebars");
const arrays = require("./data");

const getRandomElement = (array) =>
  array[(randomEl = Math.floor(Math.random() * array.length))];

const drawCard = () => {
  const cardData = {
    subject: getRandomElement(arrays.subjects),
    punchLine: getRandomElement(arrays.punchlines),
  };

  let card = `{{subject}} is great to {{punchLine}}`;
  const template = Handlebars.compile(card);
  card = template(cardData);

  console.log(card);
};

drawCard();
