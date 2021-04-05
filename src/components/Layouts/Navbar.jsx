import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import actionType from "../../redux/reducer/globalType";
function Navbar({
  wishlistCount,
  showLogin,
  removeLoginMessage,
  removeWishlist,
}) {
  const { pathname, search } = useLocation();
  const arrPath = pathname.split("/");
  const route = arrPath[1] || "home";
  const [login, setLogin] = useState(false);
  const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(search).get("q");
    setQuery(q);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
      return;
    }
    setLogin(false);
  });

  const handleAuth = () => {
    if (!login) {
      removeLoginMessage();
      showLogin();
      return;
    }
    swal({
      title: "Yakin ingin keluar?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        removeWishlist();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLogin(false);
      }
    });
  };

  return (
    <React.Fragment>
      <header>
        <div className="hidden md:flex py-6 px-10 flex justify-between justify-items-center">
          <div className="flex-initial flex">
            <h3 className="text-primary text-4xl font-sans font-bold">Le</h3>
            <h3 className="text-secondary text-4xl  font-sans font-bold">
              Lang
            </h3>
          </div>
          <form method="GET" action="/products" className="w-1/2">
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 right-0 flex items-center ">
                <button
                  type="submit"
                  className="focus:outline-none focus:shadow-outline hover:bg-primary  bg-secondary rounded-full h-full w-9 flex justify-center items-center"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    j="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                onChange={(e) => setQuery(e.target.value)}
                value={query || ""}
                type="text"
                name="q"
                className="py-2 text-xs text-color2 rounded-md pr-10 pl-2 focus:outline-none focus:bg-white focus:text-gray-900 rounded-full border-2 border-color2  w-full"
                placeholder="Search..."
                autoComplete="off"
              />
            </div>
          </form>
          <Link to="/wishlist" className="flex-initial flex group">
            <div className="flex-initial">
              <p className="text-secondary text-xs font-bold font-mont">
                Wishlist
              </p>
              <p className="text-color2 text-xs font-mont">
                {wishlistCount || 0} Barang
              </p>
            </div>
            <div className="flex-initial">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className=" w-6 text-color2 group-hover:text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </Link>
        </div>

        <nav className="flex items-center justify-between flex-wrap bg-primary p-6 md:px-20">
          <div className="flex items-center flex-no-shrink text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">
              Lelang Kita
            </span>
          </div>
          <div className="block md:hidden">
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
              className="flex items-center px-3 py-2 border rounded  border-white hover:text-white  text-white hover:border-white focus:outline-none hover:bg-blue-400"
            >
              <svg
                className="h-3 w-3  fill-current "
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={
              (toggle ? "block" : "hidden") +
              " w-full flex-grow md:flex md:items-center md:w-auto md:ml-6 transition ease-in duration-700"
            }
          >
            <ul className="md:flex  gap-4 md:flex-grow">
              <li className="nav-item justify-center group w-full md:w-auto">
                <div
                  className={
                    (route == "home" ? "opacity-100" : "opacity-0") +
                    " group-hover:opacity-100 hidden md:block bg-white self-center "
                  }
                  style={{ height: 2 }}
                ></div>
                <Link
                  className={
                    (route == "home"
                      ? "text-white font-bold"
                      : "text-gray-200 font-bold") +
                    "items-center text-xs group-hover:text-gray-200 uppercase leading-snug "
                  }
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item justify-center group  w-full md:w-auto">
                <div
                  className={
                    (route == "products" ? "opacity-100" : "opacity-0") +
                    " group-hover:opacity-100 hidden md:block bg-white self-center "
                  }
                  style={{ height: 2 }}
                ></div>
                <Link
                  className={
                    (route == "products"
                      ? "text-white font-bold"
                      : "text-gray-200 font-bold") +
                    "items-center text-xs group-hover:text-gray-200 uppercase leading-snug "
                  }
                  to="/products"
                >
                  Product
                </Link>
              </li>
              <li className="nav-item justify-center group  w-full md:hidden">
                <div
                  className={
                    (route == "products" ? "opacity-100" : "opacity-0") +
                    " group-hover:opacity-100 hidden md:block bg-white self-center "
                  }
                  style={{ height: 2 }}
                ></div>
                <Link
                  className={
                    (route == "wishlish"
                      ? "text-white font-bold"
                      : "text-gray-200 font-bold") +
                    "items-center text-xs group-hover:text-gray-200 uppercase leading-snug "
                  }
                  to="/wishlist"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
            <div>
              <button
                type="button"
                onClick={handleAuth}
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-primary hover:bg-white mt-4 md:mt-0 focus:outline-none"
              >
                {login ? "Logout" : "login"}
              </button>
              {login ? (
                <Link
                  to="/profile"
                  className="inline-block text-sm px-4 py-2 ml-2 leading-none border rounded text-white border-secondary hover:border-white bg-secondary mt-4 md:mt-0 focus:outline-none hover:bg-primary "
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/registrasi"
                  className="inline-block text-sm px-4 py-2 ml-2 leading-none border rounded text-white border-secondary hover:border-white bg-secondary mt-4 md:mt-0 focus:outline-none hover:bg-primary "
                >
                  registrasi
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    wishlistCount: state.wishlist.length,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: () => dispatch({ type: actionType.TOGGLE_LOGIN }),
    removeWishlist: () =>
      dispatch({ type: actionType.FETCH_WISHLIST, value: [] }),
    removeLoginMessage: (msg) =>
      dispatch({ type: actionType.SET_LOGIN_MESSAGE, value: "" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
