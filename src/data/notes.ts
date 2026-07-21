export const topicChapters = [
  { id: "commands", title: "MongoDB Commands", icon: "Terminal", desc: "All essential MongoDB shell commands", items: 10 },
  { id: "crud", title: "CRUD Operations", icon: "Database", desc: "Insert, Find, Update, Delete operations", items: 8 },
  { id: "aggregation", title: "Aggregation Pipeline", icon: "BarChart3", desc: "Aggregation stages and examples", items: 6 },
  { id: "regex", title: "Regex Pattern Matching", icon: "Search", desc: "Regular expression queries in MongoDB", items: 9 },
  { id: "indexing", title: "Indexing & Performance", icon: "Zap", desc: "Single, compound, partial indexes", items: 7 },
  { id: "mongoose", title: "Mongoose ODM", icon: "Server", desc: "Schema, Model, CRUD with Mongoose", items: 8 },
  { id: "schema-validation", title: "Schema Validation", icon: "Shield", desc: "Built-in & custom validators", items: 7 },
  { id: "connectivity", title: "Express + MongoDB", icon: "Globe", desc: "Connect MongoDB with Express/React", items: 5 },
];

export const crudExamples = [
  {
    title: "Insert One Document",
    code: `db.student.insertOne({name:"Test", rollno:23})`,
    explanation: "Creates a collection and inserts a single document with name and rollno fields."
  },
  {
    title: "Insert Multiple Documents",
    code: `db.student.insertMany([
  {name:"N1", age:20, status:"Active"},
  {name:"N2", age:24},
  {name:"N3", age:27, status:"Active", city:"Ahmedabad"}
])`,
    explanation: "Inserts multiple documents at once. Documents can have different fields."
  },
  {
    title: "Find with Query & Projection",
    code: `db.student.find({name:"N1"}, {_id:0, age:false})`,
    explanation: "Finds documents matching query and projects only specified fields. 0/false excludes a field."
  },
  {
    title: "Find with Limit & Skip",
    code: `db.student.find({name:"N1"}).limit(1).skip(1)`,
    explanation: "Skips the first matching document and returns the second one."
  },
  {
    title: "Update One Document",
    code: `db.student.updateOne(
  {name:"N1", age:23},
  {$set:{name:"N4", age:11}}
)`,
    explanation: "Updates only the first document matching the filter with new values."
  },
  {
    title: "Update with Upsert",
    code: `db.student.updateOne(
  {age:45},
  {$set:{name:"PQR"}},
  {upsert:true}
)`,
    explanation: "If no document matches age:45, a new document is created (upsert = update + insert)."
  },
  {
    title: "Delete Operations",
    code: `db.student.deleteOne({name:"N1"})  // Deletes first match
db.student.deleteMany({})  // Deletes all documents
db.student.deleteMany({name:"N1"})  // Deletes all matching`,
    explanation: "deleteOne removes first match, deleteMany removes all matching documents."
  },
  {
    title: "Field Update Operators",
    code: `// Increment (increase or decrease)
db.table1.updateMany({}, {$inc:{age:10}})
db.table1.updateMany({}, {$inc:{age:-10}})

// Multiply (10% increase)
db.table1.updateOne({}, {$mul:{age:1.1}})

// Remove a field
db.people.updateOne({age:{$eq:21}}, {$unset:{branch:""}})

// Rename a field
db.people.updateMany({}, {$rename:{name:"uname"}})`,
    explanation: "Update operators: $inc for +/- numbers, $mul for multiply, $unset to remove fields, $rename to rename fields."
  }
];

export const aggregationExamples = [
  {
    title: "Setup: Orders Collection",
    code: `db.orders.insertMany([
  {_id:1, customer:"Nidhi", product:"Laptop", category:"Electronics", amount:55000},
  {_id:2, customer:"Rahul", product:"Mobile", category:"Electronics", amount:25000},
  {_id:3, customer:"Priya", product:"Shoes", category:"Fashion", amount:3000},
  {_id:4, customer:"Amit", product:"T-Shirt", category:"Fashion", amount:1500},
  {_id:5, customer:"Neha", product:"Refrigerator", category:"Electronics", amount:40000},
  {_id:6, customer:"Karan", product:"Watch", category:"Fashion", amount:5000},
  {_id:7, customer:"Riya", product:"Microwave", category:"Electronics", amount:12000}
])`,
    explanation: "Sample orders data for aggregation practice."
  },
  {
    title: "Aggregation: Group by Category",
    code: `db.orders.aggregate([
  {$match:{amount:{$gt:10000}}},
  {$group:{
    _id:"$category",
    AverageAmount:{$avg:"$amount"},
    Total:{$sum:"$amount"},
    Count:{$sum:1}
  }},
  {$sort:{AverageAmount:-1}},
  {$project:{_id:0, category:"$_id", Total:1, Count:1, AverageAmount:1}}
])`,
    explanation: "Filters orders with amount>10000, groups by category, calculates avg/total/count, sorts by avg descending, and reshapes output."
  }
];

export const regexExamples = [
  { title: "Contains 'Test'", code: "db.student.find({name:{$regex:/Test/}})" },
  { title: "Case-insensitive 'test'", code: "db.student.find({name:{$regex:/test/i}})" },
  { title: "Starts with 'A'", code: "db.student.find({name:{$regex:/^A/}})" },
  { title: "Ends with 'Test'", code: "db.student.find({name:{$regex:/Test$/}})" },
  { title: "Starts with digit", code: "db.student.find({name:{$regex:/^[0-9]/}})" },
  { title: "Ends with digit", code: "db.student.find({name:{$regex:/[0-9]$/}})" },
  { title: "Only digits", code: "db.student.find({name:{$regex:/^[0-9]+$/}})" },
  { title: "Only letters", code: "db.student.find({name:{$regex:/^[A-Za-z]+$/}})" },
  { title: "Starts letter, ends digit", code: "db.student.find({name:{$regex:/^[A-Za-z].*[0-9]$/}})" },
  { title: "Starts 'A' or 'R'", code: "db.student.find({name:{$regex:/^(A|R)/}})" },
  { title: "At least one digit", code: "db.student.find({name:{$regex:/[0-9]/}})" },
  { title: "Starts with 2 uppercase", code: "db.student.find({name:{$regex:/^[A-Z]{2}/}})" },
  { title: "Starts letter, ends 3 digits", code: "db.student.find({name:{$regex:/^[A-Za-z]+[0-9]{3}$/}})" },
];

export const indexingExamples = [
  {
    title: "Setup: Student Collection",
    code: `db.student.insertMany([
  {_id:1, name:"ABC", city:"Ahmedabad", age:18, marks:75},
  {_id:2, name:"XYZ", city:"Surat", age:20, marks:82},
  {_id:3, name:"PQR", city:"Ahmedabad", age:19, marks:68},
  {_id:4, name:"ABC", city:"Rajkot", age:21, marks:90},
  {_id:5, name:"XYZ", city:"Ahmedabad", age:20, marks:85},
  {_id:6, name:"LMN", city:"Surat", age:18, marks:60}
])`
  },
  {
    title: "Q1: Simple Index on Age",
    code: `db.student.createIndex({age:1})
db.student.find({age:20}).explain("executionStats")`,
    explanation: "Creates index on age. Query uses IXSCAN, nReturned:2, totalDocsExamined:2"
  },
  {
    title: "Q2: Compound Index on Age + Name",
    code: `db.student.dropIndex("age_1")
db.student.createIndex({age:1, name:1})
db.student.find({age:20, name:"XYZ"}).explain("executionStats")`,
    explanation: "Compound index supports queries on both fields or just the prefix (age). IXSCAN, nReturned:2"
  },
  {
    title: "Q3: Compound Index - Only Name (No Prefix)",
    code: `db.student.find({name:"ABC"}).explain("executionStats")`,
    explanation: "Query on name only (not prefix) results in COLLSCAN, totalDocsExamined:6. The index doesn't support this."
  },
  {
    title: "Q4: Partial Index on Marks > 80",
    code: `db.student.dropIndex("age_1_name_1")
db.student.createIndex(
  {marks:1},
  {partialFilterExpression:{marks:{$gt:80}}}
)
db.student.find({marks:{$gt:80}}).explain("executionStats")`,
    explanation: "Partial index only includes documents with marks>80. IXSCAN, nReturned:3 (82,85,90)"
  },
  {
    title: "Q5: Partial Index - Query Outside Range",
    code: `db.student.find({marks:{$gt:70}}).explain("executionStats")`,
    explanation: "Query for marks>70 falls outside the partial filter (>80), so COLLSCAN, totalDocsExamined:6"
  }
];

export const mongooseExamples = [
  {
    title: "Connect & Insert One Document",
    code: `const mg = require("mongoose");
mg.connect("mongodb://127.0.0.1:27017/lju")
  .then(()=>console.log("success"))
  .catch((err)=>console.error(err));

const mySchema = new mg.Schema({
  name: { type: String, required: true },
  Surname: String,
  age: Number,
  active: Boolean,
  date: { type: Date, default: new Date().toLocaleDateString() }
});

const person = new mg.model("person", mySchema);

const createDoc = async () => {
  try {
    const personData = new person({
      name: "test",
      Surname: "XYZ",
      age: 3,
      active: true
    });
    const result = await personData.save();
    console.log(result);
  } catch (err) {
    console.log("Error Occurred: " + err);
  }
};
createDoc();`,
    explanation: "Connect to MongoDB, define schema, create model, and save a document asynchronously."
  },
  {
    title: "Insert Multiple Documents (Array)",
    code: `const createDoc = async () => {
  try {
    const personData1 = [
      { name: "test", Surname: "test1", age: 33, active: true },
      { name: "hi", Surname: "hi1", age: 30, active: true },
      { name: "hello", Surname: "hello1", age: 37, active: true },
      { name: "hello", Surname: "hello11", age: 37, active: true }
    ];
    const result = await person.insertMany(personData1);
    console.log(result);
  } catch (err) {
    console.log("problem");
  }
};
createDoc();`,
    explanation: "Insert multiple documents using insertMany with an array of objects."
  },
  {
    title: "updateOne, findByIdAndUpdate, findByIdAndDelete",
    code: `const mg = require("mongoose");
mg.connect("mongodb://127.0.0.1:27017/lju1");

const personSchema = new mg.Schema({
  name: String, age: Number, active: Boolean
});
const Person = mg.model("Person", personSchema);

const performOperations = async () => {
  try {
    // Insert
    const personData = new Person({ name: "test", age: 25, active: true });
    await personData.save();

    // Update one
    const result = await Person.updateOne(
      { name: "test" }, { $set: { age: 34, active: false } }, { upsert: true }
    );
    console.log("Update Result:", result);

    // Find one
    const person = await Person.findOne({ name: "test" });
    console.log("Person ID:", person._id);

    // Update by ID
    const updated = await Person.findByIdAndUpdate(
      person._id, { name: "LJU", age: 28, active: true }, { new: true }
    );
    console.log("Updated Person:", updated);

    // Delete by ID
    const deleted = await Person.findByIdAndDelete(person._id);
    if (deleted) console.log("Deleted Person:", deleted);
    else console.log("Person not found");

  } catch (err) { console.error(err); }
};
performOperations();`,
    explanation: "Demonstrates updateOne (query-based), findByIdAndUpdate (ID-based with {new:true}), and findByIdAndDelete."
  }
];

export const validationExamples = [
  {
    title: "Complete Schema with Validations",
    code: `const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/validations")
  .then(()=>console.log("Connected"))
  .catch((err)=>console.log(err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [4, "Minimum 4 characters"],
    maxlength: [20, "Maximum 20 characters"],
    trim: true,
    uppercase: true,
    match: [/^[A-Za-z]+[0-9]+$/, "Must start with letters and end with digits"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid Email Address"]
  },
  age: {
    type: Number,
    min: [18, "Minimum age is 18"],
    max: [65, "Maximum age is 65"]
  },
  gender: {
    type: String,
    lowercase: true,
    enum: ["male", "female"]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  product: {
    type: String,
    validate: [validator.isAlphanumeric, "Must be alphanumeric"]
  }
});

const User = mongoose.model("User", userSchema);

const createDoc = async () => {
  try {
    const user = new User({
      username: "nidhi123",
      email: "nidhi@gmail.com",
      age: 28,
      gender: "FEMALE",
      product: "Laptop123"
    });
    const result = await user.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
createDoc();`,
    explanation: "Complete validation example with required, min/max length, trim, uppercase, regex match, unique, enum, default, and custom validator package."
  }
];

export const connectivityExamples = [
  {
    title: "Express + MongoDB Form (task.js)",
    code: `// task.js
var expr = require("express");
var app = expr();
const mg = require("mongoose");

mg.connect("mongodb://127.0.0.1:27017/login")
  .then(()=>console.log("Successful"))
  .catch((err)=>console.error(err));

mg.pluralize(null);
const myschema = new mg.Schema({
  uname: { type: String, required: true },
  password: { type: String, required: true }
});
const person = new mg.model("data1", myschema);

app.use(expr.static(__dirname, { index: "form.html" }));

app.get("/process_get", async (req, res) => {
  const personData = new person({
    uname: req.query.uname,
    password: req.query.pwd
  });
  await personData.save();
  res.send("Record inserted");
});
app.listen(6000);`,
    explanation: "Server serves an HTML form and saves submitted username/password to MongoDB."
  },
  {
    title: "HTML Form (form.html)",
    code: `<html>
  <form action="/process_get" method="get">
    Username: <input type="text" name="uname"/>
    <br/> Password: <input type="password" name="pwd"/>
    <br/> <input type="submit"/>
  </form>
</html>`,
    explanation: "Simple HTML form that sends GET request to the Express server."
  },
  {
    title: "React + Express + MongoDB (Client.jsx)",
    code: `import { useState } from 'react';
import axios from 'axios';

function Client() {
  const [username, setUsername] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', { username });
      alert('Welcome ' + username);
      setUsername('');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <button type="submit">Sign Up</button>
        <h1>{username}</h1>
      </form>
    </div>
  );
}
export default Client;`,
    explanation: "React component that sends username to Express server via POST request."
  },
  {
    title: "Express Backend (server.js)",
    code: `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/reactconnect');

const UserSchema = new mongoose.Schema({ username: String });
const User = new mongoose.model('User', UserSchema);

app.post('/signup', async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = new User({ username });
    await newUser.save();
    res.send();
  } catch (error) {
    res.send(error);
  }
});

app.listen(5000);`,
    explanation: "Express server with CORS, JSON parsing, and POST endpoint to save user to MongoDB."
  }
];
