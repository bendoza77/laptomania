import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProviver } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LaptopProvider } from './context/LaptopContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProviver>
       <LaptopProvider>
         <App />
       </LaptopProvider>
      </AuthProviver>
    </BrowserRouter>
)
