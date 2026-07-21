import { AutocompleteSuggestion } from "./shellTypes";

const DB_METHODS: AutocompleteSuggestion[] = [
  { text: "show dbs", description: "List all databases", category: "Database" },
  { text: "use ", description: "Switch to a database", category: "Database" },
  { text: "show collections", description: "List collections in current db", category: "Database" },
  { text: "db.stats()", description: "Database statistics", category: "Database" },
  { text: "db.dropDatabase()", description: "Delete current database", category: "Database" },
];

const COLL_METHODS: AutocompleteSuggestion[] = [
  { text: "insertOne({})", description: "Insert one document", category: "CRUD" },
  { text: "insertMany([])", description: "Insert multiple documents", category: "CRUD" },
  { text: "find({})", description: "Query documents", category: "CRUD" },
  { text: "findOne({})", description: "Find one document", category: "CRUD" },
  { text: "updateOne({}, {$set: {}})", description: "Update one document", category: "CRUD" },
  { text: "updateMany({}, {$set: {}})", description: "Update many documents", category: "CRUD" },
  { text: "replaceOne({}, {})", description: "Replace one document", category: "CRUD" },
  { text: "deleteOne({})", description: "Delete one document", category: "CRUD" },
  { text: "deleteMany({})", description: "Delete many documents", category: "CRUD" },
  { text: "countDocuments({})", description: "Count documents", category: "CRUD" },
  { text: "estimatedDocumentCount()", description: "Estimated document count", category: "CRUD" },
  { text: "distinct(\"field\")", description: "Get distinct values", category: "CRUD" },
  { text: "createCollection(\"name\")", description: "Create a new collection", category: "Database" },
  { text: "renameCollection(\"newName\")", description: "Rename collection", category: "Database" },
  { text: "drop()", description: "Drop collection", category: "Database" },
];

const CURSOR_METHODS: AutocompleteSuggestion[] = [
  { text: ".sort({})", description: "Sort results", category: "Cursor" },
  { text: ".limit(n)", description: "Limit results", category: "Cursor" },
  { text: ".skip(n)", description: "Skip results", category: "Cursor" },
  { text: ".pretty()", description: "Format output", category: "Cursor" },
  { text: ".toArray()", description: "Convert to array", category: "Cursor" },
  { text: ".explain()", description: "Show execution plan", category: "Explain" },
];

const AGG_STAGES: AutocompleteSuggestion[] = [
  { text: "$match", description: "Filter documents", category: "Aggregation" },
  { text: "$group", description: "Group documents", category: "Aggregation" },
  { text: "$project", description: "Reshape documents", category: "Aggregation" },
  { text: "$sort", description: "Sort documents", category: "Aggregation" },
  { text: "$limit", description: "Limit documents", category: "Aggregation" },
  { text: "$skip", description: "Skip documents", category: "Aggregation" },
  { text: "$lookup", description: "Join collections", category: "Aggregation" },
  { text: "$unwind", description: "Deconstruct array", category: "Aggregation" },
  { text: "$count", description: "Count documents", category: "Aggregation" },
  { text: "$facet", description: "Multi-pipeline", category: "Aggregation" },
  { text: "$bucket", description: "Bucket documents", category: "Aggregation" },
  { text: "$set", description: "Add/modify fields", category: "Aggregation" },
  { text: "$unset", description: "Remove fields", category: "Aggregation" },
  { text: "$merge", description: "Write to collection", category: "Aggregation" },
  { text: "$out", description: "Output collection", category: "Aggregation" },
];

const INDEX_METHODS: AutocompleteSuggestion[] = [
  { text: "createIndex({})", description: "Create an index", category: "Indexes" },
  { text: "getIndexes()", description: "List indexes", category: "Indexes" },
  { text: "dropIndex(\"name\")", description: "Drop an index", category: "Indexes" },
  { text: "dropIndexes()", description: "Drop all indexes", category: "Indexes" },
  { text: "hideIndex(\"name\")", description: "Hide an index", category: "Indexes" },
];

const UTILITIES: AutocompleteSuggestion[] = [
  { text: "help", description: "Show help", category: "Utilities" },
  { text: "clear", description: "Clear console", category: "Utilities" },
  { text: "cls", description: "Clear console", category: "Utilities" },
  { text: "history", description: "Show command history", category: "Utilities" },
  { text: "seed ", description: "Load sample dataset", category: "Utilities" },
];

const AGG_FUNCTIONS = ["$sum", "$avg", "$min", "$max", "$push", "$addToSet", "$first", "$last"];
const COMPARISON_OPS = ["$gt", "$gte", "$lt", "$lte", "$eq", "$ne", "$in", "$nin"];
const UPDATE_OPS = ["$set", "$unset", "$inc", "$push", "$pull", "$addToSet", "$rename"];

export function getAutocomplete(input: string, collectionNames: string[]): AutocompleteSuggestion[] {
  if (!input) return [...DB_METHODS, ...UTILITIES, ...AGG_STAGES];

  const lower = input.toLowerCase();

  // Typing "db." — suggest collection names or DB methods
  if (lower === "db" || lower === "db.") {
    const collItems: AutocompleteSuggestion[] = collectionNames.map((name) => ({
      text: `db.${name}.`,
      description: `Collection: ${name}`,
      category: "Collections",
    }));
    return [...DB_METHODS, ...collItems];
  }

  // Typing "db.something." — suggest collection methods
  if (/^db\.[a-z_][a-z0-9_]*\.?$/i.test(input)) {
    const parts = input.split(".");
    if (parts.length === 3 && parts[2] === "") {
      const collName = parts[1];
      return [
        ...COLL_METHODS.map((m) => ({
          ...m,
          text: `db.${collName}.${m.text}`,
        })),
        ...CURSOR_METHODS,
        ...INDEX_METHODS,
      ];
    }
  }

  // Inside aggregate([...]) — suggest stages
  if (lower.includes("aggregate(") && (lower.includes("$") || lower.includes("["))) {
    return AGG_STAGES;
  }

  // Typing "$" — suggest operators
  if (input.endsWith("$")) {
    return AGG_STAGES;
  }

  // Suggest operators inside objects
  if (input.includes("{$") || input.includes("{ $")) {
    return [
      ...COMPARISON_OPS.map((op) => ({ text: op, description: "Comparison operator", category: "Operators" })),
      ...UPDATE_OPS.map((op) => ({ text: op, description: "Update operator", category: "Operators" })),
      ...AGG_FUNCTIONS.map((fn) => ({ text: fn, description: "Accumulator", category: "Aggregation" })),
    ];
  }

  // General prefix matching
  const all = [
    ...DB_METHODS,
    ...COLL_METHODS,
    ...CURSOR_METHODS,
    ...AGG_STAGES,
    ...INDEX_METHODS,
    ...UTILITIES,
  ];

  return all.filter((s) => s.text.toLowerCase().includes(lower));
}
