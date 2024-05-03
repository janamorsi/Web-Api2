import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'; 
import Home from './pages/Home';
import RecipeDetail from './pages/recipeDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import NotFound from './pages/NotFound';

// Component layout with the fixed Navbar and Footer
function Layout() {
  return (
    <>
      <NavBar />
      <Outlet /> {/* This renders nested routes */}
      <Footer />
    </>
  );
}

// main App component with routing
function App() {
  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes/:id" element={<RecipeDetail />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />

          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<NotFound />} /> {/* Correct catch-all syntax */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
