import React from "react";

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

function NavButtons() {
  return(
    <div>
      <a className="home-btn navbar-btn">Accueil</a>
      <a className="dress-btn navbar-btn">Robes</a>
      <a className="accessories-btn navbar-btn">Accesoires</a>
      <a className="cart-btn navbar-btn">Panier</a>        
    </div>
  )
}

function Navbar() {
  React.useEffect(() => {
    if (isNavbarDeployed == false)
    {
      let mobileNavbar = document.getElementById("mobile-navbar");
      mobileNavbar?.setAttribute("style", "transform: translateX(-100%);");
    }
    function handleResize()
    {
      let mobileNavbar = document.getElementById("mobile-navbar");
      let desktopMenuBtn = document.getElementById("desktop-menu-btn");
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
    window.addEventListener('resize', handleResize);
  })
  return (
    <>
      <div id="mobile-navbar">
        <a className="menu-toggle-btn" id="mobile-menu-btn" onClick={toggleNavbar}>X</a>
        <NavButtons/>
      </div>
      <div id="desktop-navbar">
        <a className="menu-toggle-btn" id="desktop-menu-btn" onClick={toggleNavbar}>+</a>
        <NavButtons/>
      </div>
    </>
  )
}

export default Navbar