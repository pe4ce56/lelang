import { useState, useEffect } from "react";
import { API } from "./../../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBorderAll,
  faThList,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import ListView from "../Layouts/ListView";
import GridView from "../Layouts/GridView";
import axios from "axios";

function ViewAll() {
  const { category } = useParams();
  const [view, setView] = useState("grid");
  const [auctions, setAuctions] = useState([]);
  useEffect(() => {
    axios(`${API}/api/auctions`)
      .then((res) => {
        setAuctions(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <section className="px-2 md:px-10">
      <div className="py-6">
        <p className="text-mont text-base text-color2">Lelang / barang </p>
      </div>
      <hr />
      <div className="grid grid-cols-12 gap-8 mt-5 mb-5">
        <div className="hidden md:block md:col-span-3">
          <div>
            <p className="text-secondary text-mont font-bold text-2xl mb-2">
              Search Lelang
            </p>
            <hr />
            <input
              type="text"
              name="q"
              className="py-2 text-sm text-color2 rounded-md px-4 focus:outline-none focus:bg-white focus:text-gray-900 rounded-full w-3/4 mt-3"
              placeholder="Search..."
              style={{ borderWidth: 1 }}
              autocomplete="off"
            />
          </div>
          <div className="mt-10">
            <p className="text-secondary text-mont font-bold text-2xl mb-2">
              Warna
            </p>
            <hr />
            <select
              className="px-4 py-2 mt-3 text-color3 rounded-full w-3/4 focus:outline-none "
              style={{ borderWidth: 1 }}
            >
              <option>Merah</option>
              <option>Merah</option>
              <option>Merah</option>
            </select>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="rounded-sm shadow-lg w-full py-4 px-6 flex justify-between h-20">
            <div className="flex items-center">
              <button
                className={
                  (view === "grid"
                    ? "bg-primary text-white "
                    : "bg-white text-primary ") +
                  " grid-view px-4 h-8 rounded-tl-full rounded-bl-full focus:outline-none"
                }
                onClick={() => setView("grid")}
                style={{ paddingTop: 4, paddingBottom: 4 }}
              >
                <FontAwesomeIcon icon={faBorderAll} size="sm" />
              </button>
              <button
                className={
                  (view === "list"
                    ? "bg-primary text-white "
                    : "bg-white text-primary ") +
                  " grid-view px-4 h-8 rounded-tr-full rounded-br-full focus:outline-none"
                }
                onClick={() => setView("list")}
                style={{ paddingTop: 4, paddingBottom: 4 }}
              >
                <FontAwesomeIcon icon={faThList} size="sm" />
              </button>
              <p className="hidden sm:block text-color3 text-mont text-lg ml-4">
                Showing 1-3 of 10 results
              </p>
            </div>
            <select
              className="px-4 py-2 mt-2 rounded-full w-80 focus:outline-none text-color3"
              style={{ borderWidth: 1 }}
            >
              <option>Default</option>
              <option>Dari harga: murah ke mahal</option>
              <option>Dari harga: mahal ke murah</option>
            </select>
          </div>

          {view === "grid" ? (
            <div className="grid grid-cols-12 mt-2 w-full gap-4 mt-4">
              {auctions &&
                auctions.map((data) => (
                  <div className="col-span-6 lg:col-span-4" key={data}>
                    <GridView data={data} />
                  </div>
                ))}
            </div>
          ) : (
            auctions &&
            auctions.map((data) => <ListView key={data} data={data} />)
          )}

          <div className="paginataion flex gap-8 mt-6">
            <a className="w-10 h-10  font-bold text-lg bg-primary text-white flex justify-center items-center rounded-full cursor-pointer shadow-xl">
              1
            </a>
            <a className="w-10 h-10 font-bold text-lg bg-white hover:bg-primary hover:text-white text-primary flex justify-center items-center rounded-full cursor-pointer shadow-xl">
              2
            </a>
            <a className="w-10 h-10  text-lg bg-white text-primary hover:bg-primary hover:text-white flex justify-center items-center rounded-full cursor-pointer shadow-xl">
              <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewAll;
