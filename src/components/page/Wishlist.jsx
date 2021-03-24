import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import actionType from "../../redux/reducer/globalType";
import ModalQuickView from "../Layouts/ModalQuickView";

function Wishlist(props) {
  const { showQuickView, quickView, deleteWishlist, wishlist } = props;
  const List = (wish) => (
    <div className="shadow-lg w-full py-6 px-6 grid grid-cols-12 items-center relative mt-10">
      <div className="h-30 col-span-12 md:col-span-1">
        <img
          className="object-contain w-auto mx-auto md:mr-auto h-14 md:h-10 mr-auto"
          src="/image/headphone1.jpg"
          alt="Sunset in the mountains"
        />
      </div>
      <div className="col-span-12 md:col-span-9 mt-3 md:mt-0 flex flex-col md:flex-row items-center">
        <p className="text-2xl font-base text-secondary font-bold font-mont text-center">
          Headphone
        </p>
        <button
          onClick={() => showQuickView(wish.id)}
          className="md:ml-10 focus:outline-none rounded-full bg-primary py-2 px-3 text-white text-sm font-bold md:w-auto w-1/2 -center"
        >
          Quick View
        </button>
      </div>
      <div className="absolute top-0 right-0 md:relative md:col-span-1 md:col-start-12">
        <button
          onClick={() => deleteWishlist(wish.id)}
          className="ml-10 focus:outline-none bg-transparent px-3 text-red-600 hover:text-red-700 text-sm font-bold"
        >
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
      </div>
    </div>
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

        <div className="mt-5 mb-5">{wishlist.map((wish) => List(wish))}</div>
      </section>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    showQuickView: (id) =>
      dispatch({ type: actionType.SHOW_QUICK_VIEW, value: id }),
    deleteWishlist: (id) =>
      dispatch({ type: actionType.TOGGLE_WISHLIST, value: id }),
  };
};

const mapStateToProps = (state) => {
  return {
    quickView: state.quickView.show,
    wishlist: state.wishlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
