import Search from "./Search";
import Logo from "./Logo";
import Loginbutton from "./Loginbutton";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function HeaderTools() {
  const { url } = useContext(AppContext);

  const setSearch = () => {
    if (url == "/Login" || url == "/SignUp") {
      return false;
    } else {
      return true;
    }
  };

  console.log(setSearch());

  return (
    <div className="flex justify-between">
      <div>
        <a href="/">
          <Logo />
        </a>
      </div>

      <div className="pt-1">{setSearch() ? <Search /> : null}</div>
      <div className="pt-1 pr-5 ">
        <Loginbutton />
      </div>
    </div>
  );
}

export default HeaderTools;
