import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react'; 

const PUBLISHABLE_KEY = "pk_test_c3F1YXJlLXJlcHRpbGUtMTQuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error('Clerk publishable key is missing.');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);