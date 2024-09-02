import React from "react";

var isNavbarDeployed = false;
function toggleNavbar()
{
  let mobileNavbar = document.getElementById("mobile-navbar");
  switch(isNavbarDeployed)
  {
    case true: mobileNavbar?.setAttribute("style", "transform: translateX(0%);");
    isNavbarDeployed = false;
    break;
    case false: mobileNavbar?.setAttribute("style", "transform: translateX(100%);")
    isNavbarDeployed = true;
    break;
  }
}

function NavButtons() {
  return(
    <>
      <a className="home-btn navbar-btn">Accueil</a>
      <a className="dress-btn navbar-btn">Robes</a>
      <a className="accessories-btn navbar-btn">Accesoires</a>
      <a className="cart-btn navbar-btn">Panier</a>        
    </>
  )
}

function Navbar() {
  // React.useEffect(() => {
  //   function handleResize()
  //   {
  //     if (window.innerWidth > 720)
  //     {
  //       let mobileNavbar = document.getElementById("navbar");
  //       mobileNavbar?.setAttribute("style", "transform: translateX(0%);");
  //     }
  //   }
  //   window.addEventListener('resize', handleResize);
  // })
  return (
    <>
      <div id="mobile-navbar">
        <a className="menu-toggle-btn" onClick={toggleNavbar}>X</a>
        <NavButtons/>
      </div>
      <div id="desktop-navbar">
        <a className="menu-toggle-btn" onClick={toggleNavbar}>+</a>
        <NavButtons/>
      </div>
      {/* <div id="navbar">
        <a className="mobile-menu-btn" onClick={closeNavbar}>X</a>
        <a className="home-btn">Accueil</a>
        <a className="dress-btn">Robes</a>
        <a className="accessories-btn">Accesoires</a>
        <a className="cart-btn">Panier</a>        
      </div>   */}
    </>
  )
}

export default Navbar