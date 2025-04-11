import React, { useState, useEffect } from 'react';

function App() {

  const [runs, setRuns] = useState(() => Number(localStorage.getItem('runs')) || 0);

  const [balls, setBalls] = useState(() => Number(localStorage.getItem('balls')) || 0);

  const [wickets, setWickets] = useState(() => Number(localStorage.getItem('wickets')) || 0);

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {

    localStorage.setItem('runs', runs);

    localStorage.setItem('balls', balls);

    localStorage.setItem('wickets', wickets);

  }, [runs, balls, wickets]);

  useEffect(() => {

    window.addEventListener('beforeinstallprompt', (e) => {

      e.preventDefault();

      setDeferredPrompt(e);

    });

  }, []);

  const addRun = (value) => {

    setRuns(runs + value);

    setBalls(balls + 1);

  };

  const addWicket = () => {

    if (wickets < 10) {

      setWickets(wickets + 1);

      setBalls(balls + 1);

    }

  };

  const resetScore = () => {

    setRuns(0);

    setBalls(0);

    setWickets(0);

    localStorage.clear();

  };

  const overs = `${Math.floor(balls / 6)}.${balls % 6}`;

  const handleInstallClick = () => {

    if (deferredPrompt) {

      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {

        if (choiceResult.outcome === 'accepted') {

          console.log('User accepted the install prompt');

        } else {

          console.log('User dismissed the install prompt');

        }

        setDeferredPrompt(null);

      });

    }

  };

  return (
<div style={styles.container}>
<h1>Cricket Score Tracker</h1>
<div style={styles.scoreBox}>
<p><strong>Runs:</strong> {runs}</p>
<p><strong>Overs:</strong> {overs}</p>
<p><strong>Wickets:</strong> {wickets}</p>
</div>
<div style={styles.buttonGroup}>

        {[0, 1, 2, 3, 4, 6].map((run) => (
<button key={run} onClick={() => addRun(run)}>{run} Run</button>

        ))}
<button onClick={addWicket}>Wicket</button>
<button onClick={resetScore} style={styles.reset}>Reset</button>
</div>

      {deferredPrompt && (
<button onClick={handleInstallClick} style={styles.install}>

          Install App
</button>

      )}
</div>

  );

}

const styles = {

  container: {

    textAlign: 'center',

    fontFamily: 'Arial',

    padding: 20,

  },

  scoreBox: {

    border: '1px solid #ccc',

    borderRadius: 8,

    padding: 20,

    marginBottom: 20,

    display: 'inline-block',

    minWidth: 200,

  },

  buttonGroup: {

    display: 'flex',

    flexWrap: 'wrap',

    gap: 10,

    justifyContent: 'center',

    marginBottom: 20,

  },

  reset: {

    backgroundColor: '#ff4d4d',

    color: '#fff',

    padding: '8px 16px',

    borderRadius: 5,

    border: 'none',

  },

  install: {

    marginTop: 20,

    backgroundColor: '#4caf50',

    color: '#fff',

    padding: '10px 20px',

    border: 'none',

    borderRadius: 5,

  }

};

export default App; 