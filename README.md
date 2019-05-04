# NoteTaker

This project lets the user create Notes and keep them persistent in the memory (basically the DB).

1. VIEW SAVED NOTES:
Initially the user will be able to see already created notes on the left pane on the window. These will be populated based on note creation date and time, last created will be on top. These are stored in the MySQL DB at the backend.

2. CREATE NEW NOTE:
The user can create a "NEW Note" by clicking on the (+) icon on top-right corner of the window. Clicking on "Save to Notes" will store the note in DB as well are show it as the 1st note in the left window pane.


3. DELETE NOTE:
When user selects a note, the specific note can be seen on the right. The user can now delete this note. User can now see a delete (trash can) icon gets visible on the top-right of the window. Clicking on which will delete the specific note from the left note list as well as from the DB.

4. EDIT NOTE:
When user selects a note, the specific note can be seen on the right form expanded and editted if needed. Clicking on "Save to notes" will edit the specific note and save it to the DB.



## Technologies used

This is a note-taking application built with Node, Express, and MySQL.



## Screenshots
![alt text](https://github.com/ankitadhyani/liri-node-app/blob/master/snapshots/1_StartApp.png "Note Taker: Main Page")

![alt text](https://github.com/ankitadhyani/liri-node-app/blob/master/snapshots/2_Concert.png "Note Taker: Notes")
