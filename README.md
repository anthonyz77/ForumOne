# ForumOne
ForumOne is a Q&A forum website where users may post any questions they have or just start an interesting thread to have a discussion with other users.
  
### 📂 Features:
- **User Authentication**: Users can sign up, log in, and manage their profile.
- **Admin User Authentication**: Admin users can log in, and manage other user and their posts.
- **Question and Answer System**: Users can post questions, provide answers, provide comments to answers, and vote on answers and comments.
- **Upvote/Downvote**: Each question, answer, and comment can be upvoted or downvoted based on quality. Only logged in users can upvote/downvote.
- **Search Functionality**: Users can search for questions based on keywords or tags. They can also sort questions based on unanswered status, recently active status, and date posted.
- **Categories and Tags**: Questions are organized into categories with tags for easier navigation.
- **User Reputation**: Users earn reputation points based on their activity and helpful contributions.
- **User Profile**: Users can view their reputation, posts, and activity on their profile.

### 🔧 Tech Stack:
- **Frontend**: React.js, JavaScript, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)

### 🚀 Running the project:
To run the project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/anthonyz77/ForumOne.git
   
3. The required dependencies are listed in client and server package.json. Install the dependencies for both the client and the server:
   npm install

4. Start the mongoDB database and start mongosh

5. Start the backend server:
   node server.js
  
6. Start client side webpage:
   npm start

7. To populate the database with an admin user, run the command:

    node server/init.js mongodb://127.0.0.1:27017/fake_so admin@fake_so.com 123

The login email will be admin@fake_so.com and the password will be 123

To populate the database with specific questions, answers, or users, go to init.js and input the desired questions, answers, or users
in the populate() function.
