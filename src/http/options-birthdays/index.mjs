// learn more about HTTP functions here: https://arc.codes/http
export async function handler (req) {
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      // 'content-type': 'text/html; charset=utf8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',

    }
  }
}