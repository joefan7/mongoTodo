Mongo To-do list

Create a full-stack to-do list application, using mongo and express.

On the front-end, create a form that allows the user to post a to-do item to the server. The form needs to only have a single input (for the to-do text) and a submit button. When the server receives this to-do item, it should be saved in the database. 

When the home page loads, it should immediately request all to-do items from the server, and display them in a list. 
The user should be able to click on a to-do item in their list to mark it as completed, which should change the visual display of that item so that it appears completed (check out the css property `text-decoration: line-through;`). 
The user should be able to click on a completed to-do item to mark it as incomplete (essentially undoing marking it as complete).
If an item is marked as complete or incomplete on the front-end, you should also mark it as complete/incomplete in the database.
Each to-do item should have a button next to it which allows the user to delete that to-do item entirely. Clicking this button should remove the to-do from the list, as well as from the database.

If the data in your database is updating properly, you should be able to refresh the page at any point, and your application's state should not appear to refresh or change in any way, since your database is storing every detail of your to-do list. 
