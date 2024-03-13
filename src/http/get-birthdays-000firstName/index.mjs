// learn more about HTTP functions here: https://arc.codes/http
let arc = require('@architect/functions')

export async function handler (req) {
  let firstName = req.body.firstName;
  let data = await arc.tables();

  let birthday = await data.birthdays.get({firstName});
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: JSON.stringify({"birthday":birthday})
  }
}