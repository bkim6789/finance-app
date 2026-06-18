//subscribe function sets up an interval and also lets you cancel
//takes in a list of ids and a callback
//returns a cancel function
export const subscribeData = ({ids, onMessage}) => {
  const intervalId = setInterval(() => {
    const idToValue = ids.reduce((acc, id) => {
      acc[id] = getRandomValue(id);
      return acc;
    }, {});

    onMessage(idToValue);
  }, 5_000);

  return () => clearInterval(intervalId);
}


//need a function to get a number for an id
const getRandomValue = (id) => {
  const indexOffset = 97;
  const randomValue = id.toLowerCase().charCodeAt(0) - indexOffset + Math.random();
  return randomValue;
};