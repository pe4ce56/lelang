import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGavel,
  faSearch,
  faHeart as faHeartActive,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Countdown from "react-countdown";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { API } from "../../config/config";
import ModalQuickView from "../Layouts/ModalQuickView";
import actionType from "../../redux/reducer/globalType";
import { formatRupiah } from "../../config/helper";

function GridView(props) {
  const {
    wishlist,
    toggleWishlist,
    showQuickView,
    quickView,
    setLoginMessage,
    showLogin,
    data,
  } = props;

  const handleWishlist = () => {
    const client_id = auth(
      "Login terlebih dahulu untuk memasukkan ke wishlist"
    );
    if (!client_id) return;

    toggleWishlist(data.auctions_id);
  };
  const auth = (msg) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginMessage(msg);
      showLogin();
      return null;
    }
    return JSON.parse(localStorage.getItem("user")).id;
  };

  const countDownView = ({ days, hours, minutes, seconds, completed }) => (
    <Fragment>
      <div className="grid-span-1 text-center">
        <p className="text-lg text-primary text-mont text-bold">{days}</p>
        <p className="text-sm text-color3 text-mont text-bold uppercase">
          Hari
        </p>
      </div>
      <div className="grid-span-1 text-center">
        <p className="text-lg text-primary text-mont text-bold">{hours}</p>
        <p className="text-sm text-color3 text-mont text-bold uppercase">Jam</p>
      </div>
      <div className="grid-span-1 text-center">
        <p className="text-lg text-primary text-mont text-bold">{minutes}</p>
        <p className="text-sm text-color3 text-mont text-bold uppercase">
          Menit
        </p>
      </div>
      <div className="grid-span-1 text-center">
        <p className="text-lg text-primary text-mont text-bold">{seconds}</p>
        <p className="text-sm text-color3 text-mont text-bold uppercase">
          Detik
        </p>
      </div>
    </Fragment>
  );
  return (
    data && (
      <Fragment>
        {quickView && <ModalQuickView />}
        <div className="relative max-w-full overflow-hidden shadow-lg pt-5 ">
          <div className="absolute top-10 left-4">
            <Link to={`/products/${data.auctions_id}`}>
              <div className="rounded-full bg-primary text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer">
                <FontAwesomeIcon icon={faGavel} />
              </div>
            </Link>
            <div
              onClick={handleWishlist}
              className={
                (wishlist.find(
                  (result) => result.auction_id == data.auctions_id
                )
                  ? "bg-primary text-white "
                  : "bg-white text-color2 ") +
                "rounded-full hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer mt-5"
              }
            >
              <FontAwesomeIcon
                icon={
                  wishlist.find(
                    (result) => result.auction_id == data.auctions_id
                  )
                    ? faHeartActive
                    : faHeart
                }
              />
            </div>

            <button
              onClick={() => showQuickView(data.auctions_id)}
              className="focus:outline-none rounded-full bg-white text-color2 hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer mt-5"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <Link to={`/products/${data.auctions_id}`}>
            <div className="h-72 z-0">
              <img
                className="object-contain w-3/4 h-60 mx-auto z-0"
                src={`${API}/items_image/${data.item_id}/${data.images[0].path}`}
                alt="Sunset in the mountains"
              />
            </div>
            {data.status == "open" ? (
              data.end_date && (
                <div className="w-full absolute top-56 md:px-4">
                  <div className="py-2  w-auto grid grid-flow-col grid-cols-4 shadow-md  divide-x ">
                    <Countdown
                      date={new Date(data.end_date)}
                      renderer={countDownView}
                    />
                  </div>
                </div>
              )
            ) : (
              <div className="w-full absolute top-56 md:px-4">
                <div className="py-5  w-auto shadow-md  divide-x ">
                  <p className="text-center text-xl text-grey-200">
                    Lelang Ditutup
                  </p>
                </div>
              </div>
            )}
            <div className="px-2 py-2 border-t-2 border-color1">
              <div className="font-bold text-xl text-secondary mb-2 text-center font-mont">
                {data.item_name}
              </div>
              <div className="mb-2 flex justify-center">
                <p className="text-color2 text-sm font-mont">Tawaran: </p>
                <p className="text-secondary font-bold text-sm font-mont">
                  {formatRupiah(data.price, "RP. ")}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </Fragment>
    )
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    showQuickView: (id) =>
      dispatch({ type: actionType.SHOW_QUICK_VIEW, value: id }),
    toggleWishlist: (id) =>
      dispatch({ type: actionType.TOGGLE_WISHLIST, value: id }),
    setLoginMessage: (msg) =>
      dispatch({ type: actionType.SET_LOGIN_MESSAGE, value: msg }),
    showLogin: () => dispatch({ type: actionType.TOGGLE_LOGIN }),
  };
};

const mapStateToProps = (state) => {
  return {
    quickView: state.quickView.show,
    wishlist: state.wishlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridView);
