JWTs: header.payload.signature
    - ✅ login request to server, server responds with JWT!
    - ✅ store JWT in sessionStorage
    - send the JWT (from sessionStorage) as part of the request for any resources requiring authorization
        - headers: { Authorization: `Bearer ${jwt token}`}
    
Server:

POST /login
    create token and send in response (if user is authenticated)

Any endpoints that require the user to be authorized
GET /posts
    - requires authorization header with JWT
    - verify the JWT -> this is going to tell us who the user is
    - using the above user, respond with posts of that user