import functions from '@architect/functions';

export async function handler (req) {
  
  let data = JSON.parse(req.body);


  console.log(data);

  let birthday = {
    'firstName': data.firstName,
    'lastName': data.lastName,
    'birthday': data.birthday,
    'profileImage': data.profileImage
  };

  let arc = await functions.tables();

  await arc.birthdays.put(birthday);

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: JSON.stringify({"staus": "successfully added birthday"})
  }
}