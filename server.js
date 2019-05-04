// import dependencies
const express = require('express');

const connection = require('./db/connection');

const path = require('path');

var moment = require('moment');

// create server using express() and set a port
const app = express();
const PORT = process.env.PORT || 3000;


// set up our middleware to handle incoming POST data
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


// Set up route to root (home page)
app.get('/', function (req, res) {

    console.log("In GET: /");
    res.sendFile(path.join(__dirname, './html/home.html'));

});


app.get('/notes', function (req, res) {

    console.log("In GET: /notes");
    res.sendFile(path.join(__dirname, './html/notes.html'));

});


/************************************************************************************************
 * GET method: api routes
 * Select all from notes table
************************************************************************************************/

app.get('/api/notes', function (req, res) {
    
    console.log("In GET: /api/notes");

    // query db for all table data
    connection.query('SELECT * FROM notes ORDER BY created_at DESC', function (err, allnotes) {
        
        if (err) {
            return res.status(500).json(err);
        }

        for(let i=0; i<allnotes.length ; i++) {

            // Convert creation date (use moment to format this as "MM/DD/YYYY HH:mm")
            var dateToBeConverted = moment(allnotes[i].created_at, "YYYY-MM-DDTHH:mm:ss");
            allnotes[i].created_at =  dateToBeConverted.format('MMMM Do YYYY, h:mm a');
        }

        // if no error, send back array of notes
        res.json(allnotes);
    });

});


/************************************************************************************************
 * POST method:  api routes
 * Insert Into a note data
************************************************************************************************/

app.post('/api/notes', function (req, res) {
    
    console.log("In POST: /api/notes");
    //console.log(req.body);

    connection.query('INSERT INTO notes SET ?', [req.body], function(err, addedNote) {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        // if insert was successful
        res.json({ status: 'successful' });
      });

});


/************************************************************************************************
 * PUT method:  api routes
 * Update a note
************************************************************************************************/

app.put("/api/notes/:id", function(req, res) {
    
    console.log("In PUT: /api/notes/:"+req.params.id);
    //console.log(req.body);

    connection.query("UPDATE notes SET title=?, body=?, created_at=NOW() WHERE id=?", [req.body.title, req.body.body, req.params.id], function(err, result) {

      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });



/************************************************************************************************
 * DELETE method:  api routes
 * Delete a note
 ************************************************************************************************/

app.delete("/api/notes/:id", function(req, res) {

    console.log("In DELETE: /api/notes/:"+req.params.id);

    connection.query("DELETE FROM notes WHERE id = ?", [req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
});



/************************************************************************************************
 * GET method: 
 * If user enters any other path/route other than ones defined above reply with 404 erre
 ************************************************************************************************/

app.get('*', function (req, res) {
    res.send('<h1>404 Error!</h1>');
});


// turn on server, make sure this is last in the file
app.listen(PORT, () => console.log(`You are now on localhost:${PORT}.`));