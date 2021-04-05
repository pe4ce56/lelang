import React from "react";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGavel,
  faSearch,
  faHeart as faHeartActive,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { API } from "../../config/config";
import ModalQuickView from "../Layouts/ModalQuickView";
import actionType from "../../redux/reducer/globalType";
import { formatRupiah } from "../../config/helper";

function ListView(props) {
  const {
    wishlist,
    toggleWishlist,
    showQuickView,
    setLoginMessage,
    showLogin,
    quickView,
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

  return (
    data && (
      <React.Fragment>
        {quickView && <ModalQuickView />}
        <div className="relative rounded-sm shadow-lg w-full py-4 px-6 mt-2 h-auto">
          <div className="absolute top-10 left-4 ">
            <div className="rounded-full bg-primary text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer">
              <FontAwesomeIcon icon={faGavel} />
            </div>
            <div
              onClick={handleWishlist}
              className={
                (wishlist.find((result) => {
                  return result.auction_id == data.auctions_id;
                })
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
            <div
              onClick={() => showQuickView(data.auctions_id)}
              className="rounded-full bg-white text-color2 hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md  cursor-pointer mt-5"
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
          <Link
            to={`/products/${data.auctions_id}`}
            className=" grid grid-cols-12 pb-4"
          >
            <div className="col-span-12 md:col-span-4 flex justify-center">
              <img
                class="object-contain w-1/2 md:w-3/4 h-auto "
                src={`${API}/items_image/${data.item_id}/${data.images[0].path}`}
                alt="Sunset in the mountains"
              />
            </div>
            <div className="col-span-12 md:col-span-6 pt-10  text-center md:text-left">
              <p className="text-2xl font-mont text-secondary font-bold  cursor-pointer hover:text-primary">
                {data.item_name}
              </p>
              <p className="text-sm font-mont text-color3 mt-3">
                {parse(data.description)}
              </p>
              <div className="mb-2 flex mt-3 justify-center md:justify-start">
                <p className="text-color2 text-sm font-mont font-normal">
                  Tawaran:
                </p>
                <p className="text-secondary font-bold text-sm font-mont">
                  {formatRupiah(data.price, "Rp.")}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
