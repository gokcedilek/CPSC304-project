💃💃💃🎉🎉🎉🎉🎉💃💃💃🎉🎉🎉🎉🎉

## Welcome to our exciting project!

### Instructions on how to use the boilerplate:

The database (postgres) can be accessed here:
https://customer.elephantsql.com/instance

Username: abagshaw@alumni.ubc.ca

Password: cs304project

Right now there is only one table, *purchases* (this is actually the order table renamed). I also didn't include the part of the CREATE TABLE statement that makes columns into foreign keys because I don't want to go to the trouble of creating the other tables yet.

After you create an order, you can go and view it in the "BROWSER" tab in ElephantSQL. Then try:
```
select * from purchases;
```

You'll want to run the DbApplication main method in this project using intellij. Then go to `http://localhost:8080`


How to use the pgAdmin interface for the database:
1. download the .dmg file from https://www.pgadmin.org/download/
2. after opening pgAdmin from the browser, click "create new server"
3. "general" tab: name the database
4. "connection" tab: Hostname is "drona.db.elephantsql.com" (in our case), Port is "5432", Maintenance database and Username are "nfxwiszf", and Password is the password:). These can be found from the application.properties file in the project folder, or under the "Details" tab in ElephantSQL.
5. Once it's created in pgAdmin, go to Databases -> 'username' (from above) -> Schemas -> Tables
