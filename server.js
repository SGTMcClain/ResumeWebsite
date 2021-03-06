var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

// was CONTACTS_COLLECTION
var JOB_COLLECTION = "jobs"

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

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
    db.collection(JOB_COLLECTION).find({}).toArray(function(err, docs){
        if(err){
            handleError(res, err.message, "Failed to get jobs.");
        } else {
            res.status(200).json(docs);
        }
    })
});

app.post("/api/jobs", function(req, res){
    var newJob = req.body;
    newJob.createDate = new Date();

    if(!req.body.title){
        handleError(res, "Invalid user input", "Must provide a title", 400)
    } else {
        db.collection(JOB_COLLECTION).insertOne(newJob, function(err, doc){
            if(err) {
                handleError(res, err.message, "Failed to create new job.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

/**
 * "/api/jobs/:id"
 *      GET: find job by id
 *      PUT: update job by id
 *      DELETE: deletes job by id
 */

app.get("/api/contacts/:id", function(req, res) {
    db.collection(JOB_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function(err, doc){
        if (err) {
            handleError(res, err.message, "Failed to get job");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/api/contacts/:id", function(req, res){
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(JOB_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if(err){
            handleError(res, err.message, "Failed to get job");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    })
});

app.delete("/api/contacts/:id", function(req, res){
    db.collection(JOB_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
          handleError(res, err.message, "Failed to delete job");
        } else {
          res.status(200).json(req.params.id);
        }
      });
});

// TODO: about, education, certifications, skills, accomplishments, organizations