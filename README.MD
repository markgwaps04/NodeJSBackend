## **STEP 1**
Install dependencies for this project

    npm install

## **STEP 2**

In the project root, go to config folder and open config.json file. In development, change the predefined values base on your MySQL credentials and then add schema to your MySQL server.

![db_schema](https://i.ibb.co/2dGxzvv/db-schema.png)

## **STEP 3**
Apply changes that we have made in our model, migrating tables and columns.

    npx sequelize-cli db:migrate


## **STEP 4**

Populate database tables with sample or test data.

    npx sequelize-cli db:seed:all

## **STEP 5**

Run the test to make sure that all api is working.

	npm test

## **STEP 6**

Run the project

	npm start


#  REST API

**Get the list of user**

    GET /api/user

```
curl -i -H 'content-type: application/xml' http://localhost:3000/api/user
```




**Get the list of user information by where statement**

    GET /api/user?where={"id":3}

```
curl --location -g --request GET 'http://localhost:3000/api/user?where={"id" : "3"}' \
--header 'Content-Type: application/xml'
```


**Get the specified of user information by id**
	   
	GET /api/user/3

```
curl --location -g --request GET 'http://localhost:3000/api/user/3' \
--header 'Content-Type: application/xml'
```


**Insert  user information**
	   
	POST /api/user

```
curl --location --request POST 'http://localhost:3000/api/user' \
--header 'Content-Type: application/xml' \
--data-raw '{
"firstName" : "Mark",
"lastName" : "Libres",
"email" : "marklibres345@gmail.com",
"full_address" : "makilala, north cotabato",
"postcode" : "0700",
"phoneNumber" : "+639093522667",
"username" : "hello11",
"password" : "password"
}'
```

**Update  user information**
	   
	PATCH /api/user/3

```
curl --location --request PATCH 'http://localhost:3000/api/user/3' \
--header 'Content-Type: application/xml' \
--data-raw '{
"firstName" : "Mark",
"lastName" : "Libres",
"email" : "marklibres345@gmail.com",
"full_address" : "makilala, north cotabato",
"postcode" : "0700",
"phoneNumber" : "+639093522667",
"password" : "password11"
}'
```
**Delete  user information**
This will be change the column state to true or 1
	   
	DELETE /api/user/3

```
curl --location --request DELETE 'http://localhost:3000/api/user/3' \
--header 'Content-Type: application/xml'
```
**Delete  multiple user information**
This will be change the column state to true or 1

	DELETE /api/user?id=[1,2]

```
curl --location -g --request DELETE 'http://localhost:3000/api/user?id=[1,2]' \
--header 'Content-Type: application/xml'
```
