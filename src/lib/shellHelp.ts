import { HelpEntry } from "./shellTypes";

export const HELP_DATABASE: HelpEntry[] = [
  { command: "show dbs", description: "List all databases in the cluster", syntax: "show dbs", returns: "Array of database names with sizes", example: "> show dbs\nstudents  100KB\necommerce  250KB", related: ["use", "db.stats()"] },
  { command: "use", description: "Switch to or create a database", syntax: "use <databaseName>", returns: "Switched to db message", example: "> use students\nSwitched to db: students", related: ["show dbs", "db"] },
  { command: "db", description: "Show current database name", syntax: "db", returns: "Current database name", example: "> db\nstudents", warnings: "Shortcut for db.getName()" },
  { command: "show collections", description: "List all collections in current database", syntax: "show collections", returns: "Array of collection names with document counts", example: "> show collections\nstudents (8 docs)\ncourses (4 docs)", related: ["db.createCollection()"] },
  { command: "db.dropDatabase()", description: "Drop (delete) the entire current database", syntax: "db.dropDatabase()", returns: "Confirmation with dropped database name", warnings: "IRREVERSIBLE — all collections and documents will be deleted", related: ["db.collection.drop()", "show dbs"] },
  { command: "db.stats()", description: "Display storage statistics for current database", syntax: "db.stats()", returns: "Object with collections, objects, dataSize, storageSize", example: "> db.stats()\n{ collections: 3, objects: 14, dataSize: 4096 }" },
];

export const HELP_COLLECTIONS: HelpEntry[] = [
  { command: "db.collection.insertOne()", description: "Insert a single document into a collection", syntax: "db.collection.insertOne({ field: value, ... })", returns: "Inserted document's _id", example: "> db.students.insertOne({ name: \"Test\", age: 25 })\n{ acknowledged: true, insertedId: ObjectId(\"...\") }", warnings: "If collection doesn't exist, it's created automatically", related: ["insertMany()"] },
  { command: "db.collection.insertMany()", description: "Insert multiple documents at once", syntax: "db.collection.insertMany([{...}, {...}])", returns: "Array of inserted _ids", example: "> db.products.insertMany([\n  { name: \"Item A\", price: 100 },\n  { name: \"Item B\", price: 200 }\n])", related: ["insertOne()"] },
  { command: "db.collection.find()", description: "Retrieve documents matching a filter", syntax: "db.collection.find({ filter }, { projection })", returns: "Cursor of matching documents", example: "> db.students.find({ city: \"Ahmedabad\" })\n8 documents found", related: ["findOne()", "limit()", "sort()", "pretty()"] },
  { command: "db.collection.findOne()", description: "Retrieve the first document matching a filter", syntax: "db.collection.findOne({ filter })", returns: "Single document or null", example: "> db.students.findOne({ name: \"Alice Patel\" })", related: ["find()"] },
  { command: "db.collection.updateOne()", description: "Update the first document matching a filter", syntax: "db.collection.updateOne({ filter }, { $set: { field: value } })", returns: "Matched and modified count", example: "> db.students.updateOne(\n  { name: \"Alice\" },\n  { $set: { gpa: 4.0 } }\n)", related: ["updateMany()", "replaceOne()"] },
  { command: "db.collection.updateMany()", description: "Update all documents matching a filter", syntax: "db.collection.updateMany({ filter }, { $set: { field: value } })", returns: "Matched and modified count", example: "> db.students.updateMany(\n  { city: \"Ahmedabad\" },\n  { $inc: { age: 1 } }\n)", related: ["updateOne()", "replaceOne()"] },
  { command: "db.collection.deleteOne()", description: "Delete the first document matching a filter", syntax: "db.collection.deleteOne({ filter })", returns: "Deleted count", example: "> db.students.deleteOne({ name: \"Test\" })", warnings: "IRREVERSIBLE — use with caution", related: ["deleteMany()"] },
  { command: "db.collection.deleteMany()", description: "Delete all documents matching a filter", syntax: "db.collection.deleteMany({ filter })", returns: "Deleted count", example: "> db.students.deleteMany({ enrolled: false })", related: ["deleteOne()"] },
  { command: "db.collection.countDocuments()", description: "Count documents matching a filter", syntax: "db.collection.countDocuments({ filter })", returns: "Number of matching documents", example: "> db.students.countDocuments({ city: \"Ahmedabad\" })\n4", related: ["estimatedDocumentCount()"] },
  { command: "db.collection.distinct()", description: "Get unique values for a field", syntax: "db.collection.distinct(\"field\")", returns: "Array of unique values", example: "> db.students.distinct(\"city\")\n[\"Ahmedabad\", \"Surat\", \"Rajkot\"]", related: ["find()"] },
  { command: "db.collection.renameCollection()", description: "Rename a collection", syntax: "db.collection.renameCollection(\"newName\")", returns: "Confirmation message", example: "> db.students.renameCollection(\"learners\")\n{ ok: 1 }" },
];

export const HELP_CURSOR: HelpEntry[] = [
  { command: "limit()", description: "Limit the number of documents returned", syntax: "db.collection.find().limit(n)", returns: "Cursor with max n documents", example: "> db.students.find().limit(3)", related: ["skip()"] },
  { command: "skip()", description: "Skip a number of documents", syntax: "db.collection.find().skip(n)", returns: "Cursor skipping first n documents", example: "> db.students.find().skip(2).limit(2)", related: ["limit()"] },
  { command: "sort()", description: "Sort results by field(s)", syntax: "db.collection.find().sort({ field: 1 })", returns: "Sorted cursor (1=asc, -1=desc)", example: "> db.students.find().sort({ age: -1 })", related: ["limit()"] },
  { command: "pretty()", description: "Format output with indentation", syntax: "db.collection.find().pretty()", returns: "Formatted documents", example: "> db.students.find().pretty()" },
  { command: "toArray()", description: "Return all cursor results as an array", syntax: "db.collection.find().toArray()", returns: "Array of documents", example: "> const results = db.students.find().toArray()" },
];

export const HELP_AGGREGATION: HelpEntry[] = [
  { command: "aggregate()", description: "Run an aggregation pipeline", syntax: "db.collection.aggregate([ stages ])", returns: "Array of aggregated results", example: "> db.orders.aggregate([\n  { $group: { _id: \"$status\", total: { $sum: \"$total\" } } }\n])", related: ["$match", "$group", "$sort", "$lookup"] },
  { command: "$match", description: "Filter documents in the pipeline", syntax: "{ $match: { field: value } }", returns: "Filtered documents", example: "> { $match: { status: \"delivered\" } }", related: ["$group", "$sort"] },
  { command: "$group", description: "Group documents by a field and compute aggregates", syntax: "{ $group: { _id: \"$field\", total: { $sum: \"$field\" } } }", returns: "Grouped results", example: "> { $group: { _id: \"$category\", avgPrice: { $avg: \"$price\" } } }", related: ["$match", "$sort"] },
  { command: "$project", description: "Reshape documents (include/exclude fields)", syntax: "{ $project: { field: 1, newField: \"$oldField\" } }", returns: "Transformed documents", example: "> { $project: { name: 1, price: 1, _id: 0 } }", related: ["$set", "$unset"] },
  { command: "$sort", description: "Sort documents in the pipeline", syntax: "{ $sort: { field: 1 } }", returns: "Sorted documents", example: "> { $sort: { total: -1 } }" },
  { command: "$lookup", description: "Join documents from another collection", syntax: "{ $lookup: { from: \"collection\", localField: \"field\", foreignField: \"_id\", as: \"output\" } }", returns: "Documents with joined array", example: "> { $lookup: { from: \"courses\", localField: \"courseId\", foreignField: \"_id\", as: \"course\" } }", related: ["$unwind"] },
  { command: "$unwind", description: "Deconstruct an array field into separate documents", syntax: "{ $unwind: \"$arrayField\" }", returns: "One document per array element", example: "> { $unwind: \"$items\" }" },
  { command: "$count", description: "Count documents in the pipeline", syntax: "{ $count: \"countField\" }", returns: "Single document with count", example: "> { $count: \"totalOrders\" }" },
  { command: "$limit", description: "Limit documents in the pipeline", syntax: "{ $limit: n }", returns: "First n documents", example: "> { $limit: 5 }" },
  { command: "$facet", description: "Run multiple pipelines on the same input", syntax: "{ $facet: { output1: [ stages ], output2: [ stages ] } }", returns: "Object with multiple result arrays", example: "> { $facet: { cheap: [{ $match: { price: { $lt: 1000 } } }], expensive: [{ $match: { price: { $gte: 1000 } } }] } }" },
  { command: "$bucket", description: "Categorize documents into buckets", syntax: "{ $bucket: { groupBy: \"$field\", boundaries: [0, 50, 100], output: { count: { $sum: 1 } } } }", returns: "Bucketed results", example: "> { $bucket: { groupBy: \"$price\", boundaries: [0, 500, 1000, 10000], default: \"Other\", output: { count: { $sum: 1 } } } }" },
  { command: "$set", description: "Add or modify fields", syntax: "{ $set: { newField: \"$oldField\" } }", returns: "Documents with added/updated fields", example: "> { $set: { fullName: { $concat: [\"$firstName\", \" \", \"$lastName\"] } } }" },
  { command: "$merge", description: "Write pipeline results to a collection", syntax: "{ $merge: { into: \"collection\" } }", returns: "Documents written to target collection", warnings: "Modifies data in the target collection", related: ["$out"] },
];

export const HELP_INDEXES: HelpEntry[] = [
  { command: "createIndex()", description: "Create an index on a field", syntax: "db.collection.createIndex({ field: 1 })", returns: "Index name", example: "> db.students.createIndex({ email: 1 })\nemail_1", related: ["getIndexes()", "dropIndex()"] },
  { command: "getIndexes()", description: "List all indexes on a collection", syntax: "db.collection.getIndexes()", returns: "Array of index specs", example: "> db.students.getIndexes()\n[ { v: 2, key: { _id: 1 }, name: \"_id_\" } ]", related: ["createIndex()", "dropIndex()"] },
  { command: "dropIndex()", description: "Remove an index by name", syntax: "db.collection.dropIndex(\"indexName\")", returns: "Confirmation", example: "> db.students.dropIndex(\"email_1\")", warnings: "Cannot drop the default _id index", related: ["createIndex()", "getIndexes()"] },
  { command: "dropIndexes()", description: "Remove all non-_id indexes", syntax: "db.collection.dropIndexes()", returns: "Confirmation", example: "> db.students.dropIndexes()", related: ["dropIndex()"] },
];

export const HELP_EXPLAIN: HelpEntry[] = [
  { command: "explain()", description: "Show query execution plan", syntax: "db.collection.find().explain()", returns: "Execution plan with stages and stats", example: "> db.students.find({ age: { $gt: 20 } }).explain()\nwinningPlan: { stage: 'COLLSCAN', ... }", related: ["executionStats"] },
];

export const HELP_UTILITIES: HelpEntry[] = [
  { command: "clear", description: "Clear the console output", syntax: "clear  or  cls", returns: "Console cleared", example: "> clear" },
  { command: "history", description: "Show command history", syntax: "history", returns: "List of recent commands", example: "> history\n  1  show dbs\n  2  use students\n  3  db.students.find()" },
  { command: "seed", description: "Load sample dataset", syntax: "seed <dataset>", returns: "Loaded dataset message", example: "> seed students\nLoaded 3 collections with 15 documents\n> seed ecommerce\nLoaded 3 collections with 15 documents", warnings: "Available: students, ecommerce, bookstore, socialmedia, banking" },
  { command: "sample", description: "Insert sample documents into current collection", syntax: "db.collection.insertMany(sample)", returns: "Sample documents inserted", example: "> db.students.insertMany(sample)\n6 sample documents inserted" },
  { command: "help", description: "Display this help menu, or detailed help for a command", syntax: "help  or  help <command>", returns: "Help information", example: "> help find\nShows detailed help for the find() command" },
];

export const ALL_HELP: HelpEntry[] = [
  ...HELP_DATABASE,
  ...HELP_COLLECTIONS,
  ...HELP_CURSOR,
  ...HELP_AGGREGATION,
  ...HELP_INDEXES,
  ...HELP_EXPLAIN,
  ...HELP_UTILITIES,
];

export const HELP_CATEGORIES: { name: string; icon: string; entries: HelpEntry[] }[] = [
  { name: "Database", icon: "\ud83d\uddc4\ufe0f", entries: HELP_DATABASE },
  { name: "Collections / CRUD", icon: "\ud83d\udcbe", entries: HELP_COLLECTIONS },
  { name: "Cursor Methods", icon: "\u27a1\ufe0f", entries: HELP_CURSOR },
  { name: "Aggregation", icon: "\ud83d\udcca", entries: HELP_AGGREGATION },
  { name: "Indexes", icon: "\ud83d\udd0d", entries: HELP_INDEXES },
  { name: "Explain", icon: "\u2699\ufe0f", entries: HELP_EXPLAIN },
  { name: "Utilities", icon: "\ud83d\udd27", entries: HELP_UTILITIES },
];
