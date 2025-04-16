import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from './TopNavBar'; // ✅ Ensure path is correct

const Home = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSide, setRecordingSide] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [userFirstName, setUserFirstName] = useState('User');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

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
        setElapsedTime((prev) => prev + 10);
      }, 10);
      setTimerInterval(interval);
    } else if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isRecording]);

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const startDataCollection = async (side) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?._id;

      setRecordingSide(side);
      setIsRecording(true);

      const res = await fetch(`https://muscleband.onrender.com/start?side=${side}&userId=${userId}`);
      const text = await res.text();
      console.log("Start response:", text);
    } catch (error) {
      console.error("Error starting data collection:", error);
    }
  };

  const stopDataCollection = async () => {
    try {
      const response = await fetch(`https://muscleband.onrender.com/stop`);
      const result = await response.text();
      console.log("Stop response:", result);
    } catch (err) {
      console.error("Error stopping data collection:", err);
    }

    setIsRecording(false);
    setRecordingSide(null);
  };

  const styles = {
    homeContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb, #e2b0ff, #d896ff)',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    mainContent: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '1400px',
      padding: '40px',
      marginTop: '120px',
      opacity: isMenuOpen || isRecording ? 0.5 : 1,
      pointerEvents: isMenuOpen || isRecording ? 'none' : 'auto',
    },
    bicepControls: {
      display: 'flex',
      justifyContent: 'center',
      gap: '200px',
      marginBottom: '40px',
    },
    bicepColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    bicepLabel: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#333',
    },
    circleButtonWrapper: {
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      background: 'linear-gradient(to bottom, #ff3e3e 0%, #ff8443 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleButton: {
      width: '140px',
      height: '140px',
      borderRadius: '50%',
      backgroundColor: 'white',
      border: 'none',
      fontWeight: 'bold',
      fontSize: '20px',
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
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
    },
    curvedRectangle: {
      width: '400px',
      height: '120px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    instructionText: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '30px',
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
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '30px',
    },
    timerText: {
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      marginTop: '20px',
    },
    stopButton: {
      width: '160px',
      height: '160px',
      borderRadius: '50%',
      backgroundColor: '#ff3e3e',
      border: 'none',
      color: 'white',
      fontSize: '26px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    stopButtonHover: {
      transform: 'scale(1.05)',
    },
  };

  return (
    <div style={styles.homeContainer}>
      <TopNavBar
        userFirstName={userFirstName}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        hoveredNav={hoveredNav}
        setHoveredNav={setHoveredNav}
      />

      <div style={styles.mainContent}>
        <div style={styles.bicepControls}>
          {['left', 'right'].map((side) => (
            <div key={side} style={styles.bicepColumn}>
              <h2 style={styles.bicepLabel}>{side === 'left' ? 'Left' : 'Right'} Bicep</h2>
              <div style={styles.circleButtonWrapper}>
                <button
                  style={{
                    ...styles.circleButton,
                    ...(hoveredButton === side ? styles.circleButtonHover : {}),
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
            Waiting for results...
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
            ...(hoveredButton === 'stop' ? styles.stopButtonHover : {}),
          }}
          onClick={stopDataCollection}
          onMouseEnter={() => setHoveredButton('stop')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          STOP
        </button>
        <div style={styles.timerText}>{formatTime(elapsedTime)}</div>
      </div>
    </div>
  );
};

export default Home;
