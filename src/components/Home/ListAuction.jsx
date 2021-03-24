import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGavel,
  faSearch,
  faHeart as faHeartActive,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ModalQuickView from "../Layouts/ModalQuickView";
import actionType from "../../redux/reducer/globalType";

function ListAuction({ showQuickView, quickView, wishlist, toggleWishlist }) {
  const ListItems = (id) => (
    <div className="col-span-12 md:col-span-6">
      <div className="w-full h-44 shadow-lg grid grid-cols-12">
        <div className="col-span-4 flex justify-center">
          <img
            className="object-contain w-full h-auto"
            src="/image/headphone1.jpg"
            alt="Sunset in the mountains"
          />
        </div>
        <div className="col-span-6 pt-6">
          <p className="text-xl font-mont text-secondary font-bold">
            Smartphone Buds
          </p>
          <div className="mb-2 flex ">
            <p className="text-color2 text-sm font-mont">Tawaran:</p>
            <p className="text-secondary font-bold text-sm font-mont">
              Rp. 400.000,00
            </p>
          </div>
          <div className="flex ">
            <div className="rounded-full bg-primary text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer cursor-pointer mr-4">
              <FontAwesomeIcon icon={faGavel} />
            </div>
            <button
              onClick={() => toggleWishlist(id)}
              className={
                (wishlist.find((result) => result.id == id)
                  ? "bg-primary text-white "
                  : "bg-white text-color2 ") +
                "focus:outline-none rounded-full hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer cursor-pointer  mr-4"
              }
            >
              <FontAwesomeIcon
                icon={
                  wishlist.find((result) => result.id == id)
                    ? faHeartActive
                    : faHeart
                }
              />
            </button>
            <button
              onClick={() => showQuickView(id)}
              className="focus:outline-none rounded-full bg-white text-color2 hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer cursor-pointer mr-4 "
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {quickView && <ModalQuickView />}
      <section className="grid grid-cols-12 px-10 py-10 gap-8">
        {/*blue*/}
        <div className="col-span-12 md:col-span-3">
          <div className="w-full h-96 bg-blue-600 flex flex-col justify-center items-center text-mont text-white">
            <p className=" font-bold text-3xl">Handphone</p>
            <p className=" text-xl">9 Produk</p>
            <Link
              to="/products/category/phones"
              className="border-2 border-color-white px-8 py-2  text-xl mt-2 rounded-full hover:bg-white hover:text-primary"
            >
              Lihat Semua
            </Link>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-12 gap-8">
            {[1, 2, 3, 4].map((e) => ListItems(e))}
          </div>
        </div>
        {/*end blue*/}
        {/*red*/}
        <div className="col-span-12 md:col-span-3">
          <div className="w-full h-96 bg-red-600 flex flex-col justify-center items-center text-mont text-white">
            <p className=" font-bold text-3xl">Handphone</p>
            <p className=" text-xl">9 Produk</p>
            <button className="border-2 border-color-white px-8 py-2  text-xl mt-2 rounded-full hover:bg-white hover:text-primary">
              Lihat Semua
            </button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-12 gap-8">
            {[1, 2, 3, 4].map((e) => ListItems(e))}
          </div>
        </div>
        {/*end red*/}
        {/*yellow*/}
        <div className="col-span-12 md:col-span-3">
          <div className="w-full h-96 bg-yellow-500 flex flex-col justify-center items-center text-mont text-white">
            <p className=" font-bold text-3xl">Elektonik</p>
            <p className=" text-xl">9 Produk</p>
            <button className="border-2 border-color-white px-8 py-2  text-xl mt-2 rounded-full hover:bg-white hover:text-primary">
              Lihat Semua
            </button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-12 gap-8">
            {[1, 2, 3, 4].map((e) => ListItems(e))}
          </div>
        </div>
        {/*end yellow*/}
      </section>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    showQuickView: (id) =>
      dispatch({ type: actionType.SHOW_QUICK_VIEW, value: id }),
    toggleWishlist: (id) =>
      dispatch({ type: actionType.TOGGLE_WISHLIST, value: id }),
  };
};

const mapStateToProps = (state) => {
  return {
    quickView: state.quickView.show,
    wishlist: state.wishlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAuction);
