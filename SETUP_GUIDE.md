# ♔ Chess Master - Project Guide (Beginner Friendly)

> This guide explains every file and folder in simple language, plus step-by-step setup instructions.

---

## 📁 File Structure Explained

```
Chess-Game/
│
├── 📄 index.html              ← Main HTML page (auto-generated, don't edit)
├── 📄 package.json             ← List of frontend libraries/tools needed
├── 📄 vite.config.ts           ← Frontend build tool settings
├── 📄 tsconfig.json            ← TypeScript language settings
│
├── 📂 src/                     ← ⭐ FRONTEND CODE (React - what user sees)
│   ├── 📄 main.tsx             ← App entry point (starts everything)
│   ├── 📄 App.tsx              ← Main app with routes & landing page
│   ├── 📄 AuthContext.tsx      ← Manages login/logout state
│   ├── 📄 index.css            ← Global styles
│   ├── 📂 pages/               ← Individual pages
│   │   ├── 📄 SignIn.tsx       ← Sign In page
│   │   └── 📄 SignUp.tsx       ← Sign Up page
│   └── 📂 utils/
│       └── 📄 cn.ts            ← CSS helper utility
│
├── 📂 backend/                 ← ⭐ BACKEND CODE (Django - server & database)
│   ├── 📄 .env                 ← 🔐 YOUR SETTINGS (MongoDB URL goes here!)
│   ├── 📄 .env.example         ← Example settings file (for reference)
│   ├── 📄 manage.py            ← Django command runner
│   ├── 📄 requirements.txt     ← List of Python libraries needed
│   │
│   ├── 📂 chess_auth/          ← Django project settings
│   │   ├── 📄 settings.py      ← Main settings (reads from .env)
│   │   ├── 📄 urls.py          ← URL routing
│   │   └── 📄 wsgi.py          ← Server config
│   │
│   └── 📂 accounts/            ← User login/signup logic
│       ├── 📄 models.py        ← User data structure
│       ├── 📄 serializers.py   ← Converts data to/from JSON
│       ├── 📄 views.py         ← API logic (register, login, logout)
│       └── 📄 urls.py          ← API URL paths
│
└── 📂 node_modules/            ← Auto-downloaded libraries (don't touch)
```

---

## 🔐 Where to Put Your MongoDB URL

Open this file: **`backend/.env`**

```env
# Change this line to YOUR MongoDB URL:
MONGO_URL=mongodb://localhost:27017

# If using MongoDB Atlas (cloud), it looks like:
# MONGO_URL=mongodb+srv://yourname:yourpassword@cluster0.abc123.mongodb.net
```

That's it! The app reads this file automatically.

---

## 🚀 Step-by-Step Setup (for Beginners)

### Step 1: Install Python Libraries
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Set Your MongoDB URL
Open `backend/.env` and change `MONGO_URL` to your MongoDB connection string.

### Step 3: Create Database Tables
```bash
cd backend
python manage.py migrate
```

### Step 4: Start the Backend Server
```bash
cd backend
python manage.py runserver
```
> Keep this terminal running! Backend runs at `http://localhost:8000`

### Step 5: Start the Frontend (open a NEW terminal)
```bash
npm run dev
```
> Frontend runs at `http://localhost:5173`

### Step 6: Open in Browser
Go to: **http://localhost:5173**

Click **Sign In** → Create an account → Done! ✅

---

## ❓ Common Issues

| Problem | Solution |
|---------|----------|
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` again |
| MongoDB connection error | Make sure MongoDB is running, check your URL in `.env` |
| Frontend won't start | Run `npm install` first, then `npm run dev` |
| "Port already in use" | Close other terminals running the server |
