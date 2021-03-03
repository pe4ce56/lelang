import { Fragment } from "react";
import LatestAuction from "./LatestAuction";
import ListAuction from "./ListAuction";
function Home() {
  return (
    <Fragment>
      <section className="flex items-center flex-col">
        <img src="/image/headphone1.jpg" className="w-96 mt-8" />
        <ul className="text-center text-color2 text-1x1">
          <li>Balanced High, Mid and Low tones</li>
          <li>Active Noise Cancellation</li>
          <li>Bluetooth Wireless</li>
        </ul>
        <button className="bg-primary hover:bg-white focus:outline-none text-white hover:text-primary font-bold text-sm py-2 px-16 mt-2 rounded-full">
          Masukkan Wishlist
        </button>
      </section>
      <LatestAuction />
      <ListAuction />
    </Fragment>
  );
}

export default Home;
