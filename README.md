# Log of Lab10.1-recipe-react-frontend
This is the frontend for Lab10.1-recipe-api backend

# Recipe Manager - Modern React App

A modern, responsive recipe management application built with React, Vite, and Tailwind CSS. This app allows users to create, edit, delete, and view recipes with a clean, intuitive interface.

## 🚀 Features

- **Modern Tech Stack**: Built with React 18, Vite, and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **CRUD Operations**: Create, read, update, and delete recipes
- **Real-time Feedback**: Loading states, error handling, and success messages
- **Clean Architecture**: Component-based design with custom hooks
- **Optimized Performance**: Fast builds and hot reload with Vite
- **Type Safety**: ESLint configuration for code quality

## 🛠 Tech Stack

- **Frontend**: React 18.3.1
- **Build Tool**: Vite 6.0.3
- **Styling**: Tailwind CSS 3.4.15
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **HTTP Client**: Fetch API
- **Linting**: ESLint with React plugins

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nelsonlopezjimenez/Lab10.1-recipe-react-frontend.git
   cd Lab10.1-recipe-react-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update the API URL:
   ```env
   VITE_API_URL=http://localhost:3999/api/v1/recipe
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorMessage.jsx # Error display component
│   ├── LoadingSpinner.jsx # Loading indicator
│   ├── NavBar.jsx       # Navigation bar
│   ├── RecipeCard.jsx   # Individual recipe card
│   ├── RecipeForm.jsx   # Recipe creation/editing form
│   └── RecipeList.jsx   # Recipe grid display
├── hooks/               # Custom React hooks
│   └── useRecipes.js    # Recipe data management hook
├── api.js              # API service functions
├── App.jsx             # Main application component
├── main.jsx            # React application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Key Improvements Made

### Architecture & Performance
- **Custom Hooks**: Implemented `useRecipes` hook for centralized state management
- **Memoization**: Used `useCallback` for optimized re-renders
- **Component Composition**: Broke down large components into smaller, reusable pieces
- **Error Boundaries**: Proper error handling and user feedback

### Modern React Patterns
- **Function Components**: Converted all class components to modern function components
- **Hooks**: Proper use of useState, useEffect, and custom hooks
- **Props Destructuring**: Clean prop handling with destructuring
- **Conditional Rendering**: Efficient conditional UI rendering

### UI/UX Enhancements
- **Responsive Grid**: CSS Grid with Tailwind for recipe cards
- **Loading States**: Skeleton loading and spinners
- **Error States**: User-friendly error messages with retry options
- **Form Validation**: Client-side validation with clear feedback
- **Confirmation Dialogs**: Delete confirmations for better UX

### Code Quality
- **ESLint Configuration**: Modern ESLint setup with React rules
- **Consistent Naming**: Clear, descriptive variable and function names
- **Code Organization**: Logical file and folder structure
- **Removed Dead Code**: Eliminated unused imports and functions

## 🌐 API Integration

The app expects a REST API with the following endpoints:

- `GET /api/v1/recipe` - Get all recipes
- `POST /api/v1/recipe` - Create a new recipe
- `GET /api/v1/recipe/:id` - Get a specific recipe
- `PUT /api/v1/recipe/:id` - Update a recipe
- `DELETE /api/v1/recipe/:id` - Delete a recipe

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile First**: Optimized for mobile devices
- **Flexible Grid**: Adapts from 1 column on mobile to 3 columns on desktop
- **Touch Friendly**: Large buttons and touch targets
- **Readable Typography**: Proper font sizes and line heights

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Nelson Lopez Jimenez

---

Built with ❤️ using React, Vite, and Tailwind CSS