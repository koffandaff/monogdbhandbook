import { SeedDataset } from "./shellTypes";

export const SEED_DATASETS: SeedDataset[] = [
  {
    name: "students",
    label: "Student Records",
    description: "Students, courses, enrollments with grades",
    collections: [
      {
        name: "students",
        documents: [
          { _id: 1, name: "Alice Patel", city: "Ahmedabad", age: 19, email: "alice@example.com", enrolled: true, gpa: 3.8, joined: new Date("2024-01-15") },
          { _id: 2, name: "Bob Sharma", city: "Surat", age: 20, email: "bob@example.com", enrolled: true, gpa: 3.2, joined: new Date("2024-01-20") },
          { _id: 3, name: "Charlie Desai", city: "Ahmedabad", age: 18, email: "charlie@example.com", enrolled: false, gpa: 2.9, joined: new Date("2023-08-10") },
          { _id: 4, name: "Diana Mehta", city: "Rajkot", age: 21, email: "diana@example.com", enrolled: true, gpa: 3.9, joined: new Date("2024-06-01") },
          { _id: 5, name: "Eve Shah", city: "Ahmedabad", age: 20, email: "eve@example.com", enrolled: true, gpa: 3.5, joined: new Date("2024-02-10") },
          { _id: 6, name: "Frank Joshi", city: "Surat", age: 22, email: "frank@example.com", enrolled: false, gpa: 3.0, joined: new Date("2023-09-05") },
          { _id: 7, name: "Grace Trivedi", city: "Vadodara", age: 19, email: "grace@example.com", enrolled: true, gpa: 3.7, joined: new Date("2024-03-22") },
          { _id: 8, name: "Henry Kulkarni", city: "Ahmedabad", age: 23, email: "henry@example.com", enrolled: true, gpa: 3.1, joined: new Date("2023-11-18") },
        ],
      },
      {
        name: "courses",
        documents: [
          { _id: 101, title: "MongoDB Basics", credits: 3, instructor: "Dr. Shah", department: "CS" },
          { _id: 102, title: "Node.js Advanced", credits: 4, instructor: "Prof. Patel", department: "CS" },
          { _id: 103, title: "Express API Design", credits: 3, instructor: "Dr. Shah", department: "CS" },
          { _id: 104, title: "Database Theory", credits: 3, instructor: "Prof. Mehta", department: "CS" },
        ],
      },
      {
        name: "enrollments",
        documents: [
          { _id: 1001, studentId: 1, courseId: 101, grade: "A", semester: "Spring 2024" },
          { _id: 1002, studentId: 1, courseId: 102, grade: "B+", semester: "Spring 2024" },
          { _id: 1003, studentId: 2, courseId: 101, grade: "B", semester: "Spring 2024" },
          { _id: 1004, studentId: 3, courseId: 103, grade: "C+", semester: "Fall 2023" },
          { _id: 1005, studentId: 4, courseId: 101, grade: "A", semester: "Fall 2024" },
          { _id: 1006, studentId: 4, courseId: 104, grade: "A-", semester: "Fall 2024" },
          { _id: 1007, studentId: 5, courseId: 102, grade: "B+", semester: "Spring 2024" },
          { _id: 1008, studentId: 7, courseId: 103, grade: "A-", semester: "Spring 2024" },
        ],
      },
    ],
  },
  {
    name: "ecommerce",
    label: "E-Commerce Store",
    description: "Products, orders, customers with analytics",
    collections: [
      {
        name: "products",
        documents: [
          { _id: 201, name: "Wireless Mouse", category: "Electronics", price: 1299, stock: 45, rating: 4.5 },
          { _id: 202, name: "Mechanical Keyboard", category: "Electronics", price: 3499, stock: 20, rating: 4.8 },
          { _id: 203, name: "USB-C Hub", category: "Electronics", price: 899, stock: 100, rating: 4.2 },
          { _id: 204, name: "Cotton T-Shirt", category: "Fashion", price: 599, stock: 200, rating: 4.0 },
          { _id: 205, name: "Denim Jacket", category: "Fashion", price: 2499, stock: 30, rating: 4.6 },
          { _id: 206, name: "Running Shoes", category: "Sports", price: 4999, stock: 15, rating: 4.7 },
          { _id: 207, name: "Yoga Mat", category: "Sports", price: 799, stock: 50, rating: 4.3 },
        ],
      },
      {
        name: "orders",
        documents: [
          { _id: 301, customer: "Alice", items: [{ productId: 201, qty: 2 }, { productId: 203, qty: 1 }], total: 3497, status: "delivered", date: new Date("2024-11-01") },
          { _id: 302, customer: "Bob", items: [{ productId: 202, qty: 1 }], total: 3499, status: "shipped", date: new Date("2024-11-05") },
          { _id: 303, customer: "Charlie", items: [{ productId: 205, qty: 1 }, { productId: 204, qty: 3 }], total: 4296, status: "pending", date: new Date("2024-11-10") },
          { _id: 304, customer: "Diana", items: [{ productId: 206, qty: 1 }, { productId: 207, qty: 2 }], total: 6597, status: "delivered", date: new Date("2024-10-20") },
          { _id: 305, customer: "Eve", items: [{ productId: 201, qty: 1 }, { productId: 202, qty: 1 }, { productId: 203, qty: 1 }], total: 5697, status: "cancelled", date: new Date("2024-10-15") },
        ],
      },
      {
        name: "customers",
        documents: [
          { _id: 401, name: "Alice", email: "alice@shop.com", city: "Ahmedabad", totalSpent: 3497, memberSince: new Date("2023-01-01") },
          { _id: 402, name: "Bob", email: "bob@shop.com", city: "Surat", totalSpent: 3499, memberSince: new Date("2023-05-15") },
          { _id: 403, name: "Charlie", email: "charlie@shop.com", city: "Mumbai", totalSpent: 4296, memberSince: new Date("2024-02-20") },
          { _id: 404, name: "Diana", email: "diana@shop.com", city: "Ahmedabad", totalSpent: 6597, memberSince: new Date("2023-08-10") },
          { _id: 405, name: "Eve", email: "eve@shop.com", city: "Rajkot", totalSpent: 5697, memberSince: new Date("2024-01-05") },
        ],
      },
    ],
  },
  {
    name: "bookstore",
    label: "Bookstore",
    description: "Books, authors, reviews with inventory",
    collections: [
      {
        name: "books",
        documents: [
          { _id: 501, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Fiction", price: 399, inStock: true },
          { _id: 502, title: "Clean Code", author: "Robert C. Martin", year: 2008, genre: "Technology", price: 899, inStock: true },
          { _id: 503, title: "Design Patterns", author: "Gang of Four", year: 1994, genre: "Technology", price: 1299, inStock: false },
          { _id: 504, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "Fiction", price: 499, inStock: true },
          { _id: 505, title: "MongoDB: The Definitive Guide", author: "Kristina Chodorow", year: 2019, genre: "Technology", price: 1599, inStock: true },
        ],
      },
      {
        name: "reviews",
        documents: [
          { _id: 601, bookId: 501, rating: 4.5, comment: "Timeless classic", user: "reader1" },
          { _id: 602, bookId: 502, rating: 5.0, comment: "Every developer must read", user: "coder42" },
          { _id: 603, bookId: 503, rating: 4.0, comment: "Somewhat dated but foundational", user: "dev_guru" },
          { _id: 604, bookId: 505, rating: 4.5, comment: "Excellent MongoDB reference", user: "db_admin" },
          { _id: 605, bookId: 501, rating: 5.0, comment: "Masterpiece", user: "lit_lover" },
        ],
      },
    ],
  },
  {
    name: "socialmedia",
    label: "Social Media",
    description: "Users, posts, comments with likes and follows",
    collections: [
      {
        name: "users",
        documents: [
          { _id: 701, username: "tech_ninja", name: "Rahul", followers: 1200, joined: new Date("2023-06-01") },
          { _id: 702, username: "code_wizard", name: "Priya", followers: 3400, joined: new Date("2022-11-15") },
          { _id: 703, username: "data_geek", name: "Amit", followers: 890, joined: new Date("2024-03-20") },
          { _id: 704, username: "web_dev", name: "Neha", followers: 2100, joined: new Date("2023-09-01") },
        ],
      },
      {
        name: "posts",
        documents: [
          { _id: 801, userId: 701, content: "Just deployed my first MERN app!", likes: 156, tags: ["mongodb", "react"], createdAt: new Date("2024-11-01") },
          { _id: 802, userId: 702, content: "Understanding aggregation pipelines is key to MongoDB mastery", likes: 234, tags: ["mongodb", "aggregation"], createdAt: new Date("2024-11-03") },
          { _id: 803, userId: 703, content: "NoSQL vs SQL — when to use what?", likes: 89, tags: ["database", "architecture"], createdAt: new Date("2024-11-05") },
          { _id: 804, userId: 701, content: "Express middleware explained in 2 minutes", likes: 312, tags: ["express", "nodejs"], createdAt: new Date("2024-11-07") },
          { _id: 805, userId: 704, content: "My favorite MongoDB tools in 2024", likes: 178, tags: ["mongodb", "tools"], createdAt: new Date("2024-11-10") },
        ],
      },
    ],
  },
  {
    name: "banking",
    label: "Banking System",
    description: "Accounts, transactions, branches with financial data",
    collections: [
      {
        name: "accounts",
        documents: [
          { _id: 901, accountNo: "ACC001", holder: "Rajesh Patel", type: "savings", balance: 125000, branch: "AHM-01", active: true },
          { _id: 902, accountNo: "ACC002", holder: "Smita Shah", type: "current", balance: 450000, branch: "SUR-01", active: true },
          { _id: 903, accountNo: "ACC003", holder: "Vikram Desai", type: "savings", balance: 28000, branch: "AHM-01", active: true },
          { _id: 904, accountNo: "ACC004", holder: "Pooja Mehta", type: "savings", balance: 670000, branch: "RJT-01", active: false },
          { _id: 905, accountNo: "ACC005", holder: "Karan Joshi", type: "current", balance: 890000, branch: "SUR-01", active: true },
        ],
      },
      {
        name: "transactions",
        documents: [
          { _id: 1001, from: "ACC001", to: "ACC002", amount: 15000, type: "transfer", date: new Date("2024-10-01"), status: "completed" },
          { _id: 1002, from: "ACC005", to: "ACC003", amount: 5000, type: "transfer", date: new Date("2024-10-05"), status: "completed" },
          { _id: 1003, from: "ACC001", to: "ACC004", amount: 20000, type: "transfer", date: new Date("2024-10-10"), status: "failed" },
          { _id: 1004, from: "ACC002", to: "ACC005", amount: 100000, type: "transfer", date: new Date("2024-10-15"), status: "completed" },
          { _id: 1005, from: "ACC003", to: "ACC001", amount: 3000, type: "transfer", date: new Date("2024-10-20"), status: "completed" },
          { _id: 1006, from: "ACC005", to: "ACC001", amount: 75000, type: "transfer", date: new Date("2024-10-25"), status: "pending" },
        ],
      },
    ],
  },
];
