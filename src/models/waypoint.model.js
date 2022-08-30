const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (waipoint) => {
  const columns = Object.keys(snakeize(waipoint))
    .map((key) => `${key}`)
    .join(',');

    console.log(columns);

  const placeholders = Object.keys(waipoint)
    .map((_key) => '?')
    .join(',');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO waypoints (${columns}) VALUE (${placeholders})`,
    [...Object.values(waipoint)],
  );

  return insertId;
};

module.exports = {
  insert,
};