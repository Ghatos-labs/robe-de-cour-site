import React from "react";

// function openNavbar()
// {
//   let mobileNavbar = document.getElementById("navbar");
//   mobileNavbar?.setAttribute("style", "transform: translateX(0%);");
// }

// function closeNavbar()
// {
//   let mobileNavbar = document.getElementById("navbar");
//   mobileNavbar?.setAttribute("style", "transform: translateX(-100%);");
// }

function NavButtons() {
  return(
    <>
      <a className="home-btn">Accueil</a>
      <a className="dress-btn">Robes</a>
      <a className="accessories-btn">Accesoires</a>
      <a className="cart-btn">Panier</a>        
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
        <a className="mobile-menu-btn">X</a>
        <NavButtons/>
      </div>
      <div id="desktop-navbar">
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