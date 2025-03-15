import "./styles.scss";
import logo from "../../assets/logo.png";
import { useState } from "react";
import SideBar from "../SideBar";

const Header = () => {
  const [sideBar, setSideBar] = useState(false);

  const handleChangeSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <header>
      {sideBar && <SideBar handleChangeSideBar={handleChangeSideBar} />}

      <nav>
        <button onClick={handleChangeSideBar}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </button>
      </nav>
      <div className="logo">
        <img src={logo} alt="loog" />
      </div>
      <div className="socials">
        <a target="_blank" href="https://www.linkedin.com/in/klajdi-zmalaj-42b582142/">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/klajdi-zmalaj-42b582142/">
          <i className="fa-brands fa-facebook" aria-hidden="true"></i>
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/klajdi-zmalaj-42b582142/">
          <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
        </a>
      </div>
    </header>
  );
};
export default Header;
