# Backend API Documentation

## **Technologies Used**
- **Express.js** → Framework to build APIs.
- **CORS** → Allows React to communicate with Node.js (CORS policy enforcement).
- **Mongoose** → ODM (Object Data Modeling) library for MongoDB.
- **dotenv** → Loads environment variables from a `.env` file.

---

## **What is Express.js?**
Express.js is a fast, minimal, and flexible Node.js web framework.
It helps in building backend APIs and web applications easily.
It provides powerful routing, middleware support, and simplifies handling requests & responses.

---

## **What is Mongoose?**
Mongoose is an ODM (Object Data Modeling) library for MongoDB in Node.js.
It helps interact with MongoDB using JavaScript objects instead of raw queries.
It provides a schema-based structure to define how data should be stored in MongoDB.

---

## **What is CORS?**
CORS (Cross-Origin Resource Sharing) is a security mechanism implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the web page.

### **Why is CORS Important?**
- In the context of React applications, CORS is crucial when the application needs to communicate with a backend API hosted on a different domain.
- Without CORS, browsers block such requests for security reasons.

---

## **Introduction to dotenv**
### **Why do we need dotenv in backend development?**
- When building applications, we often use sensitive data like database credentials, API keys, or secret tokens.
- Storing these directly in the code is unsafe and can lead to security issues if shared publicly.
- The `.env` file helps store such sensitive information securely and separately.

---

## **What is a Server?**
A server is a computer or system that provides services, resources, or data to other computers (clients) over a network. It can be physical hardware or a cloud-based virtual machine.

### **Types of Servers:**
1. **Web Server** – Hosts websites (e.g., Apache, Nginx).
2. **Database Server** – Stores and manages databases (e.g., MongoDB, MySQL).
3. **Application Server** – Runs applications (e.g., Node.js, Express.js).
4. **File Server** – Stores and shares files over a network.
5. **Cloud Server** – A virtual server hosted on the cloud (e.g., AWS, Google Cloud).

### **Example in MongoDB Context:**
- If you install MongoDB on your local machine, your computer acts as a MongoDB server.
- If you use MongoDB Atlas, your database is hosted on a cloud server managed by MongoDB.

---

## **MongoDB Connection String Format**

To connect a Node.js app to MongoDB Atlas, use the following format:

```plaintext
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database-name>?retryWrites=true&w=majority
```

### **Explanation:**
- **`<username>`** → Your MongoDB Atlas username.
- **`<password>`** → Your password (avoid special characters like `@, :, /` without encoding).
- **`cluster0.xxxxx.mongodb.net`** → Your MongoDB cluster address.
- **`<database-name>`** → The name of your database.

### **Example:**
If your username is `studentUser`, password is `pass123`, and database is `studentDB`, then:

```plaintext
MONGO_URI=mongodb+srv://studentUser:pass123@cluster0.xxxxx.mongodb.net/studentDB?retryWrites=true&w=majority
```

### **Best Practices:**
- Store the connection string in a `.env` file, not in your code.
- Use the `dotenv` package to load environment variables:

```javascript
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
```

---

## **MongoDB URI vs. URL**

### **What is a URI?**
A **URI (Uniform Resource Identifier)** is a general identifier for a resource. It can refer to a location (URL) or a name (URN).

**Example of a MongoDB URI:**
```plaintext
mongodb+srv://username:password@cluster0.mongodb.net/myDatabase
```
In MongoDB, the **connection string is called a URI** because it identifies the database location **and** includes authentication details.

### **What is a URL?**
A **URL (Uniform Resource Locator)** is a specific type of URI that provides a way to locate a resource, usually with a network address and protocol.

**Example of a URL:**
```plaintext
https://www.mongodb.com/docs/
```
This is a **URL** because it tells the browser exactly where to go on the web.

### **Why Does MongoDB Use "URI" Instead of "URL"?**
- A MongoDB **connection string** does not just specify a location; it also includes authentication details and options.
- Because it is more than just a "locator," it is referred to as a **MongoDB URI** instead of a URL.

### **Summary:**
- **Use "MongoDB URI"** when referring to your **database connection string**.
- **Use "URL"** when referring to a **web address**.

This distinction helps in understanding how MongoDB connections work.

---

## **What is a Schema?**
A **Schema** defines the structure of documents in a MongoDB collection. It acts as a blueprint for the data.

## **What is a Model?**
A **Model** is a wrapper around a Schema that allows us to interact with the database for CRUD operations.

### **Why Do We Need a Mongoose Schema If We Validate in the API?**  
Even if we check for validation inside the `POST` function, we **still need a Mongoose schema**. Here’s why:  

1. **Ensures Data Structure**  
   - The schema makes sure that the data stored in MongoDB follows a proper structure (e.g., name must be a string).  

2. **Adds Extra Validation**  
   - Mongoose provides built-in checks like:  
     - **Type validation** (e.g., name must be a string)  
     - **Required fields** (e.g., name cannot be empty)  
     - **Pattern matching** (e.g., name should contain only letters)  

3. **Prevents Bad Data from Entering the Database**  
   - Even if someone inserts data directly into MongoDB (outside the API), the schema will block invalid entries.  

4. **Supports Default Values & Unique Fields**  
   - You can set **default values** (e.g., if no profile picture is uploaded, use a default one).  
   - You can enforce **unique fields** (e.g., prevent duplicate emails).  

### **Final Answer:**  
Even if we validate in the API, **Mongoose schema is still needed** for extra protection and data consistency.

---

## **Base URL vs. Relative URL**

- **Base URL:** `https://www.facebook.com/`
- **Relative URL:** `/:username/:profile/:setting`

**Example:**
```json
{
  "username": "alice",
  "profile": "photos",
  "setting": "public"
}
```
The `:` before a word makes it a route parameter, meaning its value changes based on the request.

---

This defines a dynamic route with parameters:
:username → Represents the user’s name.
:profile → Represents profile details.
:setting → Represents a user setting (like privacy, notifications, etc.).
The : before a word makes it a route parameter, meaning its value changes based on the request.
