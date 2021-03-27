import {
  faGavel,
  faPaperPlane,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Countdown from "react-countdown";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { io } from "socket.io-client";

import { API } from "../../config/config";
import { formatDate, formatRupiah } from "../../config/helper";
import actionType from "../../redux/reducer/globalType";

function DetailProduct({ wishlist, toggleWishlist }) {
  // socket
  const socket = io(API);

  const { auction_id } = useParams();
  // to handle sub menu {description, bid}
  const [subMenu, setSubMenu] = useState("description");
  // to handle data auction
  const [auction, setAuction] = useState({});
  useEffect(() => {
    axios(`${API}/api/auctions/${auction_id}`).then((res) => {
      setAuction(res.data.data);
    });
  }, []);
  // to handle image
  const [imageActive, setImageActive] = useState(0);
  const [auctionHistories, setAuctionHistories] = useState([]);
  useEffect(() => {
    axios(`${API}/api/auctions/bid/${auction_id}`).then((res) => {
      setAuctionHistories(res.data.data);
      console.log(res.data.data);
    });
  }, []);
  const [bidValue, setBidValue] = useState("");
  const handleBid = () => {
    if (auction.status === "close") return;
    const data = {
      auction_id,
      client_id: 1,
      offers: bidValue,
    };
    axios(`${API}/api/auctions/bid/`, {
      method: "POST",
      data,
    })
      .then((res) => {
        setBidValue("");
        socket.emit("bid");
      })
      .catch((e) => {
        setBidValue("");
      });
  };
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios(`${API}/api/auctions/comments/${auction_id}`).then((res) => {
      setComments(res.data.data);
    });
  }, []);
  const [commentValue, setCommentValue] = useState("");
  const handleComment = (e) => {
    e.preventDefault();
    const data = {
      auction_id,
      client_id: 1,
      text: commentValue,
    };
    axios(`${API}/api/auctions/comment/`, {
      method: "POST",
      data,
    }).then((res) => {
      setCommentValue("");
      socket.emit("comment");
    });
  };

  // run when new bid
  socket.on("bidChanged", () => {
    axios(`${API}/api/auctions/bid/${auction_id}`).then((res) => {
      setAuctionHistories(res.data.data);
    });
  });
  // run when new comment
  socket.on("commentChanged", () => {
    axios(`${API}/api/auctions/comments/${auction_id}`).then((res) => {
      setComments(res.data.data);
    });
  });

  const HistoryAuctions = () => (
    <table className="w-full border-gray-300 " style={{ borderWidth: 1 }}>
      <thead>
        <tr className="text-left ">
          <th className="w-1/2 border-gray-300 px-3" style={{ borderWidth: 1 }}>
            Tanggal
          </th>
          <th className="w-1/4 border-gray-300 px-3" style={{ borderWidth: 1 }}>
            Tawaran
          </th>
          <th className="w-1/4 border-gray-300 px-3" style={{ borderWidth: 1 }}>
            User
          </th>
        </tr>
      </thead>
      <tbody className="text-color3 text-mont">
        {auctionHistories[0].created_at &&
          auctionHistories.map((history, index) => (
            <tr key={index}>
              <td className="px-3 py-2">{formatDate(history.created_at)}</td>
              <td className="px-3 py-2 font-bold text-grey-600">
                {formatRupiah(history.offers, "Rp.")}
              </td>
              <td className="px-3 py-2">{history.name}</td>
            </tr>
          ))}
        <tr>
          <td className="px-3 py-2">
            {formatDate(auctionHistories[0].start_date)}
          </td>
          <td className="px-3 py-2 text-color3">Lelang Dimulai</td>
          <td className="px-3 py-2 font-bold text-grey-600">
            {formatRupiah(auctionHistories[0].price, "Rp.")}
          </td>
        </tr>
      </tbody>
    </table>
  );

  const countDownView = ({ days, hours, minutes, seconds, completed }) => (
    <Fragment>
      <div className="grid-span-1 text-center">
        <p className="text-lg text-secondary text-mont font-bold">{days}</p>
        <p className="text-sm text-secondary text-mont font-bold uppercase">
          Hari
        </p>
      </div>
      <div className="grid-span-1 text-center">
        <p className="text-lg text-secondary text-mont font-bold">{hours}</p>
        <p className="text-sm text-secondary text-mont font-bold uppercase">
          Jam
        </p>
      </div>
      <div className="grid-span-1 text-center">
        <p className="text-lg text-secondary text-mont font-bold">{minutes}</p>
        <p className="text-sm text-secondary text-mont font-bold uppercase">
          Menit
        </p>
      </div>
      <div className="grid-span-1 text-center">
        <p className="text-lg text-secondary text-mont font-bold">{seconds}</p>
        <p className="text-sm text-secondary text-mont font-bold uppercase">
          Detik
        </p>
      </div>
    </Fragment>
  );

  const Comment = ({ comment }) =>
    comment.client_id && (
      <div className="flex mt-8 mx-10">
        <div className="pt-2">
          <img
            className="object-contain w-10 h-10 rounded-full"
            src="/profile/profile1.jpeg"
          />
        </div>
        <div className="ml-3">
          <p className="text-color4 text-xl">{comment.name}</p>
          <p className="text-sm text-color3">
            {formatDate(comment.created_at)}
          </p>
          <p className="text-base mt-2">{comment.text}</p>
        </div>
      </div>
    );
  return auction.auctions_id ? (
    <section className="px-4 md:px-10 py-6">
      <div className="mb-10">
        <p className="text-mont text-base text-color2">
          Lelang / {auction.item_name}
        </p>
        <p className="text-mont font-bold text-3xl text-secondary capitalize">
          {auction.item_name}
        </p>
      </div>
      <hr />
      <div className="grid  grid-cols-12 gap-4 lg:gap-12 mt-8">
        {/*image*/}
        <div className="col-span-12 lg:col-span-5">
          <div className="h-96 shadow-xl flex justify-center items-center">
            <img
              className="object-contain w-5/8 h-60"
              src={
                imageActive
                  ? imageActive
                  : auction.images &&
                    `${API}/items_image/${auction.item_id}/${auction.images[0].path}`
              }
              alt="Sunset in the mountains"
            />
          </div>
          <div className="flex mt-6 cursor-pointer">
            {auction.images &&
              auction.images.map((image, index) => (
                <img
                  key={index}
                  onClick={() =>
                    setImageActive(
                      `${API}/items_image/${auction.item_id}/${image.path}`
                    )
                  }
                  className="object-contain w-auto h-20"
                  src={`${API}/items_image/${auction.item_id}/${image.path}`}
                  alt="Sunset in the mountains"
                />
              ))}
          </div>
        </div>
        {/*Deskripsi */}
        <div className="col-span-12 lg:col-span-6">
          <p className="text-base text-color2 text-mont">
            {auction.description && parse(auction.description)}
          </p>
          <p className="text-lg text-secondary font-bold text-2xl mt-4 mb-6">
            Penawaran Tertinggi:{" "}
            {auctionHistories.length && auctionHistories[0].current_bid
              ? formatRupiah(auctionHistories[0].current_bid, "Rp. ")
              : formatRupiah(auction.price, "Rp. ")}
          </p>
          <hr />

          {/*<p className="mt-6 text-base text-color2">Kondisi Produk: baru</p>*/}
          <p className="mt-2 text-base text-color3">Sisa Waktu:</p>
          <div className="py-2 h-20  w-full grid grid-flow-col grid-cols-4 shadow-lg  divide-x items-center">
            <Countdown
              date={new Date(auction.end_date)}
              renderer={countDownView}
            />
          </div>
          <p className="mt-4 text-base text-color3">
            Lelang berakhir:{" "}
            {auction.end_date ? formatDate(auction.end_date) : "-"}
          </p>
          <div className="relative w-auto mt-4">
            {/*
            <span class="absolute inset-y-0 left-4 flex items-center ">
              <button class="text-2xl  focus:outline-none">-</button>
            </span>
            <span class="absolute inset-y-0 right-4 flex items-center ">
              <button class="text-2xl  focus:outline-none">+</button>
            </span>
             */}
            <input
              value={bidValue}
              onChange={(e) => setBidValue(e.target.value)}
              className="text-secondary py-2 px-4 text-lg w-full focus:outline-none rounded-full border-radius-5 border-color2 border-1"
              placeholder="Penawaran (Rp)"
            />
            <button
              onClick={handleBid}
              className="mt-2 focus:outline-none rounded-full text-lg p-3  w-full bg-primary text-white hover:bg-white hover:text-primary border-1 border-primary justify-center items-center cursor-pointer  transition delay-100 duration-500 ease-in-out"
            >
              Tawar Sekarang
            </button>

            <button
              onClick={() => toggleWishlist(auction.auctions_id)}
              className={
                (wishlist.find(
                  (result) => result.auction_id == auction.auctions_id
                )
                  ? "bg-primary text-white hover:bg-white hover:text-primary "
                  : "text-color3 hover:bg-primary hover:text-white ") +
                "mt-4 focus:outline-none rounded-full text-lg p-3  w-full  justify-center items-center cursor-pointer border-1 border-grey-300  transition delay-100 duration-500 ease-in-out"
              }
            >
              {wishlist.find(
                (result) => result.auction_id == auction.auctions_id
              )
                ? "Hapus dari Wishlist"
                : "Masukkan ke Wishlist"}
            </button>
          </div>
        </div>
      </div>
      <div className="grid  grid-cols-12 divide-white mt-14 shadow-lg">
        <button
          className={
            (subMenu == "description"
              ? "text-white bg-primary"
              : "text-primary bg-white") +
            " col-span-12 md:col-span-6 focus:outline-none py-5 uppercase text-base text-mont text-center font-bold"
          }
          onClick={() => setSubMenu("description")}
        >
          Deskripsi
        </button>
        <button
          className={
            (subMenu == "history"
              ? "text-white bg-primary"
              : "text-primary bg-white") +
            " col-span-12 md:col-span-6 focus:outline-none py-5 uppercase text-base text-mont text-center font-bold"
          }
          onClick={() => setSubMenu("history")}
        >
          Histori Lelang
        </button>
      </div>
      <div className="mt-6 ">
        {subMenu == "description" ? (
          <p className="text-base text-color3">
            {auction.description && parse(auction.description)}
          </p>
        ) : (
          auctionHistories && <HistoryAuctions />
        )}
      </div>

      {/* komen*/}
      <div className="shadow-lg w-full mt-2 py-7 px-3 md:px-7 flex flex-col ">
        <form onSubmit={handleComment} className="grid grid-cols-12">
          <input
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            placeholder="Tambahkan komentar"
            className="col-span-11 w-full focus:outline-none text-xl p-3 border-grey-500 focus:border-primary hover:border-primary border-1"
          />
          <button
            type="submit"
            className="col-span-1 w-full focus:outline-none bg-primary text-white hover:bg-white hover:text-primary"
          >
            Kirim <FontAwesomeIcon icon={faPaperPlane} size="1x" />
          </button>
        </form>

        {comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}

        {/* <button className="mx-auto w-4/5 mt-6 py-3 rounded-full capitalize text-xl text-color4 bg-blue-100  focus:outline-none hover:text-secondary hover:bg-blue-200">
          Lihat komentar lebih
        </button>
        */}
      </div>
    </section>
  ) : (
    "loading"
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleWishlist: (id) =>
      dispatch({ type: actionType.TOGGLE_WISHLIST, value: id }),
  };
};
const mapStateToProps = (state) => ({
  wishlist: state.wishlist,
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
