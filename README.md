## Full Stack Developer Assessment

Frontend : Next-Js , Tailwind CSS.
Backend : Node-js (Express-js) , Socket.io , Sequelize ORM.
Database : MySQL.
Authentication : JWT (JSON Web Tokens)

---------------------------------------------------------------------------------------

## PROJECT SETUP ##

## Backend : Express-js

step-1 : extract the file and select api folder use `npm install` for project setup.
step-2 : connect a MySQL databse with config/config.json file.
step-3 : run all migration with command >> `sequelize db:migrate`
        this command create all tables in db.
step-4 : run seeder file with command >> `sequelize db:seed:all`
        this command create a admin and a user in db
step-4 : run file with code >> `node .\index.js`

        backend server start on port : 3000

---

## frontend : Next-js (React-js)

step-1 : open ui folder and use `npm install` for project setup.
step-2 : env file
step-3 : start server >> `npm run dev`

        Open [http://localhost:5000] with your browser to see the result.

-----------------------------------------------------------------------------------------

## Seeder file (create two user)
    <A> email : abhishek@gmail.com
        password : 1234
        role : admin

    <B> email : ravi@gmail.com
        password : 1234
        role : user



* open [http://localhost:5000/login] for user login or click `Admin Login` or 
* open [http://localhost:5000/admin] and login as admin with admin email.

* create new user as (role : user) click on `create new account` or [http://localhost:5000/signup]

* A user can create a new task , update task and delete task , 
    when user add/update or delete and task same time a notification send to Admin.

* Admin can see and manage all tasks which is created by any user.


* logout button is attech in navbar.


------------------------------------------------------------------------------------------------




