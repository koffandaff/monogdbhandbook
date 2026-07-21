/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Doc {
  _id: any;
  [key: string]: any;
}

export interface Index {
  name: string;
  key: Record<string, 1 | -1>;
  hidden: boolean;
}

export interface Coll {
  name: string;
  documents: Doc[];
  indexes: Index[];
}

export interface Db {
  name: string;
  collections: Coll[];
}

export interface ShellLine {
  type: "success" | "error" | "info" | "result" | "system";
  text: string;
  data?: any;
  ts: string;
  executionTime?: number;
  documentsReturned?: number;
  indexUsed?: string;
  stages?: { stage: string; time: number; docs: number }[];
}

export interface TabState {
  id: string;
  label: string;
  type: "mongosh" | "query" | "aggregation";
  lines: ShellLine[];
  input: string;
}

export interface AutocompleteSuggestion {
  text: string;
  description: string;
  category: string;
}

export interface HelpEntry {
  command: string;
  description: string;
  syntax: string;
  returns: string;
  example?: string;
  warnings?: string;
  related?: string[];
}

export interface SeedDataset {
  name: string;
  label: string;
  description: string;
  collections: { name: string; documents: Doc[] }[];
}
