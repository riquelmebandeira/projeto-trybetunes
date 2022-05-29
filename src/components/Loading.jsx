import React from 'react';
import '../styles/components/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-message-container">
        <span>Carregando...</span>
      </div>
    );
  }
}

export default Loading;
