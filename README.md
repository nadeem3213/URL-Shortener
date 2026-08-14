# 🔗 URL Shortener

A full-stack URL Shortener web application built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can sign up, log in, shorten long URLs, and track how many times each short link has been visited — all behind a secure JWT-based authentication system.

---

## 🚀 Features

- **User Authentication** — Sign up and log in with email & password
- **JWT Sessions** — Secure stateless authentication using JSON Web Tokens stored in cookies
- **URL Shortening** — Generate a unique short ID for any long URL
- **Click Tracking** — Every visit to a short URL is recorded with a timestamp
- **User-scoped URLs** — Each logged-in user only sees the URLs they created
- **Error Feedback** — Clear error messages for wrong password or unregistered email on the login page

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB (via Mongoose) |
| Templating | EJS (Embedded JavaScript) |
| Authentication | JSON Web Tokens (JWT) |
| Session Storage | HTTP Cookies (`cookie-parser`) |
| Short ID Generation | `shortid` / `uuid` |
| Dev Server | Nodemon |

---

## 📁 Project Structure

```
urlshortner/
│
├── controllers/
│   └── user.js          # Signup & login logic
│
├── middlewares/
│   └── auth.js          # JWT auth middleware (restrictToLoggedinUserOnly, checkAuth)
│
├── models/
│   ├── url.js           # Mongoose schema for shortened URLs
│   └── user.js          # Mongoose schema for users
│
├── routes/
│   ├── staticRouter.js  # GET routes for rendering pages (/, /login, /signup)
│   ├── url.js           # POST /url — create short URL
│   └── user.js          # POST /user — signup, POST /user/login — login
│
├── service/
│   └── auth.js          # JWT sign (setUser) and verify (getUser) helpers
│
├── views/
│   ├── home.ejs         # Dashboard — URL shortener form + history table
│   ├── login.ejs        # Login page with error message support
│   └── signup.ejs       # Signup page
│
├── connect.js           # MongoDB connection helper
├── index.js             # App entry point — Express setup, routes, redirect handler
├── package.json
└── README.md
```

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `express` | ^5.2.1 | Web framework — routing, middleware, request/response handling |
| `mongoose` | ^9.9.2 | MongoDB ODM — schema definitions and database queries |
| `ejs` | ^5.0.2 | Server-side HTML templating engine |
| `jsonwebtoken` | ^9.0.3 | Generating and verifying JWT tokens for authentication |
| `cookie-parser` | ^1.4.7 | Parsing cookies from incoming requests |
| `cookie` | ^2.0.1 | Low-level cookie utilities |
| `shortid` | ^2.2.17 | Generating short, unique URL IDs |
| `uuid` | ^13.0.2 | Generating universally unique identifiers |
| `nanoid` | ^5.1.6 | Alternative compact unique ID generator |
| `nodemon` | ^3.1.14 | Auto-restarts the server on file changes during development |
| `parser` | ^0.1.4 | Utility parser package |

---

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/urlshortner.git
   cd urlshortner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Make sure MongoDB is running**
   ```bash
   mongod
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   The server will start at **http://localhost:8000**

---

## 🔐 How Authentication Works

1. On **signup**, user details are saved to MongoDB.
2. On **login**, the server looks up the email first:
   - If email not found → *"You have not signed up yet. Please sign up first."*
   - If password is wrong → *"Invalid password. Please try again."*
3. On successful login, a **JWT token** is signed with the user's `_id` and `email`, then stored in a browser cookie named `uid`.
4. Protected routes (`/url`, `/`) use the `restrictToLoggedinUserOnly` middleware, which verifies the cookie JWT before granting access.

---

## 🌐 API Routes

| Method | Route | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Home dashboard with URL list | ✅ Yes |
| GET | `/signup` | Signup page | ❌ No |
| GET | `/login` | Login page | ❌ No |
| POST | `/user` | Create a new user account | ❌ No |
| POST | `/user/login` | Log in and receive JWT cookie | ❌ No |
| POST | `/url` | Shorten a URL | ✅ Yes |
| GET | `/url/:shortId` | Redirect to original URL & log visit | ✅ Yes |

---

## 🗃️ Database Models

### User
| Field | Type | Description |
|---|---|---|
| `name` | String | Full name of the user |
| `email` | String | User's email (used for login) |
| `password` | String | User's password |

### URL
| Field | Type | Description |
|---|---|---|
| `shortId` | String | Unique short identifier |
| `redirectURL` | String | The original long URL |
| `visitHistory` | Array | Array of `{ timestamp }` objects per click |
| `createdBy` | ObjectId | Reference to the User who created it |

---

## 📝 License

ISC
