import React from "react";
import { Link } from "react-router-dom";

var isNavbarDeployed = false;
function toggleNavbar()
{
  let mobileNavbar = document.getElementById("mobile-navbar");
  switch(isNavbarDeployed)
  {
    case false: mobileNavbar?.setAttribute("style", "transform: translateX(0%);");
    isNavbarDeployed = true;
    break;
    case true: mobileNavbar?.setAttribute("style", "transform: translateX(-100%);")
    isNavbarDeployed = false;
    break;
  }
}
function closeNavbar()
{
  let mobileNavbar = document.getElementById("mobile-navbar");
  mobileNavbar?.setAttribute("style", "transform: translateX(-100%);")
  isNavbarDeployed = false;
}

function NavButtons() {
  return(
    <div>
      <Link to="/" className="navbar-btn btn-underline-effect" onClick={closeNavbar}>Accueil</Link>
      <Link to="/confections" className="navbar-btn btn-underline-effect" onClick={closeNavbar}>Confections</Link>
      <Link to="/contacter" className="navbar-btn btn-underline-effect" onClick={closeNavbar}>Nous contacter</Link>
      <Link to="/panier" className="navbar-btn btn-underline-effect" onClick={closeNavbar}>Panier</Link>
    </div>
  )
}

function Navbar() {
  React.useEffect(() => {
    let mobileNavbar = document.getElementById("mobile-navbar");
    let desktopMenuBtn = document.getElementById("desktop-menu-btn");
    if (isNavbarDeployed == false)
    {
      mobileNavbar?.setAttribute("style", "transform: translateX(-100%);");
    }
    function handleResize()
    {
      if (window.innerWidth > 720)
      {
        mobileNavbar?.setAttribute("style", "transform: translateX(-100%);");
        desktopMenuBtn?.setAttribute("style", "visibility: hidden;");
        isNavbarDeployed = false;
      }
      else
      {
        desktopMenuBtn?.setAttribute("style", "visibility: visible;");
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
  })
  return (
    <>
      <div id="mobile-navbar">
        <a className="menu-toggle-btn" id="mobile-menu-btn" onClick={toggleNavbar}>
          <img src="cross.svg"></img>
        </a>
        <NavButtons/>
      </div>
      <div id="desktop-navbar">
        <a className="menu-toggle-btn" id="desktop-menu-btn" onClick={toggleNavbar}>
          <img src="settings.svg"></img>
        </a>
        <NavButtons/>
      </div>
    </>
  )
}

export default Navbar