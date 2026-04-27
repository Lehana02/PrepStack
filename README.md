# PrepStack

PrepStack is a modern full-stack MERN platform built to streamline the way students
access study resources and manage their academic workflow.

It combines **resource discovery + secure sharing + smart progress tracking**
into a single, clean, and highly interactive interface.

---

##  Live 
👉 **[Visit Live Website](https://prepstack-1.onrender.com/)**

---

## 🌟 Overview

PrepStack eliminates the chaos of scattered notes, books, and exam materials by
providing a structured, filterable, and user-friendly platform.

Along with that, it introduces a **powerful progress tracking system** that helps
students stay consistent and meet their deadlines effectively.

---

## ✨ Features

### 📚 Notes
- Filter notes by subject or topic
- Preview PDFs directly in the browser
- View download count
- One-click download

---

### 📖 Books
- Organized collection of academic books
- Same features as Notes (preview, filter, download)
- Clean and minimal UI

---

### 📝 Previous Year Questions (PYQs)
- Access past exam papers 
- Filter by subject and year
- Preview before download

---

### ⬆️ Secure Upload System
- Upload PDFs to the platform
- Protected by **Admin PIN authentication**
- Prevents unauthorized or malicious uploads
- File validation (PDF only)

---

### 🔐 Authentication
- JWT-based secure authentication
- Google Login integration
- Signup & Login functionality
- Protected routes for authorized access

---

## Progress Tracker (Core Feature)

A built-in productivity system designed to help students plan and execute effectively.

### ✅ Task Management
- Create tasks with deadlines
- Full CRUD operations (Create, Read, Update, Delete)

---

### 📌 Subtopics
- Break tasks into smaller subtopics
- Assign:
  - Hours per day
  - Duration (in days)

---

### ⏳ Smart Calculations
- Automatically calculates:
  - Remaining days until deadline
  - Required daily study time

---

### 📈 Status Tracking
Each subtopic can be marked as:
- Pending
- Half Done
- Completed

---

### ⚠️ Smart Alerts
- Deadline Passed → clearly indicated
- Only 2 days left → warning to complete tasks
- Completed tasks tracked separately

---

## 🎨 UI / UX

- Fully responsive design
- Smooth animations across pages
- Clean and intuitive layout
- Designed for real student usability

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Redux Toolkit
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Tokens)
- Firebase Authentication

### File Storage
- Cloudinary 

---

## 🔐 Security

- Admin-restricted uploads using PIN
- JWT-based route protection
- Input validation 
- Strict file type control (PDF only)

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Lehana02/PrepStack.git

# Install dependencies
cd backend
npm install

cd ../frontend
npm install

# Run backend server
cd ../backend
npm run dev

# Run frontend
cd ../frontend
npm run dev