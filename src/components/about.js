import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [userFirstName, setUserFirstName] = useState('User');
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
      overflowX: 'hidden',
      overflowY: 'auto',
      alignItems: 'center',
      paddingTop: '120px', 
      paddingBottom: '40px',
    },
    topBanner: {
      backgroundColor: 'white',
      padding: '10px 0px 0px 0px',
      width: '110%',
      height: '50px',
      position: 'absolute',
      top: '0',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '0px 0px 0px 0px',
      zIndex: 10,
    },
    wavyCurve: {
      position: 'absolute',
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
    navContainer: {
      position: 'absolute',
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
    mainContent: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '800px',
      padding: '20px',
      transition: 'opacity 0.3s ease-out',
      opacity: isMenuOpen ? 0.5 : 1,
      pointerEvents: isMenuOpen ? 'none' : 'auto',
    },
    section: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '20px',
      padding: '30px',
      width: '100%',
      marginBottom: '20px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
      color: props => props.color || '#333',
    },
    subtitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '15px',
      textAlign: 'center',
      color: props => props.color || '#333',
    },
    paragraph: {
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '15px',
      textAlign: 'left',
    },
    list: {
      listStyleType: 'decimal',
      paddingLeft: '25px',
      marginBottom: '15px',
    },
    sublist: {
      listStyleType: 'lower-alpha',
      paddingLeft: '25px',
      marginBottom: '5px',
    },
    safe: {
      color: '#4CAF50',
      borderBottom: '2px solid #4CAF50',
      paddingBottom: '5px',
    },
    moderate: {
      color: '#FFC107',
      borderBottom: '2px solid #FFC107',
      paddingBottom: '5px',
    },
    severe: {
      color: '#FF9800',
      borderBottom: '2px solid #FF9800',
      paddingBottom: '5px',
    },
    dangerous: {
      color: '#F44336',
      borderBottom: '2px solid #F44336',
      paddingBottom: '5px',
    },
    calculation: {
      color: '#2196F3',
      borderBottom: '2px solid #2196F3',
      paddingBottom: '5px',
    },
    formula: {
      textAlign: 'center',
      fontStyle: 'italic',
      margin: '15px 0',
      fontSize: '18px',
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
      {/* Top Banner */}
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
          {[
            { name: 'Home', path: '/home' },
            { name: 'Account Information', path: '/account' },
            { name: 'Previous Trackings', path: '/tracking' },
            { name: 'About', path: '/about' }
          ].map((item, index) => (
            <button
              key={index}
              style={{
                ...styles.navButton,
                ...(hoveredNav === item.name ? styles.navButtonHover : {}),
                ...(window.location.pathname === item.path ? {
                  background: 'linear-gradient(to right, #ff3e3e 0%, #ff8443 100%)',
                  color: 'white'
                } : {})
              }}
              onMouseEnter={() => setHoveredNav(item.name)}
              onMouseLeave={() => setHoveredNav(null)}
              onClick={() => handleNavigation(item.path)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.section}>
          <h2 style={{...styles.title, ...styles.safe}}>SAFE</h2>
          <p style={styles.paragraph}>
            The <strong>SAFE</strong> option appears when the percentage difference is <strong>less than 10%</strong>. Nothing to fear, you are completely safe! Keep doing you!
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={{...styles.title, ...styles.moderate}}>MODERATE</h2>
          <p style={styles.paragraph}>
            The <strong>MODERATE</strong> option appears when the percentage difference is <strong>in between 10%-15%</strong>. Injury risk is not high yet, however percussions should be taken.
          </p>
          <ol style={styles.list}>
            <li>Prioritize single arm movements
              <ol style={styles.sublist}>
                <li>Dumbbell Bicep Curls</li>
                <li>Dumbbell Hammer Curls</li>
              </ol>
            </li>
            <li>Same repetitions on both sides of the body</li>
            <li>Seek physical therapy if pain occurs</li>
          </ol>
        </div>

        <div style={styles.section}>
          <h2 style={{...styles.title, ...styles.severe}}>SEVERE</h2>
          <p style={styles.paragraph}>
            The <strong>SEVERE</strong> option appears when the percentage difference is <strong>in between 15-20%</strong>.
          </p>
          <p style={styles.paragraph}>
            With injury risk being relatively high, target the weaker muscle group more by doing more repetitions on the weaker side. Seek medical attention if pain occurs.
          </p>
          <ol style={styles.list}>
            <li>Do 2-4 more repetitions per set on the weaker side</li>
          </ol>
          <ol style={styles.list}>
            <li>Focus on single arm movements
              <ol style={styles.sublist}>
                <li>Dumbbell Curls</li>
                <li>Dumbbell Hammer Curls</li>
                <li>Dumbbell Incline Bench Curls</li>
              </ol>
            </li>
            <li>Focus on form and mind muscle connection
              <ol style={styles.sublist}>
                <li>Use a mirror to ensure correct form</li>
                <li>Slow and controlled repetitions with lighter weight to maintain control and proper form</li>
              </ol>
            </li>
          </ol>
        </div>

        <div style={styles.section}>
          <h2 style={{...styles.title, ...styles.dangerous}}>DANGEROUS</h2>
          <p style={styles.paragraph}>
            The <strong>DANGEROUS</strong> option appears when the percentage difference is <strong>greater than 20%</strong>.
          </p>
          <p style={styles.paragraph}>
            With injury risk being high, target the weaker muscle group ONLY for 2-4 weeks and consistently retest. Once the percentage drops to <strong>SEVERE</strong> then you can resume working out both biceps.
          </p>
          <ol style={styles.list}>
            <li>Increase range of motion
              <ol style={styles.sublist}>
                <li>Lighter weight to ensure full range of motion</li>
                <li>Improve bicep flexion and mobility through bicep foam rolling and dynamic stretches such as arm circles (should do this 3-4 times a week)</li>
              </ol>
            </li>
            <li>Focus on single arm movements
              <ol style={styles.sublist}>
                <li>Dumbbell Curls</li>
                <li>Dumbbell Hammer Curls</li>
                <li>Dumbbell Incline Bench Curls</li>
              </ol>
            </li>
            <li>Focus on form and mind muscle connection
              <ol style={styles.sublist}>
                <li>Use a mirror to ensure correct form</li>
                <li>Slow and controlled repetitions with lighter weight to maintain control and proper form</li>
              </ol>
            </li>
            <li>Include isolation machines
              <ol style={styles.sublist}>
                <li>Preacher curl machines</li>
                <li>Single arm cable curls</li>
              </ol>
            </li>
          </ol>
        </div>

        <div style={styles.section}>
          <h2 style={{...styles.title, ...styles.calculation}}>How we Calculate</h2>
          <div style={styles.formula}>
            Percentage Difference = ((Stronger Bicep - Weaker Bicep) / Stronger Bicep) × 100%
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
