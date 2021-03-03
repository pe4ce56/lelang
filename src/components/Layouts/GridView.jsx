import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Countdown from "react-countdown";
import { Fragment } from "react";
import { Link } from "react-router-dom";
function GridView() {
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
    <div className="relative max-w-full overflow-hidden shadow-lg pt-5 ">
      <div className="absolute top-10 left-4">
        <div className="rounded-full bg-primary text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer">
          <FontAwesomeIcon icon={faGavel} size="md" />
        </div>
        <div className="rounded-full bg-white text-color2 hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer mt-5">
          <FontAwesomeIcon icon={faHeart} size="md" />
        </div>

        <Link to="/products/phone">
          <div className="rounded-full bg-white text-color2 hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer mt-5">
            <FontAwesomeIcon icon={faSearch} size="md" />
          </div>
        </Link>
      </div>
      <Link to="/products/test">
        <div className="h-72 z-0">
          <img
            class="object-contain w-3/4 h-60 mx-auto z-0"
            src="/image/headphone1.jpg"
            alt="Sunset in the mountains"
          />
        </div>
        <div className="w-full absolute top-56 md:px-4">
          <div className="py-2  w-auto grid grid-flow-col grid-cols-4 shadow-md  divide-x ">
            <Countdown date={Date.now() + 10000} renderer={countDownView} />
          </div>
        </div>

        <div class="px-2 py-2 border-t-2 border-color1">
          <div class="font-bold text-xl text-secondary mb-2 text-center font-mont">
            Smartphone Buds
          </div>
          <div className="mb-2 flex justify-center">
            <p class="text-color2 text-sm font-mont">Tawaran:</p>
            <p className="text-secondary font-bold text-sm font-mont">
              Rp. 400.000,00
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default GridView;
