Contact List API
=============

A contact list API powered by Sinatra.

1. `bundle install`
2. `shotgun -p 3000 -o 0.0.0.0`
3. Visit `http://localhost:3000/` in your browser

## Contacts API

The contacts api allows you to create, retrieve, update, and delete contacts.

### Endpoints

*   POST /contacts
*   GET /contacts
*   PUT /contacts/{id}
*   DELETE /contacts/{id}

* * *

### Create a contact <small>POST /contacts</small>

        Params:

*   first_name (required)
*   last_name (required)
*   email
*   phone_number

### Edit a contact <small>PUT /contacts/:id</small>

        Params:

*   first_name
*   last_name
*   email
*   phone_number

### Delete a contact <small>DELETE /contacts/:id</small>

        No params required.

### Retrieve all contacts <small>GET /contacts</small>

        No params required.
