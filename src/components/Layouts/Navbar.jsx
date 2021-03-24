import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";
import actionType from "../../redux/reducer/globalType";
function Navbar({ wishlistCount, showLogin }) {
  const { pathname } = useLocation();
  const arrPath = pathname.split("/");
  const route = arrPath[1] || "home";

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
          <form method="GET" className="w-1/2">
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 right-0 flex items-center ">
                <button
                  type="submit"
                  className="focus:outline-none focus:shadow-outline hover:bg-primary  bg-secondary rounded-full h-full w-9 flex justify-center items-center"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
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
        <nav className="px-10 grid grid-flow-col grid-cols-8 bg-primary h-14 font-mont font-bold text-xs">
          <button className="flex bg-white col-span-1 justify-center items-center focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 mr-2 text-color4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <h6 className="text-color3 font-bold text-base">Kategori</h6>
          </button>
          <ul className="px-10 col-span-12 md:col-span-3  md:flex flex-grow  justify-between items-center text-white">
            <li className="nav-item flex flex-col justify-center group">
              <div
                className={
                  (route == "home" ? "opacity-100" : "opacity-0") +
                  " group-hover:opacity-100 w-1/2  bg-white self-center"
                }
                style={{ height: 2 }}
              ></div>
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white "
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item inline px-4 cursor-pointer uppercase tracking-wide relative flex flex-col justify-center group">
              <div
                className={
                  (route == "products" ? "opacity-100" : "opacity-0") +
                  " group-hover:opacity-100 w-1/2  bg-white self-center"
                }
                style={{ height: 2 }}
              ></div>
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase  font-normal leading-snug text-white group-hover:font-bold"
                to="/products"
              >
                Lelang
              </Link>
            </li>
            <li className="nav-item flex flex-col justify-center group">
              <div
                className="opacity-0 group-hover:opacity-100 w-1/2  bg-white self-center"
                style={{ height: 2 }}
              ></div>
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-normal leading-snug text-white "
                href="#pablo"
              >
                Tentang
              </a>
            </li>
            <li className="nav-item flex flex-col justify-center group">
              <div
                className="opacity-0 group-hover:opacity-100 w-1/2  bg-white self-center"
                style={{ height: 2 }}
              ></div>
              <a
                className="px-3 py-2 flex items-center text-xs uppercase  font-normal leading-snug text-white "
                href="#pablo"
              >
                Kontak
              </a>
            </li>
          </ul>
          <div className="col-start-8 col-span-1 flex items-center">
            <button
              onClick={showLogin}
              className="text-white focus:outline-none text-white px-2 py-1 text-sm rounded  mr-3"
            >
              Login
            </button>
            {/*  <button className="bg-danger hover:bg-danger-2 border-2- border-danger focus:outline-none text-white px-2 py-1 text-sm rounded">
                    Register
                  </button>
            */}
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    wishlistCount: state.wishlist.length,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: () => dispatch({ type: actionType.TOGGLE_LOGIN }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
