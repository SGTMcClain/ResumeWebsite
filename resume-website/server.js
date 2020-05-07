var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

// was CONTACTS_COLLECTION
var JOB_COLLECTION = "jobs"

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to resue the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function(err, client) {
    if (err){
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse
    db = client.db();
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port:", port);
    });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code){
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error" : message });
}


// JOBS
/**
 *  "/api/jobs"
 *      GET: finds all jobs
 *      POST: creates a new job
 */

app.get("/api/jobs", function(req, res){

});

app.post("/api/jobs", function(req, res){

});

/**
 * "/api/jobs/:id"
 *      GET: find job by id
 *      PUT: update job by id
 *      DELETE: deletes job by id
 */

app.get("/api/contacts/:id", function(req, res) {

});

app.put("/api/contacts/:id", function(req, res){

});

app.delete("/api/contacts/:id", function(req, res){

});

// TODO: about, education, certifications, skills, accomplishments, organizations