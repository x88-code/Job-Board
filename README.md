# 💼 JobBoard MERN Application

A full-stack Job Board platform built with the **MERN stack** (MongoDB, Express, React, Node.js) that enables users to register, login, browse job listings, apply for jobs, and manage profiles. Admins and recruiters can post jobs and manage applications.

---

## 🚀 Features

### ✅ User Features
- Register & Login with JWT authentication
- Email verification & password reset
- Apply to jobs
- View personal applications
- Update profile & change password

### 🛠️ Admin/Recruiter Features
- Post, update & delete job listings
- View applicants
- Manage users

---

## 🧰 Technologies Used

### Frontend
- React + Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (for email services)
- dotenv

### Dev & Deployment Tools
- Jest, Supertest, React Testing Library
- Nodemon, ESLint
- Vercel (frontend) & Render (backend) deployment
- CI/CD (optional with GitHub Actions)

---

## 📁 Project Structure

```
JobBoardProject_Final/
├── client/               # React frontend
│   └── ...
├── server/               # Node/Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env.example
├── README.md             # This file
└── ...
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` directory with:

```
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRE=7
CLIENT_URL=http://localhost:3000
NODE_ENV=development

PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobboard
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## 📦 Installation & Usage

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/jobboard-project.git
cd jobboard-project
```

### 2. Install Server Dependencies

```bash
cd server
pnpm install
```

### 3. Install Client Dependencies

```bash
cd ../client
pnpm install
```

### 4. Run Development Mode

In one terminal:
```bash
cd server
pnpm run dev
```

In another:
```bash
cd client
pnpm run dev
```

---

## 🌐 Deployment

### Frontend (Vercel)

- Live URL: [https://jobboard-client.vercel.app](https://jobboard-client.vercel.app)
- Set environment variable: `VITE_API_BASE_URL=https://jobboard-api.onrender.com/api`

### Backend (Render)

- Live URL: [https://jobboard-api.onrender.com](https://jobboard-api.onrender.com)
- Set the environment variables as shown above

---

## 🧪 Testing

### Client:
```bash
cd client
npm run test
```

### Server:
```bash
cd server
npm run test
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

Thanks to open-source libraries and contributors in the MERN stack ecosystem.