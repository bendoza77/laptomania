import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProviver } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LaptopProvider } from './context/LaptopContext.jsx'
import './index.css'
import { CartProvider } from './context/Cart.content.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProviver>
      <LanguageProvider>
        <LaptopProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </LaptopProvider>
      </LanguageProvider>
    </AuthProviver>
  </BrowserRouter>
)
