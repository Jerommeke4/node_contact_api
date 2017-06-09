# Contacts service API

This is an API written in nodeJS using MongoDB as backend NoSQL database. It is capable of 
storing contact information using a simple REST API. 

Installation
============
* When running docker container run docker-compose up to start the necessary containers and move to
`http://docker_host:3000/contact`
* When installing seperately install a nodejs compatible server, deploy the code there and run the following commands:
    * `npm install`
    * `npm start`
    * Update the config.json file to use your own mongoDB host
    * and again go to `http://docker_host:3000/contact`

Data
====
The contact is based on the following
datamodel:

![Model](http://www.plantuml.com/plantuml/png/IybCBqeio51mLwZcKW22nCogL0LR9HCT4oLhi41oVbv9OdA9GdHnHc91gcrIVaKigeIkdK9gRc9cJh52T7bgPdf6YQq5feg2ZFoyLB_ItAJK8hpgyX9pKz7aQm40)

The following data is available per object:


*Contact*

| Column        | Type          | Info          |
| ------------- |:-------------:|:--------------------------: |
| id            | string        | Id in the db                |
| label         | string        | How to show the contact     |
| ref           | string        | reference to a phonebook    |
| name          | Name          | Object                      |
| emails        | Email[]       | List of Email objects       |
| phoneNumbers  | PhoneNumber[] | List of Phonenumber objects |

*Name*

| Column        | Type          | Info          |
| ------------- |:-------------:|:--------------------------: |
| firstName     | string        ||
| middleName    | string        ||
| lastName      | string        ||

*Email*

| Column        | Type          | Info          |
| ------------- |:-------------:|:--------------------------: |
| address       | string        | The Email address           |
| role          | string        | Work / Private / ...        |

*PhoneNumber*

| Column        | Type          | Info          |
| ------------- |:-------------:|:--------------------------: |
| number        | string        | The Phone number            |
| role          | string        | Work / Private / Mobile / ..|

Usage
=====
The following functions are available.
* Get all the contacts
* Get all the contacts filtered by ref
* Get all the contacts filter by query on name, phonenumbers, emails
* Get all the contacts filtered by ref AND query on name, phonenumber, emails
* Post a new contact
* Update (PUT) an existing contact
* Delete an existing contact

For all examples below please refer to your own environment as these examples are
available when running on `localhost:3000`

Get all the contacts
--------------------
GET `http://localhost:3000/contact`

Responses like
```
[
  {
    "id": "593a464a6c6b9900111f2054",
    "label" "some label"
    "name": {
      "firstName": "First",
      "middleName": "",
      "lastName": "Name",
      "presentationName": "First Name"
    },
    "emails": [
      {
        "address": "email@gmail.com",
        "role": "private"
      },
      {
        "address": "email@work.com",
        "role": "work"
      }
    ],
    "phoneNumbers": [
      {
        "number": "31612345678",
        "role": "mobile"
      },
      {
        "number": "3132011111",
        "role": "home"
      }
    ],
    "links": [
      {
        "rel": "self",
        "href": "http://localhost:3000/contact/593a464a6c6b9900111f2054"
      }
    ]
  }
```

Get all the contacts filtered by ref
------------------------------------
GET `http://localhost:3000/contact?ref=your_reference`
Result is the same as getting all contacts but contacts with other refs are filtered out.

Get all the contacts filter by query on name, phonenumbers, emails
------------------------------------------------------------------
GET `http://localhost:3000/contact?q=your_query`
This filtersthe contact on the given query. This filteres on the label, the phoneNumbers.number and the emails.address

Result is the same as getting all contacts but contacts with other refs are filtered out.

Get all the contacts filtered by ref AND query on name, phonenumber, emails
---------------------------------------------------------------------------
GET `http://localhost:3000/contact?ref=your_reference&q=your_query`

Post a new contact
------------------
POST `http://localhost:3000/contact`
```

  {
    "label" "some label"
    "name": {
      "firstName": "First",
      "middleName": "",
      "lastName": "Name",
      "presentationName": "First Name"
    },
    "emails": [
      {
        "address": "email@gmail.com",
        "role": "private"
      },
      {
        "address": "email@work.com",
        "role": "work"
      }
    ],
    "phoneNumbers": [
      {
        "number": "31612345678",
        "role": "mobile"
      },
      {
        "number": "3132011111",
        "role": "home"
      }
    ]
  }
```

Response contains the created contact.

Update (PUT) an existing contact
--------------------------------
PUT `http://localhost:3000/contact/%contact_id%`
```

  {
    "label" "some label"
    "name": {
      "firstName": "First",
      "middleName": "",
      "lastName": "Name",
      "presentationName": "First Name"
    },
    "emails": [
      {
        "address": "email@gmail.com",
        "role": "private"
      },
      {
        "address": "email@work.com",
        "role": "work"
      }
    ],
    "phoneNumbers": [
      {
        "number": "31612345678",
        "role": "mobile"
      },
      {
        "number": "3132011111",
        "role": "home"
      }
    ]
  }
```

Response contains the updated contact


Delete an existing contact
--------------------------
DELETE `http://localhost:3000/contact/%contact_id%`

Docker
======
A docker compose config file was included that serves the node server as 
well as a Mongo container to store the data.



