import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import LatestAuction from "./LatestAuction";
import ListAuction from "./ListAuction";

import { API } from "../../config/config";
const Home = () => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    axios(`${API}/api/auctions/single`).then((res) => {
      setItem(res.data.data);
    });
  }, []);

  return item ? (
    <Fragment>
      {/* <section className="flex items-center flex-col">
        <img
          src={`${API}/items_image/${item?.item_id}/${item?.images[0].path}`}
          className="w-96 mt-8"
        />

        <div className="text-center text-color2 text-1x1 h-32 w-60">
          {parse(item.description.substring(0, 100))}
        </div>
        <button className="bg-primary hover:bg-white focus:outline-none text-white hover:text-primary font-bold text-sm py-2 px-16 mt-2 rounded-full">
          Masukkan Wishlist
        </button>
      </section> */}
      <LatestAuction />
      <ListAuction />
    </Fragment>
  ) : (
    <div className="m-10 ">
      <p className="text-2xl text-color4 font-bold font-mont">
        Sedang Mengambil Data.....
      </p>
    </div>
  );
};

export default Home;
