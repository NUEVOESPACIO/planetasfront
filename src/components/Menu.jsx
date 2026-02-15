function Menu({ currentView, onNavigate, habilitadosxrol }) {
  const handleClick = (e, viewId) => {
    e.preventDefault();
    onNavigate(viewId);
  };

  return (
    <nav className="menu">
      <ul>
        <li>
          <a 
            href="#login"
            onClick={(e) => handleClick(e, 'home')}
            className={`
              ${currentView === 'home' ? 'active' : ''}
              ${!habilitadosxrol.includes('home') ? 'disabled' : ''}
            `}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#login"
            onClick={(e) => handleClick(e, 'login')}
            className={`
              ${currentView === 'login' ? 'active' : ''}
              ${!habilitadosxrol.includes('login') ? 'disabled' : ''}
            `}
            
          >
            Login
          </a>
        </li>
        <li>
          <a 
            href="#bienvenida"
            onClick={(e) => handleClick(e, 'bienvenida')}
            className={`
              ${currentView === 'bienvenida' ? 'active' : ''}
              ${!habilitadosxrol.includes('bienvenida') ? 'disabled' : ''}
            `}
          >
            Bienvenida
          </a>
        </li>

        <li>
          <a 
            href="#editmydata"
            onClick={(e) => handleClick(e, 'editmydata')}
            className={`
              ${currentView === 'editmydata' ? 'active' : ''}
              ${!habilitadosxrol.includes('editmydata') ? 'disabled' : ''}
            `}
          >
            Editar mi info
          </a>
        </li>
        <li>
          <a 
            href="#todoslosusuarios"
            onClick={(e) => handleClick(e, 'todoslosusuarios')}
            className={`
              ${currentView === 'todoslosusuarios' ? 'active' : ''}
              ${!habilitadosxrol.includes('todoslosusuarios') ? 'disabled' : ''}
            `}
          >
            Todos los Usuarios
          </a>
        </li>

        <li>
          <a 
            href="#logout"
            onClick={(e) => handleClick(e, 'logout')}
            className={`
              ${currentView === 'logout' ? 'active' : ''}
              ${!habilitadosxrol.includes('logout') ? 'disabled' : ''}
            `}
          >
            Logout
          </a>
        </li>
        <li>
          <a 
            href="#contact"
            onClick={(e) => handleClick(e, 'contacto')}
            className={`
              ${currentView === 'contacto' ? 'active' : ''}
              ${!habilitadosxrol.includes('contacto') ? 'disabled' : ''}
            `}
          >
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;