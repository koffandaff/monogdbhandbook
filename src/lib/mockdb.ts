/* eslint-disable @typescript-eslint/no-explicit-any */
import { Doc, Coll, Db, ShellLine, Index } from "./shellTypes";
import { SEED_DATASETS } from "./sampleData";
import { ALL_HELP } from "./shellHelp";

function ts(): string {
  return new Date().toLocaleTimeString();
}

function randMs(min = 2, max = 45): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cloneDocs(docs: Doc[]): Doc[] {
  return JSON.parse(JSON.stringify(docs));
}

export class MockDB {
  private databases: Db[] = [
    {
      name: "myNewDatabase",
      collections: [],
    },
  ];
  private _activeDb = "myNewDatabase";
  private history: string[] = [];

  get activeDb(): string {
    return this._activeDb;
  }

  get dbs(): Db[] {
    return this.databases;
  }

  get currentDb(): Db | undefined {
    return this.databases.find((d) => d.name === this._activeDb);
  }

  get commandHistory(): string[] {
    return [...this.history];
  }

  private ensureDb(name: string): Db {
    let db = this.databases.find((d) => d.name === name);
    if (!db) {
      db = { name, collections: [] };
      this.databases.push(db);
    }
    return db;
  }

  private ensureColl(dbName: string, collName: string): Coll {
    const db = this.ensureDb(dbName);
    let coll = db.collections.find((c) => c.name === collName);
    if (!coll) {
      coll = { name: collName, documents: [], indexes: [{ name: "_id_", key: { _id: 1 }, hidden: false }] };
      db.collections.push(coll);
    }
    return coll;
  }

  private parseCollName(input: string): string | null {
    const m = input.match(/db\.(\w+)\./);
    return m ? m[1] : null;
  }

  private extractFilter(input: string): any {
    try {
      const m = input.match(/\.(?:find|findOne|updateOne|updateMany|deleteOne|deleteMany|countDocuments)\s*\(\s*(\{.+?\})\s*[,)]/);
      if (m) return JSON.parse(m[1]);
    } catch {}
    try {
      const m = input.match(/\.(?:find|findOne)\s*\(\s*(\{.+?\})\s*\)/);
      if (m) return JSON.parse(m[1]);
    } catch {}
    return {};
  }

  private extractUpdate(input: string): any {
    try {
      const m = input.match(/\.(?:updateOne|updateMany)\s*\(\s*\{.+?\}\s*,\s*(\{.+?\})\s*[,)]/);
      if (m) return JSON.parse(m[1]);
    } catch {}
    return {};
  }

  private matchDocs(docs: Doc[], filter: Record<string, any>): Doc[] {
    if (!filter || Object.keys(filter).length === 0) return cloneDocs(docs);
    return cloneDocs(docs).filter((doc) => {
      for (const [key, condition] of Object.entries(filter)) {
        if (key === "$or" && Array.isArray(condition)) {
          const ok = condition.some((sub: any) => this.matchDocs([doc as Doc], sub).length > 0);
          if (!ok) return false;
          continue;
        }
        if (key === "$and" && Array.isArray(condition)) {
          const ok = condition.every((sub: any) => this.matchDocs([doc as Doc], sub).length > 0);
          if (!ok) return false;
          continue;
        }
        if (typeof condition === "object" && condition !== null && !Array.isArray(condition)) {
          const val = (doc as any)[key];
          for (const [op, rawArg] of Object.entries(condition)) {
            const arg = rawArg as any;
            if (op === "$gt") { if (!(val > arg)) return false; }
            else if (op === "$gte") { if (!(val >= arg)) return false; }
            else if (op === "$lt") { if (!(val < arg)) return false; }
            else if (op === "$lte") { if (!(val <= arg)) return false; }
            else if (op === "$ne") { if (val === arg) return false; }
            else if (op === "$in") { if (!(Array.isArray(arg) && arg.includes(val))) return false; }
            else if (op === "$nin") { if (Array.isArray(arg) && arg.includes(val)) return false; }
            else if (op === "$exists") { if (arg === true ? val === undefined : val !== undefined) return false; }
          }
        } else {
          if ((doc as any)[key] !== condition) return false;
        }
      }
      return true;
    });
  }

  private buildExplain(collName: string, filter: any, docsExamined: number, nReturned: number, ms: number): any {
    const hasIndex = Object.keys(filter).some((k) => k !== "$or" && k !== "$and");
    return {
      queryPlanner: {
        namespace: `${this._activeDb}.${collName}`,
        winningPlan: {
          stage: hasIndex ? "FETCH" : "COLLSCAN",
          ...(hasIndex ? { inputStage: { stage: "IXSCAN", keyPattern: { [Object.keys(filter)[0]]: 1 }, indexName: `${Object.keys(filter)[0]}_1` } } : {}),
        },
        rejectedPlans: [],
      },
      executionStats: {
        nReturned,
        totalDocsExamined: docsExamined,
        executionTimeMillis: ms,
        totalKeysExamined: hasIndex ? nReturned : 0,
        executionStages: {
          stage: hasIndex ? "FETCH" : "COLLSCAN",
          nReturned,
          docsExamined,
          inputStages: hasIndex ? [{ stage: "IXSCAN", nReturned, docsExamined: nReturned }] : [],
        },
      },
    };
  }

  private buildPipeline(pipeStr: string): any[] {
    try {
      const m = pipeStr.match(/\[([\s\S]*?)\]/);
      if (m) return JSON.parse(m[1]);
    } catch {}
    return [];
  }

  execute(input: string): ShellLine[] {
    const trimmed = input.trim();
    if (!trimmed) return [];
    this.history.push(trimmed);

    const lower = trimmed.toLowerCase();
    const lines: ShellLine[] = [];
    const ms = randMs();

    const text = (type: ShellLine["type"], t: string, extra?: Partial<ShellLine>) => lines.push({ type, text: t, ts: ts(), ...extra });

    // Utility commands
    if ((lower === "clear" || lower === "cls") && input.trim() === "clear" || input.trim() === "cls") {
      return [{ type: "system", text: "CLEAR", ts: ts() }];
    }

    if (lower === "history") {
      text("info", "Command History:");
      this.history.slice(-20).reverse().forEach((cmd, i) => {
        text("info", `  ${this.history.length - i}  ${cmd}`);
      });
      return lines;
    }

    // Seed command
    if (lower.startsWith("seed ")) {
      const name = trimmed.substring(5).trim().toLowerCase();
      const ds = SEED_DATASETS.find((s) => s.name === name);
      if (!ds) {
        text("error", `Unknown dataset "${name}". Available: ${SEED_DATASETS.map((s) => s.name).join(", ")}`);
        return lines;
      }
      const db = this.ensureDb(ds.name);
      let totalDocs = 0;
      for (const coll of ds.collections) {
        const existing = db.collections.find((c) => c.name === coll.name);
        if (existing) {
          existing.documents.push(...cloneDocs(coll.documents));
        } else {
          db.collections.push({ name: coll.name, documents: cloneDocs(coll.documents), indexes: [{ name: "_id_", key: { _id: 1 }, hidden: false }] });
        }
        totalDocs += coll.documents.length;
      }
      this._activeDb = ds.name;
      text("success", `Loaded "${ds.label}" — ${ds.collections.length} collections, ${totalDocs} documents`);
      text("info", `Switched to db: ${ds.name}`);
      ds.collections.forEach((c) => text("info", `  \u2514 ${c.name} (${c.documents.length} docs)`));
      return lines;
    }

    // Help
    if (lower === "help" || lower === "?") {
      text("success", "\u2709\ufe0f MongoDB Playground Help");
      text("info", `\u2501`.repeat(40));
      text("info", "");
      text("info", "DATABASE");
      ["show dbs", "use <db>", "db.stats()", "db.dropDatabase()"].forEach((c) => text("info", `  ${c}`));
      text("info", "");
      text("info", "COLLECTIONS / CRUD");
      ["find()", "findOne()", "insertOne()", "insertMany()", "updateOne()", "updateMany()", "deleteOne()", "deleteMany()", "countDocuments()", "distinct()"].forEach((c) => text("info", `  db.collection.${c}`));
      text("info", "");
      text("info", "CURSORS");
      ["sort()", "limit()", "skip()", "pretty()"].forEach((c) => text("info", `  .${c}`));
      text("info", "");
      text("info", "AGGREGATION");
      ["aggregate([...])", "$match", "$group", "$sort", "$project", "$lookup"].forEach((c) => text("info", `  ${c}`));
      text("info", "");
      text("info", "INDEXES");
      ["createIndex()", "getIndexes()", "dropIndex()"].forEach((c) => text("info", `  db.collection.${c}`));
      text("info", "");
      text("info", "UTILITIES");
      ["clear / cls", "history", "seed <dataset>", "help <command>"].forEach((c) => text("info", `  ${c}`));
      text("info", "");
      text("info", "SHORTCUTS");
      text("info", "  \u23ce Enter  Run");
      text("info", "  \u2191 \u2193  History");
      text("info", "");
      text("info", 'Type "help <command>" for detailed help');
      return lines;
    }

    if (lower.startsWith("help ")) {
      const q = trimmed.substring(5).trim().toLowerCase();
      const results = ALL_HELP.filter((h) => h.command.toLowerCase().includes(q) || h.description.toLowerCase().includes(q));
      if (results.length === 0) {
        text("error", `No help available for "${q}"`);
        text("info", "Try: help, help find, help aggregate, help createIndex");
        return lines;
      }
      for (const h of results) {
        text("success", `${h.command}`);
        text("info", `  ${h.description}`);
        text("info", `  Syntax: ${h.syntax}`);
        text("info", `  Returns: ${h.returns}`);
        if (h.example) text("info", `  Example: ${h.example.replace(/\n/g, "  ")}`);
        if (h.warnings) text("info", `  \u26a0\ufe0f ${h.warnings}`);
        if (h.related) text("info", `  Related: ${h.related.join(", ")}`);
        text("info", "");
      }
      return lines;
    }

    // show dbs
    if (lower === "show dbs" || lower === "show databases") {
      text("success", `Databases (${this.databases.length}):`);
      this.databases.forEach((db) => {
        const collCount = db.collections.length;
        const docCount = db.collections.reduce((s, c) => s + c.documents.length, 0);
        text("info", `  ${db.name}  ${collCount} collections, ${docCount} documents`);
      });
      return lines;
    }

    // use <db>
    if (lower.startsWith("use ")) {
      const dbName = trimmed.substring(4).trim();
      if (!dbName) {
        text("error", "Usage: use <databaseName>");
        return lines;
      }
      this.ensureDb(dbName);
      this._activeDb = dbName;
      text("success", `Switched to db: ${dbName}`);
      return lines;
    }

    // show collections
    if (lower.startsWith("show collections")) {
      const db = this.currentDb;
      if (!db || db.collections.length === 0) {
        text("info", "No collections in this database.");
        return lines;
      }
      text("success", `Collections in ${this._activeDb}:`);
      db.collections.forEach((c) => text("info", `  ${c.name}  (${c.documents.length} docs)`));
      return lines;
    }

    // db.stats()
    if (lower.includes(".stats(") && lower.includes("db.") && !lower.includes("collection") && !lower.match(/db\.\w+\.stats/)) {
      const db = this.currentDb;
      const collCount = db?.collections.length || 0;
      const docCount = db?.collections.reduce((s, c) => s + c.documents.length, 0) || 0;
      text("success", `Database: ${this._activeDb}`);
      text("info", `  Collections:  ${collCount}`);
      text("info", `  Documents:    ${docCount}`);
      text("info", `  Avg Doc Size: ~256 bytes`);
      text("info", `  Data Size:    ~${Math.max(1, docCount * 256 / 1024).toFixed(1)} KB`);
      return lines;
    }

    // db.dropDatabase()
    if (lower.includes("dropdatabase")) {
      const name = this._activeDb;
      this.databases = this.databases.filter((d) => d.name !== name);
      this.ensureDb(name);
      text("success", `Database "${name}" dropped.`);
      text("info", `Switched to empty database: ${name}`);
      return lines;
    }

    // db.dropCollection ?
    if (lower.includes(".drop(")) {
      const collName = this.parseCollName(trimmed);
      if (collName) {
        const db = this.currentDb;
        if (db) {
          db.collections = db.collections.filter((c) => c.name !== collName);
          text("success", `Collection "${collName}" dropped.`);
        }
      }
      return lines;
    }

    // Explain
    if (lower.includes(".explain(") || lower.includes("explain()")) {
      const collName = this.parseCollName(trimmed);
      if (collName) {
        const filter = this.extractFilter(trimmed);
        const coll = this.currentDb?.collections.find((c) => c.name === collName);
        const totalDocs = coll ? coll.documents.length : 0;
        const nReturned = totalDocs;
        const explain = this.buildExplain(collName, filter, totalDocs, nReturned, ms);
        text("success", "Query Execution Plan:");
        text("result", JSON.stringify(explain, null, 2));
        text("info", `  Winning Plan: ${explain.queryPlanner.winningPlan.stage}`);
        text("info", `  Documents Examined: ${explain.executionStats.totalDocsExamined}`);
        text("info", `  Documents Returned: ${explain.executionStats.nReturned}`);
        text("info", `  Execution Time: ${explain.executionStats.executionTimeMillis}ms`);
      }
      return lines;
    }

    // Aggregate
    if (lower.includes(".aggregate(") || (lower.includes("aggregate") && (lower.includes("$match") || lower.includes("$group") || lower.includes("[")))) {
      const collName = this.parseCollName(trimmed);
      const db = this.currentDb;
      let coll: Coll | undefined;
      if (collName && db) coll = db.collections.find((c) => c.name === collName);

      if (coll && coll.documents.length > 0) {
        const stages = this.buildPipeline(trimmed);
        let results = cloneDocs(coll.documents);
        const stageDetails: { stage: string; time: number; docs: number }[] = [];

        for (const stage of stages) {
          const stageMs = randMs(1, 10);
          const stageName = Object.keys(stage)[0];
          const stageVal = stage[stageName];

          if (stageName === "$match") {
            results = this.matchDocs(results, stageVal);
          } else if (stageName === "$limit") {
            results = results.slice(0, stageVal);
          } else if (stageName === "$skip") {
            results = results.slice(stageVal);
          } else if (stageName === "$sort") {
            const [field, dir] = (Object.entries(stageVal as any)[0] || []) as [string, any];
            results.sort((a: any, b: any) => (dir === -1 ? -1 : 1) * ((a[field] || 0) > (b[field] || 0) ? 1 : -1));
          } else if (stageName === "$group") {
            const idExpr = stageVal._id;
            const groupField = typeof idExpr === "string" ? idExpr.replace("$", "") : null;
            const groups: Record<string, any> = {};
            for (const doc of results) {
              const key = groupField ? String((doc as any)[groupField] || "null") : "null";
              if (!groups[key]) groups[key] = { _id: groupField ? (doc as any)[groupField] || null : null };
              for (const [k, v] of Object.entries(stageVal as any)) {
                if (k === "_id") continue;
                const acc: any = v;
                if (acc.$sum) groups[key][k] = (groups[key][k] || 0) + (typeof acc.$sum === "number" ? acc.$sum : Number((doc as any)[acc.$sum] || 0));
                if (acc.$avg) {
                  groups[key][k] = groups[key][k] || { sum: 0, count: 0 };
                  groups[key][k].sum += Number((doc as any)[acc.$avg] || 0);
                  groups[key][k].count += 1;
                }
              }
            }
            results = Object.values(groups);
            for (const g of results) {
              for (const [k, v] of Object.entries(g as any)) {
                const val = v as any;
                if (val && typeof val === "object" && "sum" in val && "count" in val) (g as any)[k] = val.sum / val.count;
              }
            }
          } else if (stageName === "$project") {
            results = results.map((doc: any) => {
              const projected: any = {};
              for (const [k, v] of Object.entries(stageVal as any)) {
                if (v === 1) projected[k] = doc[k];
                else if (v === 0) continue;
                else if (typeof v === "string" && v.startsWith("$")) {
                  projected[k] = doc[v.replace("$", "")];
                } else projected[k] = v;
              }
              if (!stageVal._id || stageVal._id !== 0) projected._id = doc._id;
              return projected;
            });
          } else if (stageName === "$count") {
            results = [{ _id: null, [stageVal as string]: results.length }] as Doc[];
          } else if (stageName === "$unwind") {
            const path = typeof stageVal === "string" ? stageVal.replace("$", "") : stageVal?.path?.replace("$", "");
            if (path) {
              const unwound: any[] = [];
              for (const doc of results) {
                const arr = (doc as any)[path];
                if (Array.isArray(arr)) {
                  for (const item of arr) unwound.push({ ...doc, [path]: item });
                } else unwound.push(doc);
              }
              results = unwound;
            }
          }

          stageDetails.push({ stage: stageName, time: stageMs, docs: results.length });
        }

        text("success", `Aggregation Pipeline (${stages.length} stages, ${ms}ms):`, { executionTime: ms, documentsReturned: results.length });
        stageDetails.forEach((s) => text("info", `  \u2514 ${s.stage}  ${s.docs} docs  ${s.time}ms`));

        if (results.length === 0) {
          text("info", "  (empty result set)");
        } else if (results.length <= 10) {
          results.forEach((r) => text("result", JSON.stringify(r, null, 2)));
        } else {
          text("info", `Showing first 10 of ${results.length} results:`);
          results.slice(0, 10).forEach((r) => text("result", JSON.stringify(r, null, 2)));
        }
      } else {
        text("success", "Aggregation Pipeline Result:");
        text("result", JSON.stringify([
          { _id: "Electronics", totalAmount: 132000, avgAmount: 33000 },
          { _id: "Fashion", totalAmount: 9500, avgAmount: 3167 },
        ], null, 2));
        text("info", "  Tip: Use seed ecommerce for live aggregation data");
      }
      return lines;
    }

    // CRUD operations
    const collName = this.parseCollName(trimmed);

    // insertOne
    if (lower.includes(".insertone(")) {
      if (collName) {
        const coll = this.ensureColl(this._activeDb, collName);
        const docsToInsert = lower.includes("sample") ? SEED_DATASETS[0].collections[0].documents : [{ _id: Date.now(), name: "New Document", inserted: true }];
        coll.documents.push(...cloneDocs(docsToInsert));
        const count = docsToInsert.length;
        text("success", `Inserted ${count} document(s) into "${collName}"`);
        text("info", `  Collection now has ${coll.documents.length} documents`);
        if (count === 1) text("result", JSON.stringify({ acknowledged: true, insertedId: docsToInsert[0]._id }, null, 2));
      }
      return lines;
    }

    // insertMany
    if (lower.includes(".insertmany(")) {
      if (collName) {
        const coll = this.ensureColl(this._activeDb, collName);
        const docsToInsert = lower.includes("sample") ? SEED_DATASETS[0].collections[0].documents : [{ _id: Date.now() + 1, name: "Doc 1" }, { _id: Date.now() + 2, name: "Doc 2" }];
        coll.documents.push(...cloneDocs(docsToInsert));
        const count = docsToInsert.length;
        text("success", `Inserted ${count} document(s) into "${collName}"`);
        text("info", `  Collection now has ${coll.documents.length} documents`);
      }
      return lines;
    }

    // find / findOne
    if (lower.includes(".find(") || lower.includes(".findone(")) {
      if (collName) {
        const coll = this.currentDb?.collections.find((c) => c.name === collName);
        if (!coll || coll.documents.length === 0) {
          text("info", `Collection "${collName}" is empty.`);
          if (collName === "students" || collName === "products" || collName === "orders") {
            text("info", `  Use: seed ${collName === "students" ? "students" : collName === "products" ? "ecommerce" : "ecommerce"}`);
          }
          return lines;
        }
        const filter = this.extractFilter(trimmed);
        let results = this.matchDocs(coll.documents, filter);
        const isFindOne = lower.includes(".findone(");
        if (isFindOne) results = results.slice(0, 1);
        text("success", `Found ${results.length} document(s) in "${collName}"`, { documentsReturned: results.length, executionTime: ms, indexUsed: Object.keys(filter).length > 0 ? "IXSCAN" : "COLLSCAN" });
        if (results.length <= 10) {
          results.forEach((r) => text("result", JSON.stringify(r, null, 2)));
        } else {
          text("info", `Showing first 10 of ${results.length} results:`);
          results.slice(0, 10).forEach((r) => text("result", JSON.stringify(r, null, 2)));
        }
      }
      return lines;
    }

    // updateOne / updateMany
    if (lower.includes(".updateone(") || lower.includes(".updatemany(")) {
      if (collName) {
        const coll = this.currentDb?.collections.find((c) => c.name === collName);
        if (!coll) { text("error", `Collection "${collName}" not found.`); return lines; }
        const filter = this.extractFilter(trimmed);
        const update = this.extractUpdate(trimmed);
        const matched = this.matchDocs(coll.documents, filter);
        const isMany = lower.includes(".updatemany(");
        const modified = isMany ? matched.length : Math.min(matched.length, 1);
        text("success", `Matched ${matched.length} document(s), modified ${modified} document(s)`);
        text("info", `  Filter: ${JSON.stringify(filter)}`);
        text("info", `  Update: ${JSON.stringify(update)}`);
      }
      return lines;
    }

    // deleteOne / deleteMany
    if (lower.includes(".deleteone(") || lower.includes(".deletemany(")) {
      if (collName) {
        const coll = this.currentDb?.collections.find((c) => c.name === collName);
        if (!coll) { text("error", `Collection "${collName}" not found.`); return lines; }
        const filter = this.extractFilter(trimmed);
        const matched = this.matchDocs(coll.documents, filter);
        const isMany = lower.includes(".deletemany(");
        const removed = isMany ? matched.length : Math.min(matched.length, 1);
        text("success", `Deleted ${removed} document(s) from "${collName}"`);
        text("info", `  Filter: ${JSON.stringify(filter)}`);
        text("info", `  Collection now has ${coll.documents.length - removed} documents`);
      }
      return lines;
    }

    // replaceOne
    if (lower.includes(".replaceone(")) {
      if (collName) {
        text("success", `Replaced 1 document in "${collName}"`);
      }
      return lines;
    }

    // countDocuments / estimatedDocumentCount
    if (lower.includes(".countdocuments(") || lower.includes(".estimateddocumentcount(")) {
      if (collName) {
        const coll = this.currentDb?.collections.find((c) => c.name === collName);
        if (!coll) { text("info", "Count: 0"); return lines; }
        const filter = this.extractFilter(trimmed);
        const count = Object.keys(filter).length > 0 ? this.matchDocs(coll.documents, filter).length : coll.documents.length;
        text("success", `Count: ${count}`);
      }
      return lines;
    }

    // distinct
    if (lower.includes(".distinct(")) {
      if (collName) {
        const coll = this.currentDb?.collections.find((c) => c.name === collName);
        const fieldMatch = trimmed.match(/\.distinct\s*\(\s*["'](\w+)["']\s*\)/);
        if (fieldMatch && coll) {
          const field = fieldMatch[1];
          const values = [...new Set(coll.documents.map((d: any) => (d as any)[field]).filter((v) => v !== undefined))];
          text("success", `Distinct values for "${field}":`);
          text("result", JSON.stringify(values, null, 2));
        }
      }
      return lines;
    }

    // renameCollection
    if (lower.includes(".renamecollection(")) {
      if (collName) {
        text("success", `Collection "${collName}" renamed.`);
      }
      return lines;
    }

    // createCollection
    if (lower.includes("createcollection")) {
      const m = trimmed.match(/createCollection\s*\(\s*["'](\w+)["']\s*\)/);
      const name = m ? m[1] : "newCollection";
      this.ensureColl(this._activeDb, name);
      text("success", `Collection "${name}" created.`);
      return lines;
    }

    // Indexes
    if (lower.includes(".createindex(") || lower.includes("createindex(")) {
      if (collName) {
        const coll = this.ensureColl(this._activeDb, collName);
        const fieldMatch = trimmed.match(/\{(\s*\w+\s*:\s*-?\s*1\s*)\}/);
        const field = fieldMatch ? fieldMatch[1].replace(/\s/g, "").split(":")[0] : "field";
        const idxName = `${field}_1`;
        if (!coll.indexes.find((i) => i.name === idxName)) {
          coll.indexes.push({ name: idxName, key: { [field]: 1 }, hidden: false });
        }
        text("success", `Index created: "${idxName}" on "${collName}"`);
        text("info", `  Key: { ${field}: 1 }`);
        text("info", `  Collection now has ${coll.indexes.length} index(es)`);
      }
      return lines;
    }

    if (lower.includes(".getindexes(") || lower.includes("getindexes(")) {
      if (collName) {
        const coll = this.currentDb?.collections.find((c) => c.name === collName);
        if (coll) {
          text("success", `Indexes on "${collName}":`);
          coll.indexes.forEach((idx) => text("result", JSON.stringify({ v: 2, key: idx.key, name: idx.name, hidden: idx.hidden }, null, 2)));
        } else {
          text("success", "Indexes:");
          text("result", JSON.stringify([{ v: 2, key: { _id: 1 }, name: "_id_" }], null, 2));
        }
      }
      return lines;
    }

    if (lower.includes(".dropindex(")) {
      if (collName) {
        text("success", `Index dropped from "${collName}"`);
      }
      return lines;
    }

    if (lower.includes("dropindexes(")) {
      if (collName) {
        text("success", `All non-_id indexes dropped from "${collName}"`);
      }
      return lines;
    }

    // Cursor methods (chained)
    if (lower.includes(".sort(") || lower.includes(".limit(") || lower.includes(".skip(") || lower.includes(".pretty(")) {
      if (collName) {
        const coll = this.currentDb?.collections.find((c) => c.name === collName);
        if (!coll || coll.documents.length === 0) {
          text("info", `Collection "${collName}" is empty.`);
          return lines;
        }
        let results = cloneDocs(coll.documents);
        if (lower.includes(".sort(")) {
          const fieldMatch = trimmed.match(/\{(\s*\w+\s*:\s*-?\s*1\s*)\}/);
          if (fieldMatch) {
            const [f, d] = fieldMatch[1].replace(/\s/g, "").split(":");
            const dir = parseInt(d) === -1 ? -1 : 1;
            results.sort((a: any, b: any) => dir * (((a as any)[f] || 0) > ((b as any)[f] || 0) ? 1 : -1));
          }
        }
        if (lower.includes(".skip(")) {
          const m = trimmed.match(/\.skip\s*\(\s*(\d+)\s*\)/);
          if (m) results = results.slice(parseInt(m[1]));
        }
        if (lower.includes(".limit(")) {
          const m = trimmed.match(/\.limit\s*\(\s*(\d+)\s*\)/);
          if (m) results = results.slice(0, parseInt(m[1]));
        }
        text("success", `Found ${results.length} document(s) (sorted/limited):`);
        results.forEach((r) => text("result", JSON.stringify(r, null, 2)));
      }
      return lines;
    }

    // Default: unrecognized
    text("error", `Command not recognized: ${trimmed}`);
    text("info", "Type `help` for available commands.");

    return lines;
  }

  // Get collections for sidebar
  getCollections(): { dbName: string; collName: string; docCount: number }[] {
    const result: { dbName: string; collName: string; docCount: number }[] = [];
    for (const db of this.databases) {
      for (const coll of db.collections) {
        result.push({ dbName: db.name, collName: coll.name, docCount: coll.documents.length });
      }
    }
    return result;
  }

  getCollectionDocs(dbName: string, collName: string): Doc[] {
    return cloneDocs(this.databases.find((d) => d.name === dbName)?.collections.find((c) => c.name === collName)?.documents || []);
  }

  getCollectionIndexes(dbName: string, collName: string): Index[] {
    return [...(this.databases.find((d) => d.name === dbName)?.collections.find((c) => c.name === collName)?.indexes || [])];
  }
}
