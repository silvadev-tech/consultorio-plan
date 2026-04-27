import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'

axios.defaults.baseURL = 'https://railway.app';
ReactDOM.createRoot(document.getElementById('root')).render(
<ReactDOM.StrictMode>
<App />
</ReactDOM.StrictMode>,
)

