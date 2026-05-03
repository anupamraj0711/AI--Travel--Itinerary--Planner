import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/" className="logo">
          <Plane className="logo-icon" />
          <span>TravelAI</span>
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              <div className="user-profile">
                <User size={20} />
                <span>{user.name}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-container {
          padding: 20px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--glass-border);
        }
        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: white;
          font-weight: 700;
          font-size: 1.5rem;
        }
        .logo-icon {
          color: var(--primary);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-link {
          text-decoration: none;
          color: var(--text-dim);
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: white;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
        }
        .logout-btn {
          background: none;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          transition: color 0.3s;
        }
        .logout-btn:hover {
          color: var(--accent);
        }
      `}} />
    </nav>
  );
};

export default Navbar;
