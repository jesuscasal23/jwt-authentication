import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  return (
    <div className="App">
      <h1>alive</h1>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);