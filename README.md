# 🌾 VillageCraft

**Empowering Rural Artisans through Modern Learning and Global Outreach**

VillageCraft is a premium MERN stack platform designed to bridge the gap between traditional village artisans and modern learners. It provides a seamless environment for trainers to host workshops and for students to discover and master age-old crafts with a modern digital experience.

---

![VillageCraft Mockup](C:\Users\deeks\.gemini\antigravity\brain\9810ba08-8101-4621-ae16-07bc2f46e21d\villagecraft_hero_mockup_1773754319814.png)

## ✨ Key Features

-   **Multi-Role Ecosystem**: Tailored dashboards for **Students**, **Trainers**, and **Admins**.
-   **Workshop Management**: Comprehensive tools for trainers to create, manage, and moderate workshops.
-   **Dynamic Discovery**: Filter workshops by categories with a sleek, glassmorphic interface.
-   **Booking & Notification System**: Real-time updates on enrollments and workshop status.
-   **Premium UI/UX**: Built with a focus on visual excellence, featuring micro-animations and a responsive design.
-   **Analytics Dashboard**: Visual statistics for trainers and admins to track engagement and growth.

## 🛠️ Tech Stack

### Frontend
-   **React 19**: Modern UI library with functional components.
-   **Tailwind CSS**: Utility-first styling for a premium, custom design.
-   **Lucide React**: Crisp, modern iconography.
-   **React Router 7**: Sophisticated client-side routing.
-   **Axios**: Efficient API communication.

### Backend
-   **Node.js & Express**: Robust and scalable server-side environment.
-   **MongoDB & Mongoose**: Flexible NoSQL database with elegant schema modeling.
-   **JWT & Bcrypt**: Secure authentication and password hashing.
-   **Dotenv**: Environment variable management.

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16+)
-   MongoDB Instance (Local or Atlas)
-   npm or yarn

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/saideekshith0809/VillageCraft.git
    cd VillageCraft
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create a .env file and add your MONGO_URI and JWT_SECRET
    npm start
    ```

3.  **Frontend Setup**
    ```bash
    cd ../myapp
    npm install
    npm start
    ```

---

## 📂 Project Structure

```bash
VillageCraft/
├── backend/            # Express server, MongoDB models, and API routes
<<<<<<< HEAD
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── controllers/    # Business logic
=======
│   ├── controllers/    # Business logic
│   ├── middleware/     # Custom Express middleware
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── seed.js         # Database seeder script
>>>>>>> 5327cf2 (update)
│   └── server.js       # Entry point
├── myapp/              # React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
<<<<<<< HEAD
│   │   ├── pages/      # Full-page views
│   │   ├── services/   # API abstracting
=======
│   │   ├── context/    # React context providers
│   │   ├── data/       # Static/mock data files
│   │   ├── pages/      # Full-page views
│   │   ├── services/   # API abstraction
│   │   ├── translations/ # i18n translation files
│   │   ├── utils/      # Utility functions
│   │   ├── claude.jsx  # Claude integration component
>>>>>>> 5327cf2 (update)
│   │   └── App.js      # Main application logic
└── README.md           # You are here
```

## 🤝 Contributing

We welcome contributions from the community! Feel free to open issues or submit pull requests to help improve VillageCraft.

## 📄 License

This project is licensed under the ISC License.

---

<<<<<<< HEAD
*Crafted with ❤️ for Village Artisans.*
=======
*Crafted with ❤️ for Village Artisans.*
>>>>>>> 5327cf2 (update)
