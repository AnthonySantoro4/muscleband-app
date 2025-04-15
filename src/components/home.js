import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSide, setRecordingSide] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [userFirstName, setUserFirstName] = useState('User');
  const navigate = useNavigate();

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
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (isRecording) {
      setElapsedTime(0);
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 10);
      }, 10);
      setTimerInterval(interval);
    } else {
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isRecording]);

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const startDataCollection = async (side) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const userId = userData?._id;
  
      if (!userId) {
        console.error("⚠️ No user ID found");
        return;
      }
  
      const response = await fetch(`http://192.168.4.94/start?side=${side}&userId=${userId}`);
      const text = await response.text();
      console.log("Start response:", text);
      setRecordingSide(side);
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting data collection:", error);
    }
  };

  const stopDataCollection = async () => {
    try {
      const response = await fetch(`http://192.168.4.94/stop`);
      const result = await response.text();
      console.log("Stop response:", result);
    } catch (err) {
      console.error("Error stopping data collection:", err);
    }
  
    setIsRecording(false);
    setRecordingSide(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  const handleNavigation = (path) => navigate(path);

  const styles = {
    homeContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      background: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb, #e2b0ff, #d896ff)',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    topBanner: {
      backgroundColor: 'white',
      padding: '10px 0',
      width: '110%',
      height: '50px',
      position: 'absolute',
      top: '0',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 10,
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
    },
    circleMid: {
      width: '14px',
      height: '14px',
      borderRadius: '50%',
      background: 'linear-gradient(to bottom, #ff3e3e 0%, #ff8443 100%)',
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
      maxWidth: '1200px',
      padding: '20px',
      opacity: isMenuOpen || isRecording ? 0.5 : 1,
      pointerEvents: isMenuOpen || isRecording ? 'none' : 'auto',
    },
    bicepControls: {
      display: 'flex',
      justifyContent: 'center',
      gap: '150px',
      marginBottom: '10px',
      marginTop: '20px',
    },
    bicepColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    bicepLabel: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    },
    circleButtonWrapper: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: 'linear-gradient(to bottom, #ff3e3e 0%, #ff8443 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleButton: {
      width: '90px',
      height: '90px',
      borderRadius: '50%',
      backgroundColor: 'white',
      border: 'none',
      fontWeight: 'bold',
      color: '#333',
      cursor: 'pointer',
    },
    circleButtonHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    },
    percentageSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    percentageLabel: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    },
    curvedRectangle: {
      width: '300px',
      height: '100px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e0e0e0',
    },
    content: {
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    },
    instructionText: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: '15px',
      color: '#333',
    },
    recordingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      opacity: isRecording ? 1 : 0,
      visibility: isRecording ? 'visible' : 'hidden',
      transition: 'opacity 0.3s ease, visibility 0.3s ease',
    },
    recordingText: {
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '30px',
    },
    timerText: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      marginTop: '20px',
    },
    stopButton: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      backgroundColor: '#ff3e3e',
      border: 'none',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    stopButtonHover: {
      transform: 'scale(1.05)',
    },
  };

  const navigationItems = [
    { label: 'Home', path: '/home' },
    { label: 'Account Information', path: '/account' },
    { label: 'Previous Trackings', path: '/trackings' },
    { label: 'About', path: '/about' },
  ];

  return (
    <div style={styles.homeContainer}>
      <div style={styles.topBanner}>
        <div style={styles.userProfile}>
          <div style={styles.profileIcon}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <circle cx="12" cy="8" r="4" fill="currentColor" />
              <path d="M12,14c-6.1,0-8,4-8,4v2h16v-2C20,18,18.1,14,12,14z" fill="currentColor" />
            </svg>
          </div>
          <span style={styles.userGreeting}>Hello, {userFirstName}!</span>
        </div>
        <div style={styles.tripleCircleButton} onClick={toggleMenu}>
          <div style={styles.circle}></div>
          <div style={styles.circleMid}></div>
          <div style={styles.circle}></div>
        </div>
      </div>

      <div style={styles.wavyCurve}></div>

      <div style={styles.navContainer}>
        <div style={styles.navButtonsRow}>
          {navigationItems.map((item, index) => (
            <button
              key={index}
              style={{
                ...styles.navButton,
                ...(hoveredNav === item.label ? styles.navButtonHover : {}),
                ...(item.path === '/home' ? {
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
        <div style={styles.bicepControls}>
          {['left', 'right'].map(side => (
            <div key={side} style={styles.bicepColumn}>
              <h2 style={styles.bicepLabel}>{side === 'left' ? 'Left' : 'Right'} Bicep</h2>
              <div style={styles.circleButtonWrapper}>
                <button
                  style={{
                    ...styles.circleButton,
                    ...(hoveredButton === side ? styles.circleButtonHover : {})
                  }}
                  onClick={() => startDataCollection(side)}
                  onMouseEnter={() => setHoveredButton(side)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.percentageSection}>
          <h3 style={styles.percentageLabel}>Percent Difference</h3>
          <div style={styles.curvedRectangle}>
            <div style={styles.content}></div>
          </div>
        </div>

        <div style={styles.instructionText}>
          Have a gym employee instruct you!
        </div>
      </div>

      <div style={styles.recordingOverlay}>
        <div style={styles.recordingText}>
          Recording {recordingSide === 'left' ? 'Left' : 'Right'} Bicep
        </div>
        <button
          style={{
            ...styles.stopButton,
            ...(hoveredButton === 'stop' ? styles.stopButtonHover : {})
          }}
          onClick={stopDataCollection}
          onMouseEnter={() => setHoveredButton('stop')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          STOP
        </button>
        <div style={styles.timerText}>
          {formatTime(elapsedTime)}
        </div>
      </div>
    </div>
  );
};

export default Home;
