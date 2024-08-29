import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TasksContextProvider } from './context/TaskContext'
import { AuthContextProvider } from './context/AuthContext'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
