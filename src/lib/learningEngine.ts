export function getLearningTip(input: string): { explanation: string; complexity: string; bestPractices: string[]; warnings: string[]; related: string[] } | null {
  const lower = input.toLowerCase();

  if (lower.includes(".find(")) {
    return {
      explanation: "Queries the collection for all documents matching the filter. Without a filter, returns every document (collection scan).",
      complexity: "O(n) without index, O(log n) with index",
      bestPractices: ["Always filter by indexed fields for production queries", "Use projections to limit returned fields", "Add .explain() to analyze query performance"],
      warnings: ["db.collection.find() without filter performs a full collection scan", "Avoid querying without indexes on large collections"],
      related: ["findOne()", "createIndex()", "explain()", "limit()"],
    };
  }

  if (lower.includes(".insertone(") || lower.includes(".insertmany(")) {
    return {
      explanation: "Inserts new documents into the collection. MongoDB automatically creates the collection if it doesn't exist and assigns a unique _id if not provided.",
      complexity: "O(1) per document",
      bestPractices: ["Always validate data before insertion", "Use insertMany() for bulk inserts — it's faster than multiple insertOne() calls", "Let MongoDB generate _id values unless you have a specific reason"],
      warnings: ["insertMany() will fail the entire batch if a document fails validation", "Maximum BSON document size is 16MB"],
      related: ["find()", "updateOne()", "deleteOne()", "createIndex()"],
    };
  }

  if (lower.includes(".updateone(") || lower.includes(".updatemany(")) {
    return {
      explanation: "Updates existing documents. Uses update operators like $set, $unset, $inc to modify specific fields without replacing the entire document.",
      complexity: "O(log n) with _id lookup, O(n) without index",
      bestPractices: ["Always use $set instead of replacing the whole document", "Use $inc for counter fields", "Use upsert: true to create if not exists"],
      warnings: ["updateMany() without filter will update ALL documents — use with extreme caution", "Without $set, the entire document is replaced"],
      related: ["replaceOne()", "deleteOne()", "find()"],
    };
  }

  if (lower.includes(".deleteone(") || lower.includes(".deletemany(")) {
    return {
      explanation: "Permanently removes documents from the collection. This operation cannot be undone.",
      complexity: "O(log n) with _id, O(n) without index",
      bestPractices: ["Always test with find() first to see which documents will match", "Use deleteOne() when you expect a single match", "Run countDocuments() first to understand the impact"],
      warnings: ["IRREVERSIBLE — deleted documents cannot be recovered without a backup", "deleteMany({}) with an empty filter deletes ALL documents"],
      related: ["find()", "updateMany()", "drop()", "db.dropDatabase()"],
    };
  }

  if (lower.includes("aggregate") || lower.includes("$match") || lower.includes("$group")) {
    return {
      explanation: "Aggregation pipeline processes documents through a series of stages. Each stage transforms the data before passing it to the next stage.",
      complexity: "O(n) per stage — pipeline performance depends on stage order",
      bestPractices: ["Place $match and $limit as early as possible to reduce document count", "Use $project to remove unused fields early", "Create indexes for fields used in $match and $sort"],
      warnings: ["$lookup can be slow without indexes on the foreign collection", "$unwind increases document count significantly", "Pipeline results are limited to 16MB per stage"],
      related: ["$match", "$group", "$sort", "$project", "$lookup", "createIndex()"],
    };
  }

  if (lower.includes("createindex") || lower.includes("ensureindex")) {
    return {
      explanation: "Creates an index to speed up queries. Indexes are data structures that store a small portion of the collection's data in an easy-to-traverse form.",
      complexity: "O(n log n) to build, O(log n) per query",
      bestPractices: ["Create indexes for fields used in query filters, sorts, and joins", "Use compound indexes for queries that filter on multiple fields", "Use .explain() to verify indexes are being used"],
      warnings: ["Every index slows down write operations (insert, update, delete)", "Too many indexes consume memory and disk space", "Index builds can impact production performance"],
      related: ["getIndexes()", "dropIndex()", "explain()", "find()"],
    };
  }

  if (lower.includes("explain")) {
    return {
      explanation: "Shows how MongoDB executes a query. Use it to understand whether indexes are being used and to identify slow queries.",
      complexity: "O(1) overhead",
      bestPractices: ["Always use explain() before optimizing queries", "Look for COLLSCAN (bad) vs IXSCAN (good) in the winning plan", "Check nReturned vs totalDocsExamined — they should be close"],
      warnings: ["explain() actually executes the query", "executionStats mode provides the most detail"],
      related: ["createIndex()", "find()", "sort()"],
    };
  }

  if (lower.includes("distinct")) {
    return {
      explanation: "Returns unique values for a specified field across a collection. Useful for understanding the range of values in your data.",
      complexity: "O(n) — scans all documents",
      bestPractices: ["Create an index on the field to speed up distinct queries", "Use with a filter to narrow the scope"],
      warnings: ["Without an index, distinct() scans the entire collection"],
      related: ["find()", "createIndex()"],
    };
  }

  return null;
}
