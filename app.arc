@app
arhitect_employees

@http
get /
get /birthdays
get /birthdays/:firstName
post /birthdays/:firstName
post /birthdays
options /birthdays

@aws
profile architect
region eu-north-1

@tables
birthdays
  firstName *String
  lastName **String
  birthday **String
  profileImage **String