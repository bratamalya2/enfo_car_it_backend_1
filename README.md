# 🚗 Pricing Module API

This project is a configurable **Pricing Module** built with **Node.js**, **Express**, and **MongoDB**.  
It allows flexible management of ride-based pricing like Uber/Ola depending on distance, time, day of the week, and waiting charges.

---

## ✨ Features
- Create multiple pricing configurations
- Enable/Disable specific configs
- Calculate dynamic ride prices based on distance, time, and waiting
- Log all config changes
- RESTful API with clean structure
- Environment variable support
- Ready for production and Docker deployment (optional)

---

## 🏗 Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv for environment configs

---

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/pricing-module.git
cd pricing-module
npm install
npm run dev

### 2. Ensure there is .env file with contents mimicing sample.env file.
