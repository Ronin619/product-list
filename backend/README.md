## Product List

1. Clone the repo to your system and then npm install in your terminal while in the backend directory.

2) Enter "npm run start" to start the server and make a get request to "localhost:8000/generate-fake-data" to create and save 90 product documents in your mongoDB database. (install mongodb if you have not already done so.)

3) You need to create your own OAuth 2.0 Client IDs and Client secrets for google passport.

   A) Set the Authorized JavaScript origins to "http://localhost:8000".
   B) Set the Authorized redirect URLs to "http://localhost:8000/auth/google/callback".

4) In your .env file, include the following variables:

   SESSION_SECRET=(set to any string of your choice)
   CLIENT_ID=(set to the client id you generate from google cloud)
   CLIENT_SECRET=(set to the client secret string you generate from google cloud)

This project has been created by a student at Parsity, an online software engineering course. The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the repository that this project forks.

If you have any questions about this project or the program in general, visit [parsity.io](https://parsity.io/) or email hello@parsity.io.
