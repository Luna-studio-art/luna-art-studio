# 🎨 ArtStudio - Digital Artist Portfolio

A stunning, modern full-stack portfolio website for professional digital artists showcasing fursuit models, digital art, 3D models, and video projects.

![ArtStudio Portfolio](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0-black?logo=framer&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.0-black?logo=express&logoColor=white)

## ✨ Features

### Frontend
- 🌟 **Stunning Hero Section** - Full-screen animated landing with parallax effects
- 🎨 **Gallery Page** - Filterable masonry grid with category filtering
- 📄 **Project Detail Pages** - Rich project pages with lightbox image viewer
- 👤 **About Page** - Artist bio, skills, and experience timeline
- 📧 **Contact Page** - Contact form with social links
- 🖱️ **Custom Cursor** - Animated cursor with hover effects (desktop)
- 🌈 **Glow Effects** - Neon accents and smooth gradients throughout
- 📱 **Fully Responsive** - Optimized for all devices

### Admin Dashboard
- 🔐 **Secure Authentication** - JWT-based login system
- 📊 **Project Management** - Create, edit, delete projects
- 🖼️ **Image Upload** - Cloudinary integration for media storage
- 🏷️ **Category & Tag Management** - Organize your work
- ⭐ **Featured Projects** - Highlight your best work

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form handling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Cloudinary** - Media storage
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   cd portfoio
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure backend environment**
   
   Edit `backend/.env` with your credentials:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/artist-portfolio
   JWT_SECRET=your-super-secret-jwt-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   FRONTEND_URL=http://localhost:3000
   ADMIN_EMAIL=admin@artist.com
   ADMIN_PASSWORD=admin123
   ```

4. **Seed the database** (optional - creates sample data)
   ```bash
   npm run seed
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

6. **Set up the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   ```

7. **Configure frontend environment**
   
   The `frontend/.env.local` is already configured:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

8. **Start the frontend development server**
   ```bash
   npm run dev
   ```

9. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
portfoio/
├── backend/
│   ├── config/          # Cloudinary configuration
│   ├── middleware/      # Auth & upload middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── uploads/         # Temporary upload folder
│   ├── .env             # Environment variables
│   ├── seed.js          # Database seeder
│   └── server.js        # Express server
│
└── frontend/
    ├── src/
    │   ├── app/         # Next.js pages
    │   │   ├── admin/   # Admin dashboard
    │   │   ├── gallery/ # Gallery page
    │   │   ├── project/ # Project detail pages
    │   │   ├── about/   # About page
    │   │   └── contact/ # Contact page
    │   ├── components/  # Reusable components
    │   ├── context/     # React contexts
    │   ├── lib/         # Utilities & API
    │   └── types/       # TypeScript types
    └── .env.local       # Environment variables
```

## 🎨 Design Features

### Color Palette
- **Background**: `#0f0f0f` (Deep black)
- **Cards**: `#1a1a1a` (Dark charcoal)
- **Accent Purple**: `#7c3aed` (Neon purple)
- **Accent Blue**: `#3b82f6` (Electric blue)
- **Accent Pink**: `#ec4899` (Soft pink)

### Typography
- **Headings**: Bold, modern font with gradient effects
- **Body**: Clean sans-serif for readability

### Animations
- Smooth page transitions with Framer Motion
- Hover effects on cards and buttons
- Parallax scrolling in hero section
- Custom cursor with particle trail
- Glow effects on interactive elements

## 🔐 Admin Access

**Default credentials** (after running seed):
- **Email**: `admin@artist.com`
- **Password**: `admin123`

Access the admin panel at: `http://localhost:3000/admin`

## 📸 Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the dashboard
3. Add them to `backend/.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

## 🚢 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Import your repository to Vercel
3. Set environment variables
4. Deploy

### Backend (Railway/Render)
1. Push your code to GitHub
2. Create a new service on Railway or Render
3. Connect your repository
4. Add environment variables
5. Deploy

### Database (MongoDB Atlas)
1. Create a free cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in backend `.env`

## 📝 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:slug` - Get project by slug
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)

### Upload
- `POST /api/upload/image` - Upload single image (auth required)
- `POST /api/upload/images` - Upload multiple images (auth required)
- `POST /api/upload/video` - Upload video (auth required)

### Auth
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register first admin
- `GET /api/auth/me` - Get current admin (auth required)
- `PUT /api/auth/me` - Update admin profile (auth required)

## 🎯 Future Enhancements

- [ ] Blog section for tutorials and updates
- [ ] Client testimonials section
- [ ] Newsletter subscription
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Advanced search functionality
- [ ] Project comparison feature
- [ ] Downloadable media kits

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by modern creative studio portfolios
- Built with love for digital artists everywhere

---

**Made with ❤️ for creative professionals**
