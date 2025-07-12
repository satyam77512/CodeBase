# 💻 CodeBase - Student Skill Directory

**CodeBase** is a full-stack web platform built to showcase the talent of students at IIEST Shibpur. It allows students to register with their skills, department, and year, and helps others discover and connect with them through an advanced filtering system. Admins can view all profiles, while users can manage their own accounts with secure authentication and update statuses like "active" or "busy".

[![Live Website](https://img.shields.io/badge/Live%20Website-Click%20Here-blue?style=for-the-badge)](https://code-base-wdwg.vercel.app/)

---

## ✨ Features

- 👤 **User Profiles**
  - Students can register and showcase their skills, department, year, and gender.
  - Each profile includes a profile picture, resume link, and contact details.

- 🔐 **Authentication**
  - Password reset via email link (with JWT-based verification).
  - Encrypted password at database.

- 🛠️ **Profile Management**
  - Update profile details and status (active/busy).
  - Upload profile pictures (compressed via Cloudinary).
  - Upload or update resumes.

- 🔎 **Advanced Filtering**
  - Filter users by department, year, gender, and skill.
  - Search for users by name or email.

- 🏠 **Public Homepage**
  - Displays active users if no filters are applied.
  - Promotes visibility of current contributors.

---

## 🛠 Tech Stack

| Frontend        | Backend          | Database      | Other Integrations              |
|-----------------|------------------|---------------|---------------------------------|
| React.js        | Node.js + Express| MongoDB Atlas | Redux, JWT, bcrypt, Cloudinary  |
| CSS             | Mongoose         |               | Nodemailer for email services   |

---

## 📂 Folder Structure

