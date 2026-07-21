export interface MCQ {
  id: number;
  question: string;
  options: string[];
  answer: string;
  reason: string;
  code?: string;
  simpleCode?: string;
  explanation?: string;
}

export interface DescriptiveQ {
  id: number;
  question: string;
  marks: number;
  solution?: string;
  explanation?: string;
}

export const mcqCh9: MCQ[] = [
  {
    id: 1,
    question: "MongoDB can only receive ______ to insert in collection.",
    options: ["Array of JSON", "Simple JSON", "Simple object", "Both A & B"],
    answer: "Both A & B",
    reason: "",
  },
  {
    id: 2,
    question: "______ command lists all collections in a DB.",
    options: ["desc collections", "list collections", "select collections", "show collections"],
    answer: "show collections",
    reason: "",
  },
  {
    id: 3,
    question: "______ command lists all databases.",
    options: ["list dbs", "select dbs", "show dbs", "desc dbs"],
    answer: "show dbs",
    reason: "",
  },
  {
    id: 4,
    question: "______ command creates a collection in MongoDB.",
    options: ["db.createCollection('Collection_name')", "create table table_name", "db.create.collection('Collection_name')", "db.Collection('Collection_name')"],
    answer: "db.createCollection('Collection_name')",
    reason: "",
  },
  {
    id: 5,
    question: "____ command deletes entire collection with all its documents.",
    options: ["db.collection_name.drop()", "db.collection_name.delete()", "db.collection_name.truncate()", "db.collection_name.cancel()"],
    answer: "db.collection_name.drop()",
    reason: "",
  },
  {
    id: 6,
    question: "_____ command creates a new database or switches to existing database.",
    options: ["switch", "use", "apply", "move"],
    answer: "use",
    reason: "",
  },
  {
    id: 7,
    question: "Identify the equivalent NoSQL command of following SQL command: create table student",
    options: ["db.create('student')", "db.createTable('student')", "db.createDatabase('student')", "db.createCollection('student')"],
    answer: "db.createCollection('student')",
    reason: "",
  },
  {
    id: 8,
    question: "Identify the equivalent NoSQL command of following SQL command: drop table student",
    options: ["db.student.drop()", "db.student.delete()", "db.student.truncate()", "db.student.cancel()"],
    answer: "db.student.drop()",
    reason: "",
  },
  {
    id: 9,
    question: "drop() command returns ______.",
    options: ["JSON specifying {OK:1}", "integer value", "null value", "Boolean value"],
    answer: "Boolean value",
    reason: "",
  },
  {
    id: 10,
    question: "You have a MongoDB collection named 'students'. Retrieve students whose names match any of 'CCC','PPP','BBB' in descending order of names.",
    options: ["db.students.find({name:{$in:['CCC','PPP','BBB']}}).sort({_id:-1})", "db.students.find({name:'CCC'", "'PPP'", "'BBB'}).sort({name:-1})", "db.students.find({name:{$in:['CCC','PPP','BBB']}}).sort({name:1})", "db.students.find({name:{$in:['CCC','PPP','BBB']}}).sort({name:-1})"],
    answer: "db.students.find({name:{$in:['CCC','PPP','BBB']}}).sort({name:-1})",
    reason: "",
  },
  {
    id: 11,
    question: "Identify the equivalent NoSQL command: UPDATE lju SET status = 'Active' WHERE age = 25 and name = 'ABC'",
    options: ["db.lju.updateMany({age:25,name:'AB'},{$set:{status:'Active'}})", "db.lju.updateMany({age:25,name:'ABC'},{$set:{status:'Active'}})", "db.lj.updateMany({age:25,name:'ABC'},{$set:{status:'Active'}})", "db.lju.updateMany({age:25,uname:'ABC'},{$set:{status:'Active'}})"],
    answer: "db.lju.updateMany({age:25,name:'ABC'},{$set:{status:'Active'}})",
    reason: "",
  },
  {
    id: 12,
    question: "Identify the equivalent NoSQL command: SELECT COUNT(*) FROM lju WHERE age > 30",
    options: ["db.lju.count({age:{$lt:30}})", "db.lju.find({age:{$gt:30}}).count()", "db.lju.find({age:{$gte:30}}).count()", "db.lju.findcount({age:{$gte:30}})"],
    answer: "db.lju.find({age:{$gte:30}}).count()",
    reason: "",
  },
  {
    id: 13,
    question: "Convert this SQL to MongoDB: ALTER TABLE data ADD join_date DATETIME",
    options: ["db.updateMany({$set:{join_date:new Date()}})", "db.data.updateMany({},{$set:{join_date:new Date()}})", "db.data.updateMany({joindate:{$set:new Date()}})", "db.data.updateOne({join_date:{$set:new Date()}})"],
    answer: "db.data.updateMany({},{$set:{join_date:new Date()}})",
    reason: "",
  },
  {
    id: 14,
    question: "Identify correct command to list name and age of all students excluding _id field.",
    options: ["db.student.find({name:1,age:1})", "db.student.find({name:1,age:1,_id:0})", "db.student.find({},{name:1,age:1,_id:0})", "db.student.find({},{name:1,age:1,_id:1})"],
    answer: "db.student.find({},{name:1,age:1,_id:0})",
    reason: "",
  },
  {
    id: 15,
    question: "1st and 2nd argument in find() command generally refers ____ & ____ respectively.",
    options: ["Projection & Condition", "Condition & Projection", "Condition & Selection", "Condition & Join"],
    answer: "Condition & Projection",
    reason: "",
  },
  {
    id: 16,
    question: "Identify correct query to increment age of all documents by 10.",
    options: ["db.test.updateMany({},{$set:{age:age+10}})", "db.test.updateMany({},{$inc:{age:10}})", "db.test.updateMany({$inc:{age:10}})", "All of the above"],
    answer: "db.test.updateMany({},{$inc:{age:10}})",
    reason: "",
  },
  {
    id: 17,
    question: "Identify correct query to count documents excluding age=2 and 21.",
    options: ["db.student.find({age:{$nin:[2,21]}}).count()", "db.student.find({$and:[{age:{$ne:2}},{age:{$ne:21}}]})", "db.student.find({$or:[{age:{$ne:2}},{age:{$ne:21}}]}).count()", "db.student.find({$and:[{age:{$eq:2}},{age:{$eq:21}}]}).count()"],
    answer: "db.student.find({age:{$nin:[2,21]}}).count()",
    reason: "",
  },
  {
    id: 18,
    question: "Identify correct command to update name field of all documents of a 'test' collection.",
    options: ["db.test.updateAll({name:{$set:'QQQ'}})", "db.test.updateMany({name:{$set:'QQQ'}})", "db.test.updateMany({$set:{name:'QQQ'}})", "db.test.updateMany({},{$set:{name:'QQQ'}})"],
    answer: "db.test.updateMany({},{$set:{name:'QQQ'}})",
    reason: "",
  },
  {
    id: 19,
    question: "Identify correct command equivalent to: delete from student",
    options: ["db.sudent.deleteOne({})", "db.student.deleteMany()", "db.student.deleteMany({})", "db.student.deleteAll()"],
    answer: "db.student.deleteMany({})",
    reason: "",
  },
  {
    id: 20,
    question: "Consider emp: [{_id:123433,name:'DDD',age:32},{_id:123434,name:'BBB',age:20},{_id:123435,name:'AAA',age:10}]. Result of db.emp.find({},{name:1,_id:0}).skip(1)?",
    options: ["[{name:'DDD'},{name:'BBB'}]", "[{name:'BBB'},{name:'AAA'}]", "[{name:'BBB'},{name:'DDD'}]", "[{name:'AAA'},{name:'DDD'}]"],
    answer: "[{name:'BBB'},{name:'AAA'}]",
    reason: "",
  },
  {
    id: 21,
    question: "Same emp collection. Equivalent query to db.emp.find({},{name:1,_id:0}).skip(1).limit(2)?",
    options: ["db.emp.find({},{name:1,_id:0}).skip(2).limit(1)", "db.emp.find({},{name:1,_id:0}).limit(2)", "db.emp.find({},{name:1,_id:0}).skip(2)", "db.emp.find({},{name:1,_id:0}).skip(1)"],
    answer: "db.emp.find({},{name:1,_id:0}).skip(1)",
    reason: "",
  },
  {
    id: 22,
    question: "______ property inserts a new record if record to be updated is not found.",
    options: ["upsert", "change", "update", "set"],
    answer: "upsert",
    reason: "",
  },
  {
    id: 23,
    question: "____ operator is used to exclude a list of values from a field during retrieval.",
    options: ["$in", "$restrict", "$nin", "$set"],
    answer: "$nin",
    reason: "",
  },
  {
    id: 24,
    question: "Consider student: [{_id:123433,name:'SSS',age:22},{_id:123434,name:'ppp',age:2},{_id:123435,name:'PPP',age:32}]. Result of db.student.find({name:{$in:['ppp','SSS']}})?",
    options: ["Returns all 3 records", "Error in query", "Error in query as $in compares by $eq", "Returns only 2 records having names 'ppp' & 'SSS'"],
    answer: "Returns only 2 records having names 'ppp' & 'SSS'",
    reason: "",
  },
  {
    id: 25,
    question: "Find products where price >= 50.",
    options: ["db.products.find({price:{$gt:50}})", "db.products.find({price:{$gte:50}})", "db.products.find({price:{$lt:50}})", "db.products.find({price:{$lte:50}})"],
    answer: "db.products.find({price:{$gte:50}})",
    reason: "",
  },
  {
    id: 26,
    question: "Identify error in: db.student.updateMany({$inc:{age:-8}})",
    options: ["Increments age of all docs", "Increments age of all, no count", "Increments age of 1st doc only", "Error, filter condition must be specified"],
    answer: "Error, filter condition must be specified",
    reason: "",
  },
  {
    id: 27,
    question: "Correct query to find eldest person from emp collection?",
    options: ["db.emp.findOne({age:50})", "db.emp.find().sort({age:1})", "db.emp.find().sort({age:-1}).limit(1)", "db.emp.findOne().sort({age:1})"],
    answer: "db.emp.find().sort({age:-1}).limit(1)",
    reason: "",
  },
  {
    id: 28,
    question: "The MongoDB Aggregation Framework is mainly used to:",
    options: ["Insert multiple documents", "Perform complex data processing", "Create indexes", "Delete collections"],
    answer: "Perform complex data processing and transformation",
    reason: "",
  },
  {
    id: 29,
    question: "Which stage filters documents in aggregation pipeline?",
    options: ["$group", "$project", "$match", "$sort"],
    answer: "$match",
    reason: "",
  },
  {
    id: 30,
    question: "$match stage is similar to which MongoDB operation?",
    options: ["insertOne()", "find()", "updateOne()", "drop()"],
    answer: "find()",
    reason: "",
  },
  {
    id: 31,
    question: "Which stage groups documents based on a specified field?",
    options: ["$group", "$match", "$sort", "$limit"],
    answer: "$group",
    reason: "",
  },
  {
    id: 32,
    question: "In $group stage, which field is mandatory?",
    options: ["groupBy", "key", "value", "_id"],
    answer: "_id",
    reason: "",
  },
  {
    id: 33,
    question: "To arrange documents in ascending or descending order, which stage?",
    options: ["$sort", "$project", "$group", "$match"],
    answer: "$sort",
    reason: "",
  },
  {
    id: 34,
    question: "In $sort stage, what does value 1 represent?",
    options: ["Random order", "Descending order", "Ascending order", "No sorting"],
    answer: "Ascending order",
    reason: "",
  },
  {
    id: 35,
    question: "What does value -1 represent in $sort?",
    options: ["Ascending order", "Descending order", "Remove duplicates", "Skip documents"],
    answer: "Descending order",
    reason: "",
  },
  {
    id: 36,
    question: "Which stage reshapes documents by including/excluding/creating fields?",
    options: ["$sort", "$project", "$match", "$group"],
    answer: "$project",
    reason: "",
  },
  {
    id: 37,
    question: "To include a field in $project, assign it value:",
    options: ["-1", "true only"],
    answer: "1",
    reason: "",
  },
  {
    id: 38,
    question: "To exclude a field in $project, assign it value:",
    options: ["-1", "false only"],
    answer: "0",
    reason: "",
  },
  {
    id: 39,
    question: "Correct aggregation pipeline structure:",
    options: ["db.collection.aggregate([{stage1},{stage2}])", "db.collection.group({})", "db.aggregate.collection({})", "aggregate.collection.db({})"],
    answer: "db.collection.aggregate([{stage1},{stage2}])",
    reason: "",
  },
  {
    id: 40,
    question: "db.students.aggregate([{$match:{marks:{$gt:80}}},{$sort:{marks:1}}]) — what does it do?",
    options: ["Sorts then filters", "Groups students above 80", "Filters marks>80 and sorts ascending", "Deletes above 80"],
    answer: "Filters marks>80 and sorts ascending",
    reason: "",
  },
  {
    id: 41,
    question: "db.students.aggregate([{$project:{name:1,marks:1,_id:0}}]) — result?",
    options: ["Only name and marks", "All except name", "Deletes _id permanently", "Groups by name"],
    answer: "Displays only name and marks fields",
    reason: "",
  },
  {
    id: 42,
    question: "db.students.aggregate([{$group:{_id:'$department'}}]) — output?",
    options: ["Students by dept", "Unique departments", "Total count", "Sorted departments"],
    answer: "Unique departments",
    reason: "",
  },
];

export const descriptiveCh9: DescriptiveQ[] = [
  {
    id: 1, marks: 5,
    question: "Create a collection named Student (name,age,standard,percentage). Insert 5-10 docs. (1)Find students age>7 (2)Increase standard by 1 for all (3)Sort ascending by age (4)Show oldest student's name (5)Delete records where standard=12.",
    solution: `db.createCollection("Student")
db.Student.insertMany([
  { name: "Rahul", age: 8, standard: 3, percentage: 78 },
  { name: "Priya", age: 10, standard: 5, percentage: 85 },
  { name: "Amit", age: 6, standard: 1, percentage: 92 },
  { name: "Neha", age: 12, standard: 7, percentage: 74 },
  { name: "Rohan", age: 15, standard: 10, percentage: 88 },
  { name: "Sonia", age: 7, standard: 2, percentage: 80 },
  { name: "Deep", age: 14, standard: 9, percentage: 70 },
])

// (1) Find students age > 7
db.Student.find({ age: { $gt: 7 } })

// (2) Increase standard by 1 for all
db.Student.updateMany({}, { $inc: { standard: 1 } })

// (3) Sort ascending by age
db.Student.find().sort({ age: 1 })

// (4) Show oldest student's name
db.Student.find().sort({ age: -1 }).limit(1)

// (5) Delete records where standard = 12
db.Student.deleteMany({ standard: 12 })`,
    explanation: `Line 1: createCollection creates a new collection named Student.
Line 3-10: insertMany inserts multiple documents with name, age, standard, percentage fields.
Line 13: $gt (greater than) filters students where age exceeds 7.
Line 16: $inc increments the standard field by 1 for every document.
Line 19: sort({age:1}) arranges documents in ascending order (1=asc, -1=desc).
Line 22: sort by age descending + limit(1) returns the oldest student only.
Line 25: deleteMany removes all documents matching standard=12.`
  },
  {
    id: 2, marks: 4,
    question: "Create collection Student (name,age,std,percentage). (1)Insert 3 records (2)Find students age>5 (3)Update std by 1 for all (4)Sort descending by age (5)Show oldest student's name.",
    solution: `db.createCollection("Student")
db.Student.insertMany([
  { name: "A", age: 6, std: 1, percentage: 80 },
  { name: "B", age: 10, std: 5, percentage: 90 },
  { name: "C", age: 8, std: 3, percentage: 75 },
])

db.Student.find({ age: { $gt: 5 } })
db.Student.updateMany({}, { $inc: { std: 1 } })
db.Student.find().sort({ age: -1 })
db.Student.find().sort({ age: -1 }).limit(1)`,
    explanation: `Insert 3 documents using insertMany. find with $gt returns age>5. updateMany with $inc increments std by 1 for all. sort({age:-1}) gives descending order. limit(1) picks the oldest (first after descending sort).`
  },
  {
    id: 3, marks: 4,
    question: "Write queries on employee (name,age,position,salary). (1)Insert 3 docs (2)Count employees where age!=35 and position='Full Stack Developer' (3)Update position to 'Software Developer' where name='XYZ' and age=31, upsert (4)Display position,name of employee with lowest salary.",
    solution: `db.createCollection("employee")
db.employee.insertMany([
  { name: "Alice", age: 28, position: "Full Stack Developer", salary: 60000 },
  { name: "Bob", age: 35, position: "Backend Developer", salary: 55000 },
  { name: "Charlie", age: 30, position: "Full Stack Developer", salary: 65000 },
])

// (2) Count where age != 35 AND position = "Full Stack Developer"
db.employee.countDocuments({
  age: { $ne: 35 },
  position: "Full Stack Developer"
})

// (3) Upsert: update if found, insert if not
db.employee.updateOne(
  { name: "XYZ", age: 31 },
  { $set: { position: "Software Developer" } },
  { upsert: true }
)

// (4) Employee with lowest salary
db.employee.find().sort({ salary: 1 }).limit(1)`,
    explanation: `$ne filters documents where age is NOT equal to 35. countDocuments returns the count matching all conditions. updateOne with {upsert:true} creates a new document if no match is found. sort({salary:1}) ascending + limit(1) gives the lowest salary.`
  },
  {
    id: 4, marks: 4,
    question: "Map SQL to MongoDB: (1)select age,name from employee where status='active' (2)select * from employee where status!='active' (3)select name from employee order by age desc (4)select * from employee where status='active' or age=50.",
    solution: `// (1) SELECT age,name FROM employee WHERE status = 'active'
db.employee.find(
  { status: "active" },
  { age: 1, name: 1, _id: 0 }
)

// (2) SELECT * FROM employee WHERE status != 'active'
db.employee.find({ status: { $ne: "active" } })

// (3) SELECT name FROM employee ORDER BY age DESC
db.employee.find(
  {},
  { name: 1, _id: 0 }
).sort({ age: -1 })

// (4) SELECT * FROM employee WHERE status='active' OR age=50
db.employee.find({
  $or: [
    { status: "active" },
    { age: 50 }
  ]
})`,
    explanation: `Projection {field:1} includes a field, {_id:0} excludes _id. $ne means "not equal". $or takes an array of conditions — at least one must match. sort({age:-1}) orders descending.`
  },
  {
    id: 5, marks: 3,
    question: "Write commands on employee (name,age,joiningDate). (1)Insert 3-4 records (2)List employees who joined before 1-Jan-2010 (3)Update name to 'WWW' where joiningDate='05-05-2015'.",
    solution: `db.employee.insertMany([
  { name: "X", age: 30, joiningDate: new Date("2008-06-15") },
  { name: "Y", age: 25, joiningDate: new Date("2012-03-20") },
  { name: "Z", age: 35, joiningDate: new Date("2005-11-01") },
])

// (2) Joined before 1-Jan-2010
db.employee.find({
  joiningDate: { $lt: new Date("2010-01-01") }
})

// (3) Update name to "WWW"
db.employee.updateOne(
  { joiningDate: new Date("2015-05-05") },
  { $set: { name: "WWW" } }
)`,
    explanation: `Use new Date() for date comparisons. $lt (less than) filters dates before a given date. updateOne with $set modifies the matching document's name field.`
  },
  {
    id: 6, marks: 3,
    question: "Write commands on employee (name,age,joiningDate). (1)Delete records with joiningDate before 1-Jan-2010 (2)List employees age>50 (3)List 1st employee age>60.",
    solution: `// (1) Delete records before 1-Jan-2010
db.employee.deleteMany({
  joiningDate: { $lt: new Date("2010-01-01") }
})

// (2) List employees age > 50
db.employee.find({ age: { $gt: 50 } })

// (3) First employee age > 60
db.employee.findOne({ age: { $gt: 60 } })`,
    explanation: `deleteMany removes all matching documents. $gt (greater than) filters by numeric comparison. findOne returns only the first matching document instead of a cursor.`
  },
  {
    id: 7, marks: 3,
    question: "Write commands on employee (name,age,joiningDate). (1)Update name='Senior citizen' where age>60 (2)Update name='JKL' where age=20, upsert (3)Delete senior citizens.",
    solution: `// (1) Update name to "Senior citizen" where age > 60
db.employee.updateMany(
  { age: { $gt: 60 } },
  { $set: { name: "Senior citizen" } }
)

// (2) Upsert: update where age=20, insert if not found
db.employee.updateOne(
  { age: 20 },
  { $set: { name: "JKL" } },
  { upsert: true }
)

// (3) Delete senior citizens (age > 60)
db.employee.deleteMany({ age: { $gt: 60 } })`,
    explanation: `updateMany modifies all matching documents. {upsert:true} creates a new document when no match exists. deleteMany permanently removes documents matching the condition.`
  },
  {
    id: 8, marks: 3,
    question: "Write commands on employee (name,age,joiningDate). (1)Count employees age>=60 (2)List employees descending by name having names 'ABC','PQR','XYZ' (3)List employees age 25-50 excluding all other fields.",
    solution: `// (1) Count employees age >= 60
db.employee.countDocuments({ age: { $gte: 60 } })

// (2) List employees with names in list, descending by name
db.employee.find({
  name: { $in: ["ABC", "PQR", "XYZ"] }
}).sort({ name: -1 })

// (3) List employees age 25-50, exclude all other fields (show only age)
db.employee.find(
  { age: { $gte: 25, $lte: 50 } },
  { age: 1, _id: 0 }
)`,
    explanation: `$gte means "greater than or equal". $in checks if a field matches any value in an array. The second parameter to find() is a projection — {age:1,_id:0} shows only the age field. $lte means "less than or equal".`
  },
  {
    id: 9, marks: 5,
    question: "Map SQL to MongoDB: (1)alter table people add joiningDate datetime (2)alter table people drop column joiningDate (3)select age,name from people where status='PH' (4)select * from people where status!='PH' (5)select name from people order by age desc.",
    solution: `// (1) ALTER TABLE people ADD joiningDate DATETIME
db.people.updateMany(
  {},
  { $set: { joiningDate: new Date() } }
)

// (2) ALTER TABLE people DROP COLUMN joiningDate
db.people.updateMany(
  {},
  { $unset: { joiningDate: "" } }
)

// (3) SELECT age,name FROM people WHERE status='PH'
db.people.find(
  { status: "PH" },
  { age: 1, name: 1, _id: 0 }
)

// (4) SELECT * FROM people WHERE status!='PH'
db.people.find({ status: { $ne: "PH" } })

// (5) SELECT name FROM people ORDER BY age DESC
db.people.find(
  {},
  { name: 1, _id: 0 }
).sort({ age: -1 })`,
    explanation: `$set adds a new field to existing documents. $unset removes a field from documents. Projection {age:1,name:1,_id:0} includes age/name but excludes _id. $ne filters documents where status is NOT equal.`
  },
  {
    id: 10, marks: 3,
    question: "Map SQL to MongoDB: (1)update employee set name='TTT' where age not in (12,33,44,55) (2)select count(*) from employee where age>23 (3)update employee set age=age+10.",
    solution: `// (1) UPDATE employee SET name='TTT' WHERE age NOT IN (12,33,44,55)
db.employee.updateMany(
  { age: { $nin: [12, 33, 44, 55] } },
  { $set: { name: "TTT" } }
)

// (2) SELECT COUNT(*) FROM employee WHERE age > 23
db.employee.countDocuments({ age: { $gt: 23 } })

// (3) UPDATE employee SET age = age + 10
db.employee.updateMany({}, { $inc: { age: 10 } })`,
    explanation: `$nin excludes documents where age matches any value in the array. $inc increments the age field by the specified value. updateMany with {} affects all documents in the collection.`
  },
  {
    id: 11, marks: 4,
    question: "List out comparison operators in MongoDB and explain with example.",
    solution: `// MongoDB Comparison Operators:

// $eq  - Equal to
db.student.find({ age: { $eq: 20 } })    // age == 20

// $ne  - Not equal to
db.student.find({ age: { $ne: 20 } })    // age != 20

// $gt  - Greater than
db.student.find({ age: { $gt: 20 } })    // age > 20

// $gte - Greater than or equal to
db.student.find({ age: { $gte: 20 } })   // age >= 20

// $lt  - Less than
db.student.find({ age: { $lt: 20 } })    // age < 20

// $lte - Less than or equal to
db.student.find({ age: { $lte: 20 } })   // age <= 20

// $in  - Match any value in an array
db.student.find({ age: { $in: [20, 25, 30] } })

// $nin - Match none of the values in an array
db.student.find({ age: { $nin: [20, 25, 30] } })`,
    explanation: `$eq matches exact equality (default when using {field:value} shorthand). $ne returns documents where the field does NOT equal the value. $gt/$gte filter for values above a threshold. $lt/$lte filter for values below a threshold. $in checks against a list of possible values (OR logic). $nin excludes all values in the list (AND NOT logic).`
  },
  {
    id: 12, marks: 5,
    question: "Consider student collection with fields name,branch,marks. Using aggregation: (1)Group by branch and count students (2)Average marks per branch (3)Highest marks per branch (4)Students with marks>75 (5)Sort by marks descending.",
    solution: `db.students.aggregate([

  // (4) First filter: students with marks > 75
  { $match: { marks: { $gt: 75 } } },

  // (1) Group by branch and count
  { $group: { _id: "$branch", count: { $sum: 1 } } },

  // (2) Average marks per branch
  { $group: { _id: "$branch", avgMarks: { $avg: "$marks" } } },

  // (3) Highest marks per branch
  { $group: { _id: "$branch", maxMarks: { $max: "$marks" } } },

  // (5) Sort by marks descending
  { $sort: { maxMarks: -1 } }
])

// Combined pipeline for all requirements:
db.students.aggregate([
  { $match: { marks: { $gt: 75 } } },
  {
    $group: {
      _id: "$branch",
      count: { $sum: 1 },
      avgMarks: { $avg: "$marks" },
      maxMarks: { $max: "$marks" }
    }
  },
  { $sort: { maxMarks: -1 } }
])`,
    explanation: `$match filters documents early (like WHERE) to reduce pipeline size. $group with _id specifies the grouping key; $sum:1 counts documents per group. $avg calculates the average of a numeric field. $max finds the maximum value per group. $sort at the end arranges results in descending order. Aggregation stages execute sequentially — each stage's output feeds the next.`
  },
  {
    id: 13, marks: 4,
    question: "Consider student: [{name:'SSS',age:22},{name:'YYY',age:2},{name:'PPP',age:32}]. (1)Update name='JJJ',age=40 where age=20, upsert (2)Retrieve age,name of 'YYY' & 'SSS' excluding _id.",
    solution: `// (1) Update with upsert: name="JJJ", age=40 where age=20
db.student.updateOne(
  { age: 20 },
  { $set: { name: "JJJ", age: 40 } },
  { upsert: true }
)
// Since no document has age=20, a NEW document is inserted:
// { name: "JJJ", age: 40 }

// (2) Retrieve age,name of "YYY" and "SSS", exclude _id
db.student.find(
  { name: { $in: ["YYY", "SSS"] } },
  { age: 1, name: 1, _id: 0 }
)`,
    explanation: `updateOne with {upsert:true} searches for a document matching the filter. If found, it updates it. If NOT found (no student with age=20), it creates a new document with both the filter fields AND the $set fields. $in matches documents where name is either "YYY" or "SSS". Projection {age:1,name:1,_id:0} returns only age and name fields.`
  },
];

