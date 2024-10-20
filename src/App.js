import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import SettingsIcon from './SettingsIcon';

function App() {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [settings, setSettings] = useState({
    pomodoroDuration: 25,
    breakDuration: 5,
  });
  const [tempSettings, setTempSettings] = useState({
    pomodoroDuration: 25,
    breakDuration: 5,
  });
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);
  const [gradientPosition, setGradientPosition] = useState({ left: 0, top: 0 });
  const [activePage, setActivePage] = useState('pomodoro');
  const [isBursting, setIsBursting] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [showGradient, setShowGradient] = useState(true);
  const [currentTask, setCurrentTask] = useState('');

  const logSession = useCallback(() => {
    const now = new Date();
    const session = {
      timestamp: now.toISOString(),
      duration: settings.pomodoroDuration,
    };
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    sessions.push(session);
    localStorage.setItem('sessions', JSON.stringify(sessions));
    localStorage.setItem('pomodoroCount', pomodoroCount + 1);
  }, [settings.pomodoroDuration, pomodoroCount]);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      if (isBreak) {
        setTime(settings.pomodoroDuration * 60);
        setIsBreak(false);
      } else {
        setTime(settings.breakDuration * 60);
        setIsBreak(true);
        setPomodoroCount((count) => count + 1);
        logSession();
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time, isBreak, settings, logSession]);

  useEffect(() => {
    const storedCount = localStorage.getItem('pomodoroCount');
    if (storedCount) {
      setPomodoroCount(parseInt(storedCount, 10));
    }
  }, []);

  useEffect(() => {
    const totalTime = isBreak ? settings.breakDuration * 60 : settings.pomodoroDuration * 60;
    const elapsedTime = totalTime - time;
    const calculatedProgress = (elapsedTime / totalTime) * 100;
    setProgress(calculatedProgress);
  }, [time, isBreak, settings]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    setIsTimerRunning(!isActive);
    if (!isActive) {
      setIsExpanding(true);
      setShowGradient(true);
      setTimeout(() => {
        setIsExpanding(false);
        setShowGradient(false);
      }, 8000); // Changed from 5000 to 8000 to match the new animation duration
    } else {
      setShowGradient(true);
    }
  };

  const resetTimer = () => {
    setTime(settings.pomodoroDuration * 60);
    setIsActive(false);
    setIsBreak(false);
    setIsTimerRunning(false);
    setShowGradient(true);
    setIsExpanding(false); // Add this line to ensure the gradient is not in expanding state
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setTempSettings((prevSettings) => ({
      ...prevSettings,
      [name]: parseInt(value, 10),
    }));
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setTempSettings({ ...settings });
  };

  const applySettings = () => {
    setSettings(tempSettings);
    if (!isActive) {
      if (isBreak) {
        setTime(tempSettings.breakDuration * 60);
      } else {
        setTime(tempSettings.pomodoroDuration * 60);
      }
    }
    toggleSettings();
  };

  const handleTaskChange = (e) => {
    setCurrentTask(e.target.value);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'pomodoro':
        return (
          <>
            {showGradient && (
              <div 
                className={`gradient ${isExpanding ? 'expanding' : ''}`}
              ></div>
            )}
            <div className="pomodoro-container">
              <div className={`timer-container ${isTimerRunning ? 'active' : ''}`}>
                <h1 className={`timer ${isBreak ? 'break' : ''}`}>{formatTime(time)}</h1>
                <p className="session-type">
                  {isBreak ? `Break: ${settings.breakDuration} minutes` : `Pomodoro: ${settings.pomodoroDuration} minutes`}
                </p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="controls">
                  <button onClick={toggleTimer}>{isActive ? 'Stop' : 'Start'}</button>
                  <button onClick={resetTimer}>Reset</button>
                </div>
                <p className="pomodoro-count">Pomodoros completed today: {pomodoroCount}</p>
              </div>
              <input
                type="text"
                className="task-input"
                placeholder="What are you working on?"
                value={currentTask}
                onChange={handleTaskChange}
              />
            </div>
          </>
        );
      case 'statistics':
        return (
          <div className="statistics-container">
            <h2>Statistics</h2>
            <p>This page is under construction.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`App ${activePage}`}>
      <header className="app-header">
        <nav className="menu-bar">
          <button 
            className={`menu-item ${activePage === 'pomodoro' ? 'active' : ''}`}
            onClick={() => setActivePage('pomodoro')}
          >
            Pomodoro
          </button>
          <button 
            className={`menu-item ${activePage === 'statistics' ? 'active' : ''}`}
            onClick={() => setActivePage('statistics')}
          >
            Statistics
          </button>
        </nav>
      </header>
      {renderContent()}
      <button className="settings-button" onClick={toggleSettings}>
        <SettingsIcon size={28} />
      </button>
      {showSettings && (
        <div className="settings-overlay">
          <div className="settings-popup">
            <h2>Settings</h2>
            <label>
              Pomodoro Duration (minutes):
              <input
                type="number"
                name="pomodoroDuration"
                value={tempSettings.pomodoroDuration}
                onChange={handleSettingsChange}
                min="1"
              />
            </label>
            <label>
              Break Duration (minutes):
              <input
                type="number"
                name="breakDuration"
                value={tempSettings.breakDuration}
                onChange={handleSettingsChange}
                min="1"
              />
            </label>
            <div className="settings-buttons">
              <button onClick={applySettings}>Apply</button>
              <button onClick={toggleSettings}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
