# 🛍️ EcoMart

EcoMart is a full-stack **buy & sell marketplace** built with **Next.js (App Router)**, **MongoDB**, and **JWT-based authentication**.  
Users can create an account, upload products for sale, browse other listings, and manage their profile — all from one elegant platform.

---

## 🚀 Features

### 👤 Authentication
- Manual sign-up and login using email & password (no Google Auth)
- JWT stored securely in localStorage
- Role-based actions (only the owner can edit or delete their product)

### 💼 Product Management
- Add new products with title, description, price, and image
- All listed products are visible to every user
- Product owners can:
  - Edit details  
  - Mark products as **sold**
  - Delete products

### 💬 Communication Flow
- Buyers can click **Buy** to send interest (triggers a mail notification or follow-up)
- Seller receives mail (or can check buyer info manually) and can finalize offline

### 🧑‍💻 Profile Management
- View and update your profile (name, phone, location, bio, profile image)
- Data synced directly with MongoDB

### 💡 How to Use
#### For Sellers:
1. Go to the **Sell** page.  
2. Fill in the product details and upload an image.  
3. Once listed, your product appears to everyone.  
4. When a buyer clicks **Buy**, you’ll receive their contact info and can discuss further.  
5. After the deal, mark your product as **Sold**.

#### For Buyers:
1. Visit the **Products** section or home page.  
2. Browse items and choose one to buy.  
3. Click the **Buy** button to show your interest — the seller will contact you.  

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 16 (App Router) + TypeScript + TailwindCSS + Framer Motion |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB Atlas |
| **Auth** | JSON Web Token (JWT) |
| **Hosting** | Vercel |

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/solanki018/EcoMart.git
cd EcoMart
