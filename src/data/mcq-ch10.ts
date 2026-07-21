import { MCQ } from "./mcq-ch9";

export interface DescriptiveQ {
  id: number;
  question: string;
  marks: number;
  solution?: string;
  explanation?: string;
}

export const mcqCh10: MCQ[] = [
  {
    id: 1,
    question: "Identify correct query returning documents having surname 6-10 letters only.",
    options: ["db.student.find({surname:{$regex:/[A-z]{6,10}/}})", "db.student.find({surname:{$regex:/^[A-Za-z]{6,10}$/}})", "db.student.find({surname:{$regex:/^\d{6,10}$/}})", "db.student.find({surname:{$regex:/[A-Za-z]{6,10}/}})"],
    answer: "db.student.find({surname:{$regex:/^[A-Za-z]{6,10}$/}})",
    reason: "",
  },
  {
    id: 2,
    question: "_____ property is used to remove leading and trailing spaces from a string field.",
    options: ["remove_space", "validate", "trim", "rm_space"],
    answer: "trim",
    reason: "",
  },
  {
    id: 3,
    question: "Consider student: [{_id:123433,name:'SSS',age:22},{_id:123434,name:'YYY',age:2},{_id:123435,name:'PPP',age:22}]. Simple index on age. db.student.find({age:22}).explain('executionStats') — identify stage,docExamined,nReturned",
    options: ["stage:IXSCAN, docExamined:2, nReturned:2", "stage:IXSCAN, docExamined:3, nReturned:2", "stage:COLLSCAN, docExamined:1, nReturned:1", "stage:COLLSCAN, docExamined:1, nReturned:2"],
    answer: "stage:IXSCAN, docExamined:2, nReturned:2",
    reason: "",
  },
  {
    id: 4,
    question: "Same student collection. Compound index on {age,name}. db.student.find({name:'YYY'}).explain('executionStats') — identify values",
    options: ["stage:COLLSCAN, docExamined:3, nReturned:1", "stage:COLLSCAN, docExamined:1, nReturned:1", "stage:IXSCAN, docExamined:1, nReturned:1", "stage:IXSCAN, docExamined:3, nReturned:1"],
    answer: "stage:COLLSCAN, docExamined:3, nReturned:1",
    reason: "",
  },
  {
    id: 5,
    question: "By default indexing is always applied on ____ field.",
    options: ["1st field of table", "Last field of table", "_id field maintained by default", "All of the above"],
    answer: "_id field maintained by default",
    reason: "",
  },
  {
    id: 6,
    question: "____ property restricts values while defining schema of a collection.",
    options: ["in", "valid", "enum", "list"],
    answer: "enum",
    reason: "",
  },
  {
    id: 7,
    question: "_____ command deletes a document by _id field and shows it after deletion.",
    options: ["findAndDelete()", "findByIdAndDelete()", "delete()", "findByIdAndDrop()"],
    answer: "findByIdAndDelete()",
    reason: "",
  },
  {
    id: 8,
    question: "Consider people: [{_id:1,name:'Test1',age:22},{_id:2,name:'Test2',age:21},{_id:3,name:'Test3',age:20}]. Simple index on age. db.people.find({age:20}).explain('executionStats') — identify values",
    options: ["stage:IXSCAN, docExamined:2, nReturned:2", "stage:IXSCAN, docExamined:3, nReturned:2", "stage:IXSCAN, docExamined:1, nReturned:1", "stage:COLLSCAN, docExamined:2, nReturned:1"],
    answer: "stage:IXSCAN, docExamined:1, nReturned:1",
    reason: "",
  },
  {
    id: 9,
    question: "Correct code to match a string beginning with 'Bharat' only.",
    options: ["db.state.find({name:{$regex:/Bharat+/i}})", "db.state.find({name:{$regex:/Bharat/i}})", "db.state.find({$regex:{name:/^Bharat/}})", "db.state.find({name:{$regex:/^Bharat/}})"],
    answer: "db.state.find({name:{$regex:/^Bharat/}})",
    reason: "",
  },
  {
    id: 10,
    question: "Which statement is true about insertMany method?",
    options: ["Inserts multiple docs in single op", "Used to delete documents", "Upserts a single document", "Only in Atlas"],
    answer: "It inserts multiple documents into a collection in a single operation.",
    reason: "",
  },
  {
    id: 11,
    question: "Create compound index on product_id (asc) and sale_date (desc) in sales collection.",
    options: ["db.sales.createIndex({product_id:1,sale_date:-1})", "db.sales.createIndex({product_id:1,sale_date:1})", "db.sales.createIndex({product_id:1},{sale_date:-1})", "db.sales.createIndex({product_id:1,sale_date:-1})"],
    answer: "db.sales.createIndex({product_id:1,sale_date:-1})",
    reason: "",
  },
];

export const descriptiveCh10: DescriptiveQ[] = [
  {
    id: 1, marks: 4,
    question: "Write an Express JS script to insert a document in database using Mongoose.",
    solution: `const mongoose = require("mongoose");

// 1. Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mydb")
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));

// 2. Define Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

// 3. Create Model
const User = mongoose.model("User", userSchema);

// 4. Insert a document
const newUser = new User({
  name: "John",
  age: 25,
  email: "john@example.com"
});

newUser.save()
  .then(result => console.log("Inserted:", result))
  .catch(err => console.log(err));`,
    explanation: `mongoose.connect() establishes a connection to the local MongoDB server. The Schema constructor defines the structure of documents. mongoose.model() creates a model based on the schema. new User() creates a document instance. .save() persists the document to the database.`
  },
  {
    id: 2, marks: 3,
    question: "Explain stepwise process to connect with Mongoose and insert a document.",
    solution: `// Step 1: Install mongoose
// npm install mongoose

// Step 2: Import mongoose
const mongoose = require("mongoose");

// Step 3: Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mydb");

// Step 4: Define Schema
const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// Step 5: Create Model
const Student = mongoose.model("Student", StudentSchema);

// Step 6: Create and Save Document
const s1 = new Student({ name: "Rahul", age: 20 });
s1.save();

// Alternative: Using create()
Student.create({ name: "Priya", age: 22 });`,
    explanation: `Steps: 1) Install mongoose package. 2) Import it in your script. 3) Connect to MongoDB using connect(). 4) Define a schema using mongoose.Schema(). 5) Create a model from schema using mongoose.model(). 6) Create document instances and call save() or use Model.create().`
  },
  {
    id: 3, marks: 4,
    question: "Create a schema using Schema() with name, surname, age, active, date. Name required string. Age numeric. Active boolean. Date default today.",
    solution: `const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: String,
  age: Number,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);`,
    explanation: `name uses {type:String, required:true} — required ensures the field must be provided. surname and age use shorthand types String and Number. active is Boolean. date uses {type:Date, default:Date.now} — if no value is provided, the current date is automatically assigned.`
  },
  {
    id: 4, marks: 3,
    question: "How can we enter multiple documents in a database using Express JS?",
    solution: `const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mydb");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number
});
const Item = mongoose.model("Item", itemSchema);

// Method 1: insertMany()
Item.insertMany([
  { name: "Laptop", price: 55000 },
  { name: "Mouse", price: 999 },
  { name: "Keyboard", price: 2499 }
]).then(result => console.log("Inserted:", result));

// Method 2: create() with array
Item.create([
  { name: "Monitor", price: 12000 },
  { name: "USB Hub", price: 799 }
]);

// Method 3: Loop with save()
const items = [{ name: "A", price: 100 }, { name: "B", price: 200 }];
items.forEach(item => new Item(item).save());`,
    explanation: `insertMany() inserts an array of documents in a single operation — fastest method. create() also accepts an array and returns promises. Looping with save() inserts one at a time (slower). insertMany is preferred for bulk inserts.`
  },
  {
    id: 5, marks: 4,
    question: "Consider student: [{name:'SSS',age:22},{name:'YYY',age:2},{name:'PPP',age:32}]. (1)Update name='JJJ',age=40 where age=20, upsert (2)Retrieve age,name of 'YYY' & 'SSS' excluding _id.",
    solution: `// (1) Upsert: update where age=20, insert if not found
db.student.updateOne(
  { age: 20 },
  { $set: { name: "JJJ", age: 40 } },
  { upsert: true }
)
// No document has age=20, so a NEW document is created:
// { name: "JJJ", age: 40, ... }

// (2) Retrieve age,name of "YYY" and "SSS", exclude _id
db.student.find(
  { name: { $in: ["YYY", "SSS"] } },
  { age: 1, name: 1, _id: 0 }
)`,
    explanation: `updateOne with upsert:true searches for age=20. If found, it updates. If NOT found, it inserts a new document combining the filter and the $set values. $in matches documents where name is any of the listed values. Projection {age:1,name:1,_id:0} returns only age,name without _id.`
  },
  {
    id: 6, marks: 4,
    question: "Write script with schema: name,age,gender,email. Validations: (1)name trim, min 3 max 10 (2)age 1-100 (3)email validation (4)gender lowercase 'male'/'female' only.",
    solution: `const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 10
  },
  age: {
    type: Number,
    min: 1,
    max: 100
  },
  gender: {
    type: String,
    lowercase: true,
    enum: ["male", "female"]
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  }
});

const Person = mongoose.model("Person", personSchema);`,
    explanation: `trim removes whitespace from both ends. minlength/maxlength restricts string length. min/max on Number restricts numeric range. lowercase converts the value to lowercase automatically. enum restricts values to an allowed set. match applies a regex for email validation.`
  },
  {
    id: 7, marks: 4,
    question: "Consider student data. (1)Names starting with digit (2)Surname exactly 4 letters (3)Names youngest to oldest (4)Names 3-10 letters, no digits/underscore.",
    solution: `// (1) Names starting with a digit
db.student.find({ name: { $regex: /^[0-9]/ } })

// (2) Surname exactly 4 letters
db.student.find({ surname: { $regex: /^[A-Za-z]{4}$/ } })

// (3) Names from youngest to oldest (ascending by age)
db.student.find().sort({ age: 1 })

// (4) Names with 3-10 letters, no digits or underscore
db.student.find({
  name: { $regex: /^[A-Za-z]{3,10}$/ }
})`,
    explanation: `$regex with ^[0-9] matches strings starting with a digit. ^[A-Za-z]{4}$ matches exactly 4 alphabetic characters (^=start, $=end). sort({age:1}) sorts ascending (youngest first). ^[A-Za-z]{3,10}$ matches 3-10 alphabetic chars only — digits and underscore are excluded by the character class.`
  },
  {
    id: 8, marks: 5,
    question: "Write Node.js script to insert 4 documents simultaneously. Schema: name(string), surname(string), age(Number), active(Boolean).",
    solution: `const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("Connected"));

const schema = new mongoose.Schema({
  name: String,
  surname: String,
  age: Number,
  active: Boolean
});

const Model = mongoose.model("Collection", schema);

// Insert 4 documents simultaneously
Model.insertMany([
  { name: "Rahul", surname: "Patel", age: 22, active: true },
  { name: "Priya", surname: "Shah", age: 21, active: true },
  { name: "Amit", surname: "Desai", age: 23, active: false },
  { name: "Neha", surname: "Joshi", age: 20, active: true }
]).then(result => {
  console.log("Inserted", result.length, "documents");
  mongoose.connection.close();
}).catch(err => console.log(err));`,
    explanation: `mongoose.connect() connects to local MongoDB. Schema defines the structure with four fields. mongoose.model() creates a model. insertMany() takes an array of 4 documents and inserts them in one batch operation. The .then() callback receives the result and closes the connection.`
  },
  {
    id: 9, marks: 4,
    question: "Consider student: [{name:'DDD',age:32},{name:'BBB',age:20},{name:'AAA',age:10}]. (1)Create index for find({age:{$gt:15},name:'BBB'}) returning nReturned=1,docExamined=1 (2)Subset index for age>30.",
    solution: `// (1) Compound index on { age: 1, name: 1 }
// This enables IXSCAN for the query
db.student.createIndex({ age: 1, name: 1 })

// Query that uses the index:
db.student.find({ age: { $gt: 15 }, name: "BBB" }).explain("executionStats")
// Result: stage=IXSCAN, nReturned=1, docExamined=1

// (2) Partial (subset) index for documents with age > 30
db.student.createIndex(
  { age: 1 },
  { partialFilterExpression: { age: { $gt: 30 } } }
)

// Query that uses partial index:
db.student.find({ age: { $gt: 30 } }).explain("executionStats")`,
    explanation: `A compound index on {age:1,name:1} allows the query to use IXSCAN — scanning only the index instead of all documents. nReturned=1 means 1 document matched. docExamined=1 means only 1 document was examined (the index pointed directly to it). A partialFilterExpression creates an index that only includes documents satisfying the filter.`
  },
  {
    id: 10, marks: 3,
    question: "How COLLSCAN and IXSCAN differ in terms of indexing? How is it determined?",
    solution: `// COLLSCAN = Collection Scan
// MongoDB scans every document in the collection
// Used when NO suitable index exists for the query
// Performance: O(n) — slow for large collections

// Example causing COLLSCAN:
db.student.find({ name: "BBB" }).explain()
// stage: "COLLSCAN", docsExamined: 100000

// IXSCAN = Index Scan
// MongoDB scans only the index, then fetches matching docs
// Used when a suitable index EXISTS for the query
// Performance: O(log n) — fast even for large collections

// Example using IXSCAN:
db.student.createIndex({ name: 1 })
db.student.find({ name: "BBB" }).explain()
// stage: "IXSCAN", docsExamined: 1

// How it's determined:
// MongoDB's query optimizer evaluates all possible query plans
// It selects the plan with the lowest estimated cost
// If no index covers the query fields → COLLSCAN
// If an index covers the query → IXSCAN (or FETCH + IXSCAN)`,
    explanation: `COLLSCAN reads every document in the collection — slow but unavoidable without indexes. IXSCAN reads only the index entries and then fetches matching documents — much faster. MongoDB's query planner automatically chooses between them based on available indexes. Use .explain() to see which plan was chosen.`
  },
  {
    id: 11, marks: 3,
    question: "How $regex operator is used to filter values. Explain with example.",
    solution: `// $regex allows pattern matching on string fields

// 1. Find names starting with 'A'
db.student.find({ name: { $regex: /^A/ } })

// 2. Find names ending with 'n'
db.student.find({ name: { $regex: /n$/ } })

// 3. Find names containing 'patel' (case insensitive)
db.student.find({ name: { $regex: /patel/i } })

// 4. Find names exactly 5 letters long
db.student.find({ name: { $regex: /^[A-Za-z]{5}$/ } })

// 5. Find names starting with a digit
db.student.find({ name: { $regex: /^[0-9]/ } })

// 6. Find emails from gmail
db.student.find({ email: { $regex: /@gmail\.com$/ } })

// Using $options for case insensitivity:
db.student.find({ name: { $regex: "patel", $options: "i" } })`,
    explanation: `$regex uses JavaScript regular expressions. ^ anchors to the start, $ to the end. i flag makes it case-insensitive. Character classes like [A-Za-z] match alphabetic chars, [0-9] match digits. {n} matches exactly n repetitions. Combine $regex with indexes for performance.`
  },
  {
    id: 12, marks: 5,
    question: "Write Node.js script: schema name,surname,email,password,city. (1)name required (2)surname lowercase (3)email validation (4)password 8-12 (5)city enum 'baroda','surat','ahmedabad'.",
    solution: `const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/testdb");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  surname: {
    type: String,
    lowercase: true
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 12
  },
  city: {
    type: String,
    enum: ["baroda", "surat", "ahmedabad"]
  }
});

const User = mongoose.model("User", userSchema);
new User({
  name: "Rahul",
  surname: "PATEL",
  email: "rahul@test.com",
  password: "secret123",
  city: "ahmedabad"
}).save();`,
    explanation: `required validates that the field exists — the array form provides a custom error message. lowercase:true converts input to lowercase before saving. match validates against a regex pattern. minlength/maxlength restrict password length. enum restricts city to an allowed set of values.`
  },
  {
    id: 13, marks: 5,
    question: "Create login form (username,password,submit). On submit store in DB using Mongoose and Express. Write all files.",
    solution: `// File: server.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/logindb");

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model("User", userSchema);

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save()
    .then(() => res.send("Login data saved!"))
    .catch(err => res.send("Error: " + err));
});

app.listen(3000, () => console.log("Server on port 3000"));

// File: public/index.html
<!-- <form action="/login" method="POST">
  <input type="text" name="username" placeholder="Username" required>
  <input type="password" name="password" placeholder="Password" required>
  <button type="submit">Submit</button>
</form> -->`,
    explanation: `Express serves the HTML form and handles POST /login. The form data is captured with express.urlencoded() middleware. A new User document is created from req.body fields and saved with .save(). The server responds with a success or error message.`
  },
  {
    id: 14, marks: 5,
    question: "Write React + Node/Express program for full stack connectivity. Text field + submit button, insert record in DB.",
    solution: `// File: server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fullstack");

const dataSchema = new mongoose.Schema({ text: String });
const Data = mongoose.model("Data", dataSchema);

app.post("/api/save", (req, res) => {
  new Data({ text: req.body.text }).save()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.listen(5000);

// File: App.js (React)
/*
import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    axios.post("http://localhost:5000/api/save", { text })
      .then(res => {
        alert("Saved: " + res.data._id);
        setText("");
      })
      .catch(err => alert("Error"));
  };

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)}
             placeholder="Enter text" />
      <button onClick={handleSubmit}>Submit to DB</button>
    </div>
  );
}
*/`,
    explanation: `Express backend with cors() allows cross-origin requests from React. POST /api/save receives {text} from the request body and saves it to MongoDB. React frontend uses axios to send the input value to the server. The server returns the saved document including its _id.`
  },
  {
    id: 15, marks: 5,
    question: "Consider student data. (1)Retrieve records with 'BBB' as substring in name using text index. Predict nReturned & docsExamined. (2)Create index returning nReturned=2,docExamined=2 for age>15",
    solution: `// (1) Text index for substring search
db.student.createIndex({ name: "text" })

db.student.find({ $text: { $search: "BBB" } }).explain("executionStats")
// nReturned: 2  (documents with "BBB" in name: "BBB", "AAA BBB")
// docsExamined: 2

// Alternative using $regex:
db.student.find({ name: { $regex: /BBB/ } })

// (2) Simple index for age > 15 with nReturned=2, docsExamined=2
db.student.createIndex({ age: 1 })

db.student.find({ age: { $gt: 15 } }).explain("executionStats")
// nReturned: 2  (ages 32 and 20)
// docsExamined: 2 (only index entries are examined)`,
    explanation: `A text index enables $text search which is efficient for substring matching. nReturned=2 because "BBB" and "AAA BBB" both contain "BBB". docsExamined=2 means only 2 documents were read from disk — the index correctly limited the scan. A simple index on {age:1} allows the age query to use IXSCAN.`
  },
  {
    id: 16, marks: 5,
    question: "Create React form: Name,Rollno,totalmarks. On submit save in MongoDB database 'student'.",
    solution: `// File: server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/student");

const studentSchema = new mongoose.Schema({
  name: String, rollno: String, totalmarks: Number
});
const Student = mongoose.model("Student", studentSchema);

app.post("/api/students", (req, res) => {
  new Student(req.body).save()
    .then(r => res.json(r)).catch(e => res.status(500).json(e));
});

app.listen(5000);

// File: App.js (React)
/*
import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", rollno: "", totalmarks: "" });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    axios.post("http://localhost:5000/api/students", form)
      .then(() => { alert("Saved!"); setForm({ name: "", rollno: "", totalmarks: "" }); })
      .catch(() => alert("Error"));
  };
  return (
    <div>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="rollno" value={form.rollno} onChange={handleChange} placeholder="Roll No" />
      <input name="totalmarks" value={form.totalmarks} onChange={handleChange} placeholder="Total Marks" />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
*/`,
    explanation: `React form uses controlled inputs with useState. On submit, axios sends the form data to Express server. Server saves to MongoDB using Mongoose. The student collection stores name, rollno, and totalmarks for each submission.`
  },
  {
    id: 17, marks: 4,
    question: "Create form with username and submit button using .html file. On submit insert value in DB. (.html and .js files required)",
    solution: `<!-- File: public/index.html -->
<!DOCTYPE html>
<html>
<body>
  <h2>Enter Username</h2>
  <form action="/save" method="POST">
    <input type="text" name="username" placeholder="Username" required>
    <button type="submit">Submit</button>
  </form>
</body>
</html>

// File: server.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/testdb");

const userSchema = new mongoose.Schema({ username: String });
const User = mongoose.model("User", userSchema);

app.post("/save", (req, res) => {
  new User({ username: req.body.username }).save()
    .then(() => res.send("Username saved: " + req.body.username))
    .catch(err => res.send("Error: " + err));
});

app.listen(3000);`,
    explanation: `The HTML form submits via POST to /save. Express parses the form body with urlencoded() middleware. A new User document is created with the submitted username and saved to MongoDB. The server responds with a confirmation message.`
  },
  {
    id: 18, marks: 3,
    question: "Node.js script: schema name,age,gender. Validations: (1)name required, min 4 max 12 (2)age 1-35 (3)gender uppercase 'MALE'/'FEMALE'.",
    solution: `const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 12
  },
  age: {
    type: Number,
    min: 1,
    max: 35
  },
  gender: {
    type: String,
    uppercase: true,
    enum: ["MALE", "FEMALE"]
  }
});

const Model = mongoose.model("Person", schema);`,
    explanation: `required:true ensures name is provided. minlength:4 and maxlength:12 restrict name length. min:1 and max:35 restrict age range. uppercase:true converts gender to uppercase automatically. enum restricts to allowed values "MALE" or "FEMALE".`
  },
  {
    id: 19, marks: 3,
    question: "Script with 'NAME' text field and submit button in Form.js. On submit insert value in DB 'mydb'. (React MongoDB Connectivity)",
    solution: `// File: server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/mydb");

const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemSchema);

app.post("/api/items", (req, res) => {
  new Item({ name: req.body.name }).save()
    .then(r => res.json(r)).catch(e => res.status(500).json(e));
});

app.listen(5000);

// File: Form.js (React)
/*
import { useState } from "react";
import axios from "axios";

function Form() {
  const [name, setName] = useState("");
  const handleSubmit = () => {
    axios.post("http://localhost:5000/api/items", { name })
      .then(() => { alert("Saved!"); setName(""); })
      .catch(() => alert("Error"));
  };
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="NAME" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
*/`,
    explanation: `Form.js sends the name value to Express via POST /api/items. Express saves {name: req.body.name} to mydb database in the items collection. The server returns the saved document. React clears the input and shows a success alert.`
  },
  {
    id: 20, marks: 5,
    question: "Consider citizens data. Insert in 'userdata' under 'maindata'. (1)Insert category 'SeniorCitizen' for age>60. (2)Count docs with age between 30 and 60.",
    solution: `// Switch to maindata database and insert data
use maindata
db.userdata.insertMany([
  { _id: 123433, name: "DD", surname: "abc", age: 61 },
  { _id: 123434, name: "LL", surname: "def", age: 38 },
  { _id: 123435, name: "KK", surname: "pqr", age: 29 },
  { _id: 123436, name: "ZZ", surname: "xyz", age: 62 }
])

// (1) Insert category "SeniorCitizen" for age > 60
db.userdata.updateMany(
  { age: { $gt: 60 } },
  { $set: { category: "SeniorCitizen" } }
)

// (2) Count documents with age between 30 and 60
db.userdata.countDocuments({
  age: { $gte: 30, $lte: 60 }
})`,
    explanation: `use maindata switches to the target database. insertMany adds the four citizen documents. updateMany with $set adds a new "category" field to documents where age>60. countDocuments with $gte and $lte counts documents where age is between 30 and 60 inclusive.`
  },
  {
    id: 21, marks: 5,
    question: "Consider movie collection. (1)Subset index for movies after 2000. (2)Command to get IXSCAN for release_year query.",
    solution: `// (1) Subset (partial) index: only movies after 2000
db.movie.createIndex(
  { release_year: 1 },
  { partialFilterExpression: { release_year: { $gt: 2000 } } }
)

// (2) Query that uses the index (IXSCAN):
db.movie.find({ release_year: { $gt: 2000 } }).explain("executionStats")
// stage: "IXSCAN"
// Documents matching: Inception (2010), The Avengers (2012)

// Query that does NOT use the index (COLLSCAN):
db.movie.find({ release_year: 1999 }).explain("executionStats")
// stage: "COLLSCAN" (1999 is not in the partial index)

// Alternative: create a regular index for all years
db.movie.createIndex({ release_year: 1 })
db.movie.find({ release_year: { $gt: 2000 } }).explain("executionStats")
// stage: "IXSCAN"`,
    explanation: `A partialFilterExpression index only stores documents matching the condition. The index on release_year with {$gt:2000} includes only movies released after 2000. Querying for {$gt:2000} uses IXSCAN because the query matches the index filter. Querying for 1999 uses COLLSCAN because 1999 is outside the partial index.`
  },
  {
    id: 22, marks: 5,
    question: "Node.js script: schema name,age,gender,email. (1)name trim, min 3 max 10, lowercase (2)age>0 (3)email validation (4)gender uppercase 'MALE'/'FEMALE'.",
    solution: `const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/testdb");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 10,
    lowercase: true
  },
  age: {
    type: Number,
    validate: {
      validator: v => v > 0,
      message: "Age must be > 0"
    }
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  },
  gender: {
    type: String,
    uppercase: true,
    enum: ["MALE", "FEMALE"]
  }
});

const Person = mongoose.model("Person", schema);
new Person({
  name: "  Rahul  ",
  age: 22,
  email: "rahul@test.com",
  gender: "male"
}).save();
// name is saved as "rahul" (trimmed and lowercased)
// gender is saved as "MALE" (uppercased)`,
    explanation: `trim removes leading/trailing spaces. lowercase/uppercase transform case automatically. minlength/maxlength restrict string length. validate with a custom function checks age>0 and returns a custom message on failure. match applies email regex. enum restricts gender to allowed values.`
  },
  {
    id: 23, marks: 5,
    question: "Node.js script: schema Firstname,age,email,citychoice. Insert doc in 'applicant' under 'applicantdata'. (1)Firstname trim, min 3 max 10 (2)age 18-30 (3)email validation (4)citychoice uppercase 'AHMEDABAD','PUNE','BANGALORE'.",
    solution: `const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/applicantdata");

const schema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 10
  },
  age: {
    type: Number,
    min: 18,
    max: 30
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  },
  citychoice: {
    type: String,
    uppercase: true,
    trim: true,
    enum: ["AHMEDABAD", "PUNE", "BANGALORE"]
  }
});

const Applicant = mongoose.model("applicant", schema);
new Applicant({
  Firstname: "  Raj  ",
  age: 25,
  email: "raj@test.com",
  citychoice: "  ahmedabad  "
}).save();
// citychoice stored as "AHMEDABAD" (trimmed + uppercased)`,
    explanation: `Firstname uses trim to remove spaces, minlength/maxlength for length validation. age uses min/max to enforce 18-30 range. email uses match with regex. citychoice uses uppercase:true and enum for case-insensitive validation — user input "ahmedabad" is stored as "AHMEDABAD".`
  },
  {
    id: 24, marks: 3,
    question: "Consider faculty data. (1)Update name='DEF',age=32 where subject='JAVA-2', upsert. (2)Retrieve name,age where age>28 and age<=30.",
    solution: `// (1) Upsert: update name="DEF", age=32 where subject="JAVA-2"
db.faculty.updateOne(
  { subject: "JAVA-2" },
  { $set: { name: "DEF", age: 32 } },
  { upsert: true }
)
// No document has subject "JAVA-2", so a NEW document is inserted

// (2) Retrieve name,age where age > 28 AND age <= 30
db.faculty.find(
  { age: { $gt: 28, $lte: 30 } },
  { name: 1, age: 1, _id: 0 }
)
// Returns: {name: "XYZ", age: 29}`,
    explanation: `upsert:true inserts a new document when no match is found. The $set operator defines the fields for both update and insert. $gt and $lte can be combined in a single filter object — MongoDB ANDs them automatically. Projection {name:1,age:1,_id:0} returns only name and age.`
  },
  {
    id: 25, marks: 5,
    question: "Create React form: Employee Name, Employee ID, Salary, Department. Save in MongoDB 'company', collection 'employees'. Display saved employees in table.",
    solution: `// File: server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/company");

const empSchema = new mongoose.Schema({
  name: String, empId: String, salary: Number, department: String
});
const Employee = mongoose.model("employees", empSchema);

app.post("/api/employees", (req, res) => {
  new Employee(req.body).save().then(r => res.json(r));
});
app.get("/api/employees", (req, res) => {
  Employee.find().then(r => res.json(r));
});
app.listen(5000);

// File: App.js (React)
/*
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", empId: "", salary: "", department: "" });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees").then(r => setEmployees(r.data));
  }, []);

  const handleSubmit = () => {
    axios.post("http://localhost:5000/api/employees", form)
      .then(() => {
        axios.get("http://localhost:5000/api/employees").then(r => setEmployees(r.data));
        setForm({ name: "", empId: "", salary: "", department: "" });
      });
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      <input name="empId" placeholder="ID" value={form.empId} onChange={e => setForm({...form, empId: e.target.value})} />
      <input name="salary" placeholder="Salary" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} />
      <input name="department" placeholder="Dept" value={form.department} onChange={e => setForm({...form, department: e.target.value})} />
      <button onClick={handleSubmit}>Save</button>

      <h2>Employees</h2>
      <table border="1"><thead><tr><th>Name</th><th>ID</th><th>Salary</th><th>Dept</th></tr></thead>
        <tbody>{employees.map(e => <tr key={e._id}><td>{e.name}</td><td>{e.empId}</td><td>{e.salary}</td><td>{e.department}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
*/`,
    explanation: `Express provides POST /api/employees to save and GET /api/employees to retrieve all records. React fetches all employees on mount via useEffect. After submitting a new employee, the app re-fetches the list to update the table. The table displays all employees with their details.`
  },
  {
    id: 26, marks: 5,
    question: "Course Enrollment System: React form with Student Name, Course Name, Email. Save in MongoDB 'courseDB'. Prevent duplicate enrollments.",
    solution: `// File: server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/courseDB");

const enrollSchema = new mongoose.Schema({
  studentName: String,
  courseName: String,
  email: String
});

// Compound unique index prevents duplicates
enrollSchema.index({ email: 1, courseName: 1 }, { unique: true });

const Enrollment = mongoose.model("enrollments", enrollSchema);

app.post("/api/enroll", async (req, res) => {
  try {
    const result = await Enrollment.create(req.body);
    res.json(result);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: "Duplicate enrollment not allowed" });
    } else {
      res.status(500).json(err);
    }
  }
});

app.get("/api/enrollments", (req, res) => {
  Enrollment.find().then(r => res.json(r));
});

app.listen(5000);

// React frontend similar to previous examples with Student Name, Course Name, Email fields`,
    explanation: `A compound unique index on {email:1, courseName:1} ensures no student can enroll in the same course twice. Mongoose's create() throws error code 11000 on duplicate. The server catches this and returns a clear "Duplicate enrollment not allowed" message instead of a raw error.`
  },
  {
    id: 27, marks: 5,
    question: "Consider products. (1)Compound index on category,price. (2)Query category='Electronics', price<60000. (3)Explain values.",
    solution: `// (1) Create compound index
db.products.createIndex({ category: 1, price: 1 })

// (2) Query
db.products.find({
  category: "Electronics",
  price: { $lt: 60000 }
})

// (3) Explain execution stats
db.products.find({
  category: "Electronics",
  price: { $lt: 60000 }
}).explain("executionStats")

// Expected output values:
// stage: "IXSCAN"
// nReturned: 1 (only Mobile: 30000 matches)
// docsExamined: 1
// totalKeysExamined: 1
// indexName: "category_1_price_1"`,
    explanation: `The compound index on {category:1, price:1} covers the query exactly. MongoDB uses the index to first match "Electronics" then apply price<60000. Only "Mobile" (price 30000) satisfies both conditions. nReturned=1 and docsExamined=1 confirm the index is efficient — no unnecessary documents were scanned.`
  },
  {
    id: 28, marks: 5,
    question: "Create collection product. (1)Partial index for stock>15. (2)Query stock>15 with explain. (3)Compound index category,price. (4)Query Elec price<50000 with explain.",
    solution: `// (1) Partial index for documents with stock > 15
db.product.createIndex(
  { stock: 1 },
  { partialFilterExpression: { stock: { $gt: 15 } } }
)

// (2) Query stock > 15 with explain
db.product.find({ stock: { $gt: 15 } }).explain("executionStats")
// stage: "IXSCAN"
// nReturned: 2 (Mobile stock=20, Chair stock=50)
// docsExamined: 2

// (3) Compound index on category and price
db.product.createIndex({ category: 1, price: 1 })

// (4) Query Electronics with price < 50000
db.product.find({
  category: "Electronics",
  price: { $lt: 50000 }
}).explain("executionStats")
// stage: "IXSCAN"
// nReturned: 1 (Mobile: 30000)
// docsExamined: 1`,
    explanation: `The partial index on stock includes only documents where stock>15. Querying stock>15 uses this index via IXSCAN. The compound index {category:1, price:1} covers the second query. "Mobile" (category=Electronics, price=30000) is the only match. Both queries show efficient index usage with docsExamined = nReturned.`
  },
  {
    id: 29, marks: 5,
    question: "Node.js script: schema name,age. (1)name trim, lowercase, allowed 'abc','def','pqr','xyz', max 10. (2)age 1-100.",
    solution: `const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/testdb");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 10,
    enum: ["abc", "def", "pqr", "xyz"]
  },
  age: {
    type: Number,
    min: 1,
    max: 100
  }
});

const Model = mongoose.model("Test", schema);

// Valid insert:
new Model({ name: "  ABC  ", age: 25 }).save()
// name saved as "abc" (trimmed + lowered)

// Invalid insert (will fail):
new Model({ name: "invalid", age: 25 }).save()
// ValidationError: name is not a valid enum value`,
    explanation: `enum restricts name to exactly "abc","def","pqr","xyz". trim removes spaces. lowercase converts to lowercase — so user input "ABC" becomes "abc" which matches the enum. maxlength:10 limits length. min:1 and max:100 restrict age range. Invalid values cause Mongoose validation errors.`
  },
];

