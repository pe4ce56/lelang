import { faGavel, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import Countdown from "react-countdown";
import { useParams } from "react-router-dom";

function DetailProduct() {
  const { product } = useParams();
  const [subMenu, setSubMenu] = useState("description");
  const historyAuctions = () => (
    <table>
      <thead>
        <tr>
            <th>Tanggal</th>
            <th>Tawaran</th>
            <th>User</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>Ted</td>
            <td>Ted</td>
            <td>Ted</td>
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
  return (
    <section className="px-4 md:px-10 py-6">
      <div className="mb-10">
        <p className="text-mont text-base text-color2">Lelang / {product}</p>
        <p className="text-mont font-bold text-3xl text-secondary capitalize">
          {product}
        </p>
      </div>
      <hr />
      <div className="grid grid-flow-col grid-cols-12 gap-12 mt-8">
        {/*image*/}
        <div className="col-span-5">
          <div className="h-96 shadow-xl flex justify-center items-center">
            <img
              class="object-contain w-5/8 h-60"
              src="/image/headphone1.jpg"
              alt="Sunset in the mountains"
            />
          </div>
          <div className="flex mt-6 cursor-pointer">
            <img
              class="object-contain w-auto h-20"
              src="/image/headphone1.jpg"
              alt="Sunset in the mountains"
            />
            <img
              class="object-contain w-auto h-20"
              src="/image/headphone1.jpg"
              alt="Sunset in the mountains"
            />
            <img
              class="object-contain w-auto h-20"
              src="/image/headphone1.jpg"
              alt="Sunset in the mountains"
            />
            <img
              class="object-contain w-auto h-20"
              src="/image/headphone1.jpg"
              alt="Sunset in the mountains"
            />
          </div>
        </div>
        {/*Deskripsi */}
        <div className="col-span-6">
          <p className="text-base text-color2 text-mont ">
            Samsung Galaxy S9 smartphone was launched in March 2018. The phone
            comes with a 5.80-inch touchscreen display with a resolution of 1440
            pixels by 2960 pixels at a PPI of 568 pixels per inch. Samsung
            Galaxy S9 price in India starts from Rs. 51,990.
            <br />
            <br />
            The Samsung Galaxy S9 runs Android 8.0 and is powered by a 3000mAh
            non removable battery. It measures 147.70 x 68.70 x 8.50 (height x
            width x thickness) and weighs 163.00 grams.
          </p>
          <p className="text-lg text-secondary font-bold text-2xl mt-4 mb-6">
            Current bid: Rp. 78.00
          </p>
          <hr />

          <p className="mt-6 text-base text-color2">Kondisi Produk: baru</p>
          <p className="mt-2 text-base text-color3">Sisa Waktu:</p>
          <div className="py-2 h-20  w-full grid grid-flow-col grid-cols-4 shadow-lg  divide-x items-center">
            <Countdown date={Date.now() + 10000} renderer={countDownView} />
          </div>
          <p className="mt-4 text-base text-color3">
            Lelang berakhir: 30 juni 2021 12:00 am
          </p>
          <div className="relative flex w-auto mt-4">
            {/*
            <span class="absolute inset-y-0 left-4 flex items-center ">
              <button class="text-2xl  focus:outline-none">-</button>
            </span>
            <span class="absolute inset-y-0 right-4 flex items-center ">
              <button class="text-2xl  focus:outline-none">+</button>
            </span>
             */}
            <input
              className="text-secondary py-2 px-2 w-40 focus:outline-none rounded-md border-radius-5 border-color2"
              style={{ borderWidth: 1 }}
            />
            <button className="ml-4 focus:outline-none rounded-full h-10 w-20 bg-primary text-white flex hover:bg-white hover:text-primary   justify-center items-center shadow-sm cursor-pointer">
              <FontAwesomeIcon icon={faGavel} size="md" />
            </button>
            <button
              className="ml-4 focus:outline-none rounded-full 
                            h-10 w-10 bg-white text-color2 hover:text-primary  flex justify-center items-center  cursor-pointer "
              style={{ borderWidth: 1 }}
            >
              <FontAwesomeIcon icon={faHeart} size="md" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-flow-col grid-cols-12 divide-white mt-14 shadow-lg">
        <button className={(subMenu== "description"?"text-white bg-primary": "text-primary bg-white") + " col-span-12 md:col-span-6 focus:outline-none py-5 uppercase text-base text-mont text-center font-bold"} onClick={()=>setSubMenu("description")}>
          Deskripsi
        </button>
        <button className={(subMenu== "history"?"text-white bg-primary": "text-primary bg-white") +" col-span-12 md:col-span-6 focus:outline-none py-5 uppercase text-base text-mont text-center font-bold"} onClick={()=>setSubMenu("history")}>
          Histori Lelang
        </button>
      </div>
      <div className="mt-6 ">
        {subMenu == "description" ? (
          <p className="text-base text-color3">
            The Ragdoll is a cat breed with blue eyes and a distinct colorpoint
            coat. It is a large and muscular semi-longhair cat with a soft and
            silky coat. Like all long haired cats, Ragdolls need grooming to
            ensure their fur does not mat. Developed by American breeder Ann
            Baker in the 1960s, it is best known for its docile and placid
            temperament and affectionate nature. The name “Ragdoll” is derived
            from the tendency of individuals from the original breeding stock to
            go limp and relaxed when picked up.
          </p>
        ) : (
          <historyAuctions />
        )}
      </div>
    </section>
  );
}

export default DetailProduct;
