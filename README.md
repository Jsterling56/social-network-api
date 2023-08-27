# social-network-api

## Description

## Installation
    1. Clone repo in local environment.
    2. User must have mongodb installed.
    3. Run these commands in VSCode command line:
        - npm init -y
        - npm install express
        - npm install mongoose
        - npm install moment
    4. Start the server by running the following in VSCode command line:
        - npm start
    5. Use Insomnia to test routes are working as intended.

## Testing
- /api/users
    - GET all users
    - POST a new user

- /api/users/:userid
    - GET a single user by its _id
    - PUT to update a user by its _id
    - DELETE to delete a user by their _id

-/api/users/:userId/friends/:friendId
    - POST to add a new friend to a user's friend list

## License
Currently under no license.

## Questions
Any questions, email at jtsterlin@yahoo.com

## Credits
Code is not mine. All code is taken from https://github.com/civ187/social-network-API 
Elements of above readme were used from that repo as well.