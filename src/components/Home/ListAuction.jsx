import React, { useEffect, useState } from "react";
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
import axios from "axios";

import { API } from "../../config/config";
import { formatRupiah } from "../../config/helper";
function ListAuction({
  showQuickView,
  quickView,
  wishlist,
  toggleWishlist,
  setLoginMessage,
  showLogin,
}) {
  const [categories, setCategories] = useState([]);
  const [listAuctions, setListAuctions] = useState([]);
  useEffect(() => {
    axios(`${API}/api/categories/home`).then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  useEffect(async () => {
    if (categories.length <= 0) return;
    const data = [];
    for (let i in categories) {
      data[i] = await axios(
        `${API}/api/auctions/home/category/${categories[i].id}`
      ).then((res) => res.data.data);
    }

    setListAuctions(data);
  }, [categories]);
  const handleWishlist = (auction_id) => {
    const client_id = auth(
      "Login terlebih dahulu untuk memasukkan ke wishlist"
    );
    if (!client_id) return;
    console.log(auction_id);
    toggleWishlist(auction_id);
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

  const ListItems = ({ data }) => (
    <div className="col-span-12 md:col-span-6">
      <div className="w-full h-44 shadow-lg grid grid-cols-12">
        <div className="col-span-5  flex justify-center">
          <img
            className="object-contain w-32"
            src={`${API}/items_image/${data.item_id}/${data.images[0].path}`}
            alt="Sunset in the mountains"
          />
          {data.id}
        </div>
        <div className="col-span-6 pt-6">
          <p className="text-xl font-mont text-secondary font-bold">
            {data.item_name}
          </p>
          <div className="mb-2 flex ">
            <p className="text-color2 text-sm font-mont">Tawaran:</p>
            <p className="text-secondary font-bold text-sm font-mont">
              {data.price}
              {/* {formatRupiah(data.price, "Rp.")} */}
            </p>
          </div>
          <div className="flex ">
            <Link
              to={`/products/${data.auctions_id}`}
              className="rounded-full bg-primary text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer cursor-pointer mr-4"
            >
              <FontAwesomeIcon icon={faGavel} />
            </Link>
            <button
              onClick={() => handleWishlist(data.auctions_id)}
              className={
                (wishlist.find(
                  (result) => result.auction_id == data.auctions_id
                )
                  ? "bg-primary text-white "
                  : "bg-white text-color2 ") +
                "focus:outline-none rounded-full hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer cursor-pointer  mr-4"
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
            </button>
            <button
              onClick={() => showQuickView(data.auctions_id)}
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
    categories.length !== 0 && (
      <React.Fragment>
        {quickView && <ModalQuickView />}
        <section className="grid grid-cols-12 px-10 py-10 gap-8">
          {/*blue*/}
          {categories[0] && (
            <React.Fragment>
              <div className="col-span-12 md:col-span-3">
                <div className="w-full h-96 bg-blue-600 flex flex-col justify-center items-center text-mont text-white">
                  <p className=" font-bold text-3xl">{categories[0].name}</p>
                  <p className=" text-xl">{categories[0].count_item} Lelang</p>
                  <Link
                    to={`/products/category/${categories[0].name}`}
                    className="border-2 border-color-white px-8 py-2  text-xl mt-2 rounded-full hover:bg-white hover:text-primary"
                  >
                    Lihat Semua
                  </Link>
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <div className="grid grid-cols-12 gap-8">
                  {listAuctions[0]?.map((data, i) => (
                    <ListItems data={data} key={i} />
                  ))}
                </div>
              </div>
            </React.Fragment>
          )}
          {/*end blue*/}
          {/*red*/}
          {categories[1] && (
            <React.Fragment>
              <div className="col-span-12 md:col-span-3">
                <div className="w-full h-96 bg-red-600 flex flex-col justify-center items-center text-mont text-white">
                  <p className=" font-bold text-3xl">{categories[1].name}</p>
                  <p className=" text-xl">{categories[1].count_item} Lelang</p>
                  <Link
                    to={`/products/category/${categories[1].name}`}
                    className="border-2 border-color-white px-8 py-2  text-xl mt-2 rounded-full hover:bg-white hover:text-primary"
                  >
                    Lihat Semua
                  </Link>
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <div className="grid grid-cols-12 gap-8">
                  {listAuctions[1]?.map((data, i) => (
                    <ListItems data={data} key={i} />
                  ))}
                </div>
              </div>
            </React.Fragment>
          )}
          {/*end red*/}
          {/*yellow*/}
          {categories[2] && (
            <React.Fragment>
              <div className="col-span-12 md:col-span-3">
                <div className="w-full h-96 bg-yellow-500 flex flex-col justify-center items-center text-mont text-white">
                  <p className=" font-bold text-3xl">{categories[2].name}</p>
                  <p className=" text-xl">{categories[2].count_item} Lelang</p>
                  <Link
                    to={`/products/category/${categories[2].name}`}
                    className="border-2 border-color-white px-8 py-2  text-xl mt-2 rounded-full hover:bg-white hover:text-primary"
                  >
                    Lihat Semua
                  </Link>
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <div className="grid grid-cols-12 gap-8">
                  {listAuctions[2]?.map((data, i) => (
                    <ListItems data={data} key={i} />
                  ))}
                </div>
              </div>
            </React.Fragment>
          )}
          {/*end yellow*/}
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListAuction);
