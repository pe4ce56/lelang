import { faKey, faPray, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { API } from "../../config/config";
import actionType from "../../redux/reducer/globalType";

function ModalLogin({
  hideModal,
  loginMessage,
  removeLoginMessage,
  fetchWishlist,
}) {
  const hide = (event) => {
    event.preventDefault();
    let dataValue = event.target.getAttribute("data-value");
    if (dataValue == "modal") {
      hideModal();
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios(`${API}/api/auth`, {
      method: "POST",
      data: { username, password },
    })
      .then((res) => {
        const { token, user } = res.data;
        if (token && user) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          axios(`${API}/api/auctions/wishlist/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => {
            fetchWishlist(res.data.data);
          });
          removeLoginMessage();
          hideModal();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <main
      onClick={hide}
      data-value="modal"
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black bg-opacity-70"
    >
      <div className="relative w-auto my-6 mx-auto w-3/4 md:max-w-2xl h-auto lg:h-3/4">
        {/*content*/}
        <div className="border-0 shadow-lg relative flex flex-col w-full h-full bg-secondary rounded-xl overflow-hidden">
          {/*Header*/}
          <div className="bg-secondary flex  pl-6 pr-3 py-4">
            <p className="text-white text-2xl font-extrabold text-mont ">
              Login
            </p>
            <button
              onClick={hideModal}
              className="w-6 h-6 ml-auto  text-color2 hover:text-white focus:outline-none"
            >
              X
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" py-6  px-8 flex-auto bg-white"
          >
            {loginMessage && (
              <p className="text-sm text-mont text-danger">{loginMessage}</p>
            )}
            <div className="relative ">
              <span className="absolute inset-y-0 left-4 top-4 flex items-center ">
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  className="text-primary"
                />
              </span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="mt-4 w-full text-lg focus:outline-none bg-gray-100 rounded-full py-3 pr-4 pl-12 text-color3 font-mont"
              />
            </div>
            <div className="relative ">
              <span className="absolute inset-y-0 left-4 top-4 flex items-center ">
                <FontAwesomeIcon
                  icon={faKey}
                  size="lg"
                  className="text-primary"
                />
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="mt-5 w-full  focus:outline-none bg-gray-100 rounded-full py-3 pr-4 pl-12 text-color3 font-mont"
              />
            </div>
            <div className="flex">
              <button
                type="submit"
                onClick={handleSubmit}
                className="mt-6 px-8 py-2 rounded-full bg-primary text-white text-lg font-mont font-bold"
              >
                Login
              </button>
              <button
                type="button"
                className="ml-3 mt-6 px-8 py-2 rounded-full bg-primary text-white text-lg font-mont font-bold"
              >
                Registrasi
              </button>
            </div>
            <p className="mt-4 font-mont text-primary text-base">
              Lupa Password?
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return { loginMessage: state.loginMessage };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWishlist: (value) =>
      dispatch({ type: actionType.FETCH_WISHLIST, value }),
    hideModal: () => dispatch({ type: actionType.TOGGLE_LOGIN }),
    removeLoginMessage: () =>
      dispatch({ type: actionType.SET_LOGIN_MESSAGE, value: "" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);
