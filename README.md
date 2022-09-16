# Blog Application

Name : Swapnil Vise Email ID : vise.s@northeastern.edu NUID : 002110285

Idea : To build a full stack application using NodeJS, Express and ReactJS

This is a simple Blog Posting application, where a user can sign themselves up into the website.
After registration they can add new posts, edit posts, delete posts(which are posted by that particular user), and read all the posts that have been added into the website. 
User can also write an about section to let other users in the community know more about them.

Some more technical insight on the application -

Backend :
UserApi's - The application features all the CRUD applications for the user.
            Once a user has registered, they can login into the application to read blog posted by others or can even post a blog written by them.
            They can also delete a blog if they feel.
            UserName should be unique for all users, this feature has been added keeping in mind that ebery user is unique in nature and can have their own personal identity in the application.
Blog-Post Api's - Every Blog posted on the application can be updated or deleted as per user requirement, the updated time for the change will be recorded to keep track of most recent updated

Frontend :
Frontend consists of the following page:
1. Login and Registration - Used to create user profile and access the website
2. Home-Page - This page will showcase all the blogs that are available in the application, and a user can click on any blog to read more about it if they like
3. Single-Blog-Page - This page will display the entire blog with all the necessary details
4. Settings Page - From this page a user can update their email id in the website.