import functions from '@architect/functions';
import dayjs from 'dayjs';

export async function handler (req) {

  let requestParams = JSON.parse(req.body);

  // very good optimization :)
  let birthdaysData = await fetch("http://localhost:3333/birthdays");
  let birthdays = await birthdaysData.json();

  let today = dayjs();
  if (requestParams.bdToday == true) {
    birthdays = birthdays.filter((b) => {
      return dayjs().isSame(dayjs(b.nextBirthday), 'day');
    });
  }
  [].sort()

  if (requestParams.ageSort) {
    if (requestParams.ageSort == "asc") {
      birthdays.sort((a, b) => dayjs(a.birthday).unix() - dayjs(b.birthday).unix());

    } else if (requestParams.ageSort == "desc") {
      birthdays.sort((a, b) => dayjs(b.birthday).unix() - dayjs(a.birthday).unix());
    }
  }

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(birthdays)
  }
}