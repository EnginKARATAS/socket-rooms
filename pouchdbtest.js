var PouchDB = require("pouchdb-node");
var db = new PouchDB("mydb");

db.get("mydoc")
  .then(function (doc) {
    // handle doc
    console.log("hello" + doc);
  })
  .catch(function (err) {
    console.log(err);
  });

db.put({
  _id: "dave@gmail.com",
  name: "David",
  age: 69,
});

db.changes().on("change", function () {
  console.log("Ch-Ch-Changes");
});

db.replicate.to("http://example.com/mydb");
