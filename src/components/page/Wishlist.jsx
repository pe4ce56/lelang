import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import actionType from "../../redux/reducer/globalType";
import ModalQuickView from "../Layouts/ModalQuickView";
import { API } from "../../config/config";
import { Link } from "react-router-dom";

function Wishlist(props) {
  const {
    showQuickView,
    quickView,
    deleteWishlist,
    fetchWishlist,
    wishstate,
  } = props;
  const [wishlist, setWishlist] = useState([]);
  // fetch wishlist firstly
  useEffect(() => {
    axios(`${API}/api/auctions/wishlist/1`).then((res) => {
      setWishlist(res.data.data);
      fetchWishlist(res.data.data);
    });
  }, []);
  // fetch wishlist when wishstate is changed to handle remove wishlist
  useEffect(() => {
    axios(`${API}/api/auctions/wishlist/1`).then((res) => {
      setWishlist(res.data.data);
      fetchWishlist(res.data.data);
    });
  }, [wishstate]);

  const List = (wish) => (
    <Link
      to={`/products/${wish.auction_id}`}
      className="shadow-lg w-full py-6 px-6 grid grid-cols-12 items-center relative mt-10"
    >
      <div className="h-30 col-span-12 md:col-span-1">
        <img
          className="object-contain w-auto mx-auto md:mr-auto h-14 md:h-10 mr-auto"
          src={`${API}/items_image/${wish.item_id}/${wish.images[0].path}`}
          alt="Sunset in the mountains"
        />
      </div>
      <div className="col-span-12 md:col-span-9 mt-3 md:mt-0 flex flex-col md:flex-row items-center">
        <p className="text-2xl font-base text-secondary font-bold font-mont text-center">
          {wish.name}
        </p>
        <button
          onClick={() => showQuickView(wish.auction_id)}
          className="md:ml-10 focus:outline-none rounded-full bg-primary py-2 px-3 text-white text-sm font-bold md:w-auto w-1/2 -center"
        >
          Quick View
        </button>
      </div>
      <div className="absolute top-0 right-0 md:relative md:col-span-1 md:col-start-12">
        <button
          onClick={async () => await deleteWishlist(wish.auction_id)}
          className="ml-10 focus:outline-none bg-transparent px-3 text-red-600 hover:text-red-700 text-sm font-bold"
        >
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
      </div>
    </Link>
  );

  return (
    <React.Fragment>
      {quickView && <ModalQuickView />}
      <section className="px-2 md:px-10">
        <div className="py-6">
          <p className="text-mont text-base text-color2">Lelang / Wishlist</p>
          <p className="text-mont font-bold text-3xl text-secondary capitalize">
            Wishlist
          </p>
        </div>
        <hr />

        {wishlist.length !== 0 && (
          <div className="mt-5 mb-5">{wishlist.map((wish) => List(wish))}</div>
        )}
      </section>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    showQuickView: (id) =>
      dispatch({ type: actionType.SHOW_QUICK_VIEW, value: id }),
    fetchWishlist: (data) =>
      dispatch({ type: actionType.FETCH_WISHLIST, value: data }),
    deleteWishlist: (id) =>
      dispatch({ type: actionType.TOGGLE_WISHLIST, value: id }),
  };
};

const mapStateToProps = (state) => {
  return {
    quickView: state.quickView.show,
    wishstate: state.wishlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
