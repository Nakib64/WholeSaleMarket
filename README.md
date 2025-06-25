# 🏪 B2B Wholesale Web Platform

A responsive, full-stack B2B wholesale eCommerce platform where users can browse and buy products in bulk. Built using the MERN stack, it features secure authentication, category-based filtering, a custom cart system, and a mobile-first UI that behaves like a native app on smaller screens.

---

## 🚀 Live Demo

> 🌐 [Live Site](https://wholesale-11b32.web.app/)

---

## 📌 Features

- 🔐 Secure Authentication System (Firebase)
- 🛒 Cart System to store & manage purchased products
- 🗂️ Category-wise Product Browsing
- 📉 Minimum Order Limit enforced per product
- 🔒 Private Routes (user must be logged in to access cart/purchase)
- 🧩 Swiper.js Slider for dynamic product showcasing
- 📦 Ready-made React Components used for UI consistency
- 📱 Fully Responsive — behaves like a mobile app on small devices

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Swiper.js
- Context API 
- Firebase 

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- CORS, Dotenv

---

<img src="https://i.ibb.co/twcH4KXk/wholesale-11b32-web-app.png"/>
<img src="https://i.ibb.co/gFRxTRfZ/home.png"/>
![Preview](https://i.ibb.co/twcH4KXk/wholesale-11b32-web-app.png)




📱 Responsiveness
- This web app is designed mobile-first. On small devices:

- It behaves like a native app

- UI components are touch-optimized

- Sliders enhance UX with horizontal scroll/swipe

- Navigation and layout adapt fluidly to screen size




---

## ⚙️ Getting Started Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

cd ../client
npm install
npm run dev

## The backend is uploaded in vercel. So you need just setting up frontend part. If you want to set backend code also, you can follow these steps:

npm run start

Then change the vercel.app/ to localhost/3000 or others.


