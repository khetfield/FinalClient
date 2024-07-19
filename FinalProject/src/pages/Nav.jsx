import { Link } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { LoginRounded } from "@mui/icons-material";
import { useLogoutMutation } from "../slices/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Nav = () => {
  const token = useSelector((state) => state.auth.credentials.token);
  const [logout] = useLogoutMutation();
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.auth.credentials);
  const user_id = useSelector((state) => state.auth.credentials.users.id);
  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    window.addEventListener("scroll", function (e) {
      currentScrollPosition = window.scrollY;
      if (previousScrollPosition - currentScrollPosition < 0) {
        setShow(true);
      } else if (previousScrollPosition - currentScrollPosition > 0) {
        setShow(false);
      }
      previousScrollPosition = currentScrollPosition;
    });
  }, []);
  return (
    <nav className={`active ${show && "hidden"}`}>
      {token ? (
        <>
          <ul className="navlinks">
            <li>
              <Link to="/">
                Home
                <HomeRoundedIcon className="icons" />
              </Link>
            </li>
            <li>
              <Link to="/products">
                Shop
                <MenuBookRoundedIcon className="productsicon"></MenuBookRoundedIcon>
              </Link>
            </li>
            {user.users.is_admin && (
              <li>
                <Link to={"/addProducts"}>
                  Add Product
                  <AddCircleIcon className={"addCircleIcon"} />
                </Link>
              </li>
            )}
            <li>
              <Link to={`/cart/users/${user_id}`}>
                Order Cart
                <LocalGroceryStoreRoundedIcon className="carticon"></LocalGroceryStoreRoundedIcon>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                Account
                <Person2RoundedIcon className="icons"></Person2RoundedIcon>
              </Link>
            </li>
            <button onClick={logout} className="logoutbutton">
              Log Out
            </button>
          </ul>
        </>
      ) : (
        <ul className="navlinks">
          <li>
            <Link to="/">
              Home
              <HomeRoundedIcon className="icons" />
            </Link>
          </li>
          <li>
            <Link to="/products">
              Shop
              <MenuBookRoundedIcon className="productsicon"></MenuBookRoundedIcon>
            </Link>
          </li>
          <li>
            <Link to={"/login"}>
              Login
              <LoginRounded className="loginicon" />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
