import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import actionType from "../../redux/reducer/globalType";

import { API } from "../../config/config";
import formatRupiah from "../../config/helper";
function ModalQuickView({ hideModal, id }) {
  //get Data auction
  const [auction, setAuctions] = useState({});
  useEffect(() => {
    axios(`${API}/API/auctions/${id}`).then((res) => {
      console.log(res);
      setAuctions(res.data.data);
    });
  }, []);

  const hide = (event) => {
    event.preventDefault();
    let dataValue = event.target.getAttribute("data-value");
    if (dataValue == "modal") {
      hideModal();
    }
  };
  return (
    <main
      onClick={hide}
      data-value="modal"
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black bg-opacity-30"
    >
      <div className="relative w-auto my-6 mx-auto max-w-5xl h-auto lg:h-3/4">
        {/*content*/}
        <div className="border-0  shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none  ">
          <button
            onClick={hideModal}
            className="w-6 h-6 ml-auto mr-2 mt-2 text-color2 hover:text-color4 focus:outline-none"
          >
            X
          </button>
          {auction.item_id ? (
            <div className="relative p-6 flex-auto">
              <div className=" grid grid-cols-12 h-full">
                <div className="col-span-12 md:col-span-6 flex justify-center items-center">
                  <img
                    class="object-contain w-3/4 md:w-3/4 h-auto "
                    src={`${API}/items_image/${auction.item_id}/${auction.images[0].path}`}
                    alt="Sunset in the mountains"
                  />
                </div>
                <div className="col-span-12 md:col-span-6 pt-10 md:pt-0 text-center md:text-left block md:flex flex-col justify-center">
                  <p className="text-3xl text-mont text-black font-bold  md:-mt-20">
                    {auction.item_name}
                  </p>
                  <p className="text-2xl text-mont text-black font-bold  mt-3 mb-7">
                    Tawaran : {formatRupiah(auction.price, "Rp.")}
                  </p>
                  <hr />
                  <div className="mb-2 flex mt-4 justify-center md:justify-start">
                    <p className="text-color4 text-sm text-mont font-normal">
                      Kategori :
                    </p>
                    <p className="text-secondary font-bold text-sm text-mont">
                      {auction.category_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "loading"
          )}
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.quickView.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch({ type: actionType.HIDE_QUICK_VIEW }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalQuickView);
