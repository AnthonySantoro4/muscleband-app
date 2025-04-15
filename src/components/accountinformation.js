import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountInformation = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [userFirstName, setUserFirstName] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Get user data from localStorage when component mounts
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.firstName) {
          setUserFirstName(parsedUser.firstName);
        }
        if (parsedUser.emailAddress) {
          setUserEmail(parsedUser.emailAddress);
        }
        if (parsedUser.id) {
          setUserId(parsedUser.id);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  const updateEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter a new email address');
      setMessageType('error');
      return;
    }

    if (email === userEmail) {
      setMessage('New email is the same as current email');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Call the API to update the email
      const response = await axios.put('http://localhost:5002/api/auth/update-email', {
        userId: userId,
        newEmail: email
      });

      // Update local state and localStorage with the new email
      setUserEmail(response.data.user.emailAddress);
      
      // Update localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        parsedUser.emailAddress = response.data.user.emailAddress;
        localStorage.setItem('user', JSON.stringify(parsedUser));
      }

      // Show success message
      setMessage('Email updated successfully');
      setMessageType('success');
      
      // Clear the input field
      setEmail('');
    } catch (error) {
      console.error('Error updating email:', error);
      setMessage(error.response?.data?.message || 'Failed to update email. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (!currentPassword) {
      setMessage('Please enter your current password');
      setMessageType('error');
      return;
    }
    
    if (!newPassword) {
      setMessage('Please enter a new password');
      setMessageType('error');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Call the API to update the password
      const response = await axios.put('http://localhost:5002/api/auth/update-password', {
        userId: userId,
        currentPassword: currentPassword,
        newPassword: newPassword
      });

      // Show success message
      setMessage('Password updated successfully');
      setMessageType('success');
      
      // Clear the input fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage(error.response?.data?.message || 'Failed to update password. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // CSS styles as JavaScript objects
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', 
      width: '100%',
      background: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb, #e2b0ff, #d896ff)',
      color: '#333',
      position: 'relative',
      overflow: 'auto', 
      alignItems: 'center',
      justifyContent: 'flex-start', 
      paddingTop: '0',
      paddingBottom: '50px',
    },
    topBanner: {
      backgroundColor: 'white',
      padding: '10px 0px 0px 0px',
      width: '110%',
      height: '50px',
      position: 'fixed',
      top: '0',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '0px 0px 0px 0px',
      zIndex: 10,
    },
    wavyCurve: {
      position: 'fixed',
      top: '50px',
      width: '100%',
      height: isMenuOpen ? '120px' : '50px',
      backgroundColor: 'white',
      borderRadius: '0 0 70% 70%',
      zIndex: 101,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.3s ease-out, height 0.3s ease-out',
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      position: 'absolute',
      cursor: 'default',
      marginTop: '5px',
      marginLeft: '100px',
      zIndex: 103,
      left: '0',
    },
    profileIcon: {
      width: '30px',
      height: '30px',
      background: '#000',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      color: 'white',
      cursor: 'default',
      transition: 'transform 0.2s',
    },
    userGreeting: {
      fontWeight: 'bold',
      padding: '5px 10px',
      borderRadius: '15px',
    },
    tripleCircleButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      marginTop: '15px',
      marginRight: '100px',
      zIndex: 103,
      position: 'absolute',
      right: '0',
    },
    circle: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'linear-gradient(to bottom, #ff3e3e 0%, #ff8443 100%)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
    },
    circleMid: {
      width: '14px',
      height: '14px',
      borderRadius: '50%',
      background: 'linear-gradient(to bottom, #ff3e3e 0%, #ff8443 100%)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
    },
    mainContent: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '1200px',
      padding: '20px',
      transition: 'opacity 0.3s ease-out',
      opacity: isMenuOpen ? 0.5 : 1,
      pointerEvents: isMenuOpen ? 'none' : 'auto',
      marginTop: '150px',
      flex: '1 0 auto',
    },
    formContainer: {
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '30px',
      width: '90%',
      maxWidth: '500px',
      marginBottom: '20px',
    },
    formSection: {
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
    },
    formTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '20px',
      width: '100%',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '16px',
      transition: 'border 0.3s ease',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#ff6347',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '10px',
      boxSizing: 'border-box',
    },
    buttonHover: {
      backgroundColor: '#ff4500',
    },
    message: {
      padding: '10px',
      borderRadius: '5px',
      marginTop: '15px',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb',
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
    },
    divider: {
      width: '100%',
      height: '1px',
      backgroundColor: '#eee',
      margin: '30px 0',
    },
    navContainer: {
      position: 'fixed',
      top: '80px',
      left: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 102,
      opacity: isMenuOpen ? 1 : 0,
      visibility: isMenuOpen ? 'visible' : 'hidden',
      transition: 'opacity 0.2s ease-out, visibility 0.1s ease-out',
    },
    navButtonsRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      width: '80%',
    },
    navButton: {
      padding: '12px 25px',
      backgroundColor: 'white',
      color: '#333',
      border: 'none',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease',
    },
    navButtonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      background: 'linear-gradient(to right, #ff3e3e 0%, #ff8443 100%)',
      color: 'white',
    },
  };

  const navigationItems = [
    { label: 'Home', path: '/home' },
    { label: 'Account Information', path: '/account' },
    { label: 'Previous Trackings', path: '/trackings' },
    { label: 'About', path: '/about' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.topBanner}>
        <div style={styles.userProfile}>
          <div style={styles.profileIcon}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <circle cx="12" cy="8" r="4" fill="currentColor" />
              <path d="M12,14c-6.1,0-8,4-8,4v2h16v-2C20,18,18.1,14,12,14z" fill="currentColor" />
            </svg>
          </div>
          <span style={styles.userGreeting}>
            Hello, {userFirstName}!
          </span>
        </div>
        
        <div 
          style={styles.tripleCircleButton} 
          onClick={toggleMenu}
        >
          <div style={{
            ...styles.circle,
            transform: isMenuOpen ? 'scale(1.1)' : 'scale(1)'
          }}></div>
          <div style={{
            ...styles.circleMid,
            transform: isMenuOpen ? 'scale(1.1)' : 'scale(1)'
          }}></div>
          <div style={{
            ...styles.circle,
            transform: isMenuOpen ? 'scale(1.1)' : 'scale(1)'
          }}></div>
        </div>
      </div>
      
      <div style={styles.wavyCurve}></div>
      
      {/* Navigation buttons */}
      <div style={styles.navContainer}>
        <div style={styles.navButtonsRow}>
          {navigationItems.map((item, index) => (
            <button
              key={index}
              style={{
                ...styles.navButton,
                ...(hoveredNav === item.label ? styles.navButtonHover : {}),
                ...(item.path === '/account' ? {
                  background: 'linear-gradient(to right, #ff3e3e 0%, #ff8443 100%)',
                  color: 'white'
                } : {})
              }}
              onMouseEnter={() => setHoveredNav(item.label)}
              onMouseLeave={() => setHoveredNav(null)}
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      
      <div style={styles.mainContent}>
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Update Email Address</h2>
          
          {message && (
            <div 
              style={{
                ...styles.message,
                ...(messageType === 'success' ? styles.successMessage : styles.errorMessage),
                maxWidth: '400px',
                margin: '0 auto 20px',
                width: '100%'
              }}
            >
              {message}
            </div>
          )}
          
          <div style={styles.formSection}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '10px 15px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <span style={{ fontWeight: 'bold' }}>Current Email: </span>
              <span>{userEmail || 'Not available'}</span>
            </div>
            <form onSubmit={updateEmail}>
              <div style={styles.formGroup}>
                <label style={styles.label}>New Email Address</label>
                <input
                  type="email"
                  style={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your new email address"
                />
              </div>
              <div>
                <button 
                  type="submit" 
                  style={styles.button}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Email'}
                </button>
              </div>
            </form>
          </div>

          <div style={styles.divider}></div>

          <h2 style={styles.formTitle}>Change Password</h2>
          <div style={styles.formSection}>
            <form onSubmit={updatePassword}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Current Password</label>
                <input
                  type="password"
                  style={styles.input}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <input
                  type="password"
                  style={styles.input}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm New Password</label>
                <input
                  type="password"
                  style={styles.input}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                />
              </div>
              <div>
                <button 
                  type="submit" 
                  style={styles.button}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
