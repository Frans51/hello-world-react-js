import React, { useState } from 'react';
import './App.css'; // Vous pouvez garder le style par défaut ou le modifier

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const callBackend = () => {
    setMessage('');
    setError('');
    setLoading(true);

    // On appelle l'URL complète de votre backend
    // Assurez-vous que votre backend Spring Boot est bien démarré sur le port 8080
    fetch('http://localhost:8080')
      .then(response => {
        if (!response.ok) {
          throw new Error('La requête a échoué. Le backend est-il bien en cours d\'exécution ?');
        }
        return response.text(); // La réponse attendue est du texte simple
      })
      .then(text => {
        setMessage(text);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend avec Vite & React</h1>
        <p>Cliquez pour appeler le backend sur <code>localhost:8080</code></p>
        
        <button onClick={callBackend} disabled={loading}>
          {loading ? 'Chargement...' : 'Appeler le Backend'}
        </button>

        {message && (
          <div style={{ marginTop: '20px' }}>
            <h4>Réponse du serveur :</h4>
            <p className="server-response">{message}</p>
          </div>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}
      </header>
    </div>
  );
}

export default App;
