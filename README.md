# 🛍️ EcoMart

EcoMart is a full-stack **buy & sell marketplace** built with **Next.js (App Router)**, **MongoDB**, and **JWT-based authentication**.  
Users can create accounts, upload products for sale, browse listings, and manage their profiles — all within a single modern platform designed for the IIT Ropar community.

---

## 🚀 Features

### 👤 Authentication
- Manual sign-up and login using email & password (no Google Auth)
- JWT stored securely in localStorage
- Role-based access — only product owners can edit or delete their listings

### 💼 Product Management
- Add new products with title, description, price, and image  
- All listed products are visible to every user  
- Product owners can:  
  - Edit product details  
  - Mark products as **Sold**  
  - Delete products  

### 💬 Communication Flow
- Buyers can click **Buy** to express interest (sends a mail notification or allows manual contact)
- Sellers receive the buyer’s info and can finalize deals offline  

### 🧑‍💻 Profile Management
- Update name, phone, location, bio, and profile image  
- Profile data is synced with MongoDB  

---

## 💡 How to Use

### 🧾 For Sellers:
1. Go to the **Sell** page.  
2. Enter your product details and upload an image.  
3. Your product will instantly appear on the marketplace.  
4. When a buyer clicks **Buy**, you’ll receive their contact info by mail.  
5. After the deal, mark the item as **Sold**.

### 🛍️ For Buyers:
1. Visit the **Products** section.  
2. Browse and select the item you’re interested in.  
3. Click **Buy** to notify the seller — they’ll reach out to you for the final transaction.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 16 (App Router) + TypeScript + Tailwind CSS + Framer Motion |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB Atlas |
| **Auth** | JSON Web Token (JWT) |
| **Mail Service** | Nodemailer |
| **Hosting** | Vercel |

---

## ⚙️ Installation & Setup

Follow these steps to run **EcoMart** locally on your system 👇  

### 1️⃣ Clone the Repository

git clone https://github.com/solanki018/EcoMart.git
cd EcoMart
2️⃣ Install Dependencies
npm install



3️⃣ Create a .env.local File
In the root folder of your project, create a file named .env.local and add the following environment variables 👇

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

EMAIL_USER=your_email_address

EMAIL_PASS=your_email_app_password

⚠️ Note: Replace the above values with your own credentials.
Do not push this file to GitHub — it should remain private.


4️⃣ Run the Development Server
npm run dev


Now open http://localhost:3000
 in your browser to see the app running locally 🎉
