import { useState, useEffect } from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import Home from './components/Home'
import Bienvenida from './components/Bienvenida'
import Logout from './components/Logout'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import Login from "./components/Login";
import Editmydata from "./components/Editmydata"
import Todoslosusuarios from "./components/Todoslosusuarios"
import Abmplanetas from './components/abmplanetas'
import './App.css'

function App() {

  const [currentView, setCurrentView] = useState('home')

  const viewsByRole = {
    NONE: ['home', 'login', 'contacto'], // sin rol
    ROLE_ADMIN: ['home', 'logout', 'bienvenida', 'contacto', 'editmydata','todoslosusuarios','abmplanetas'],
    ROLE_VISIT: ['home', 'logout', 'contacto', 'bienvenida', 'editmydata','abmplanetas'],
    ROLE_CIENTIFICO: ['home', 'logout', 'contacto', 'bienvenida', 'editmydata','abmplanetas'],
    ROLE_ASTRONOMO: ['home', 'logout', 'contacto', 'bienvenida', 'editmydata','abmplanetas']
  };

  useEffect(() => {
    localStorage.setItem("token", "");
    localStorage.setItem("rol", "");
    localStorage.setItem("datauser", "")
  }, []);

  const role = (localStorage.getItem("rol") || 'NONE').trim();
  const enabledViews = viewsByRole[role] ?? viewsByRole['NONE'];

  const handleNavigate = (viewId) => {
    setCurrentView(viewId)
  }

  const renderCenter = () => {
    switch (currentView) {
      case 'login':
        return <Login SebasNavegation={handleNavigate} />
      case 'home':
        return <Home />
      case 'logout':
        return <Logout SebasNavegation={handleNavigate} />
      case 'bienvenida':
        return <Bienvenida />
      case 'editmydata':
        return <Editmydata />
      case 'contacto':
        return <Contacto />    
      case 'todoslosusuarios':
        return <Todoslosusuarios />
        case 'abmplanetas':
          return <Abmplanetas />
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <Header />
      <Menu currentView={currentView} onNavigate={handleNavigate} habilitadosxrol={enabledViews} />
      {renderCenter()}
      <Footer />
    </div>
  )
}

export default App