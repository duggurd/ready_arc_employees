import functions from '@architect/functions';
import dayjs from 'dayjs';

import { readFileSync } from 'fs'

export async function handler (req) {

  // let data = await functions.tables();
  // let birthdays = await data.birthdays.scan({"tablename":"birthdays"});

  let birthdays;

  try {
    birthdays =  JSON.parse(String(readFileSync("./data.json")));
  } catch (err) {
    return {
      statusCode: 404,
      headers: {
        'content-type': 'application/json; charset=utf8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({"message": "not found"})
    }
  }

  // Adding dummy value for todays date 
  birthdays.push({
    "firstName": "dummy",
    "lastName": "value",
    "birthday": dayjs().toISOString(),
    "profileImage": "https://parspng.com/wp-content/uploads/2022/06/imojipng.parspng.com-4.png"
  });
  

  // add date processing here
  birthdays.map((birthday) => {
    let bd = dayjs(birthday.birthday);
    birthday.ageYears = dayjs().diff(bd, 'year');

    let nextBd = bd;

    if (nextBd.set('year', dayjs().year()).isBefore(dayjs(), 'day')) {
      nextBd = nextBd.set('year', dayjs().year()+1)
    } else {
      nextBd = nextBd.set('year', dayjs().year())
    }

    // if ((bd.month() > dayjs().month()) || ((bd.date() > dayjs().date()) && (bd.month() == dayjs().month()))) {
    //   nextBd = nextBd.set('year', dayjs().year()+2)
    // } else {
    //   nextBd = nextBd.set('year', dayjs().year())
    // }
    birthday.nextBirthday = nextBd.toISOString();

    birthday.daysToBirthday = nextBd.diff(dayjs(), 'day');
  })

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*'
      
    },
    body: JSON.stringify(birthdays)
  }
  
}