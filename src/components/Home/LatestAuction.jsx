import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faSearch } from "@fortawesome/free-solid-svg-icons";
import GridView from "../Layouts/GridView";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../config/config";
import Loading from "../Layouts/Loading";
function LatestAuction() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios(`${API}/api/auctions/open`).then((res) => {
      res.data.data.splice(3, res.data.data.length - 4);
      setItems(res.data.data);
      console.log(items);
    });
  }, []);
  return (
    <section className="mt-6">
      <h1 className="text-center text-3xl font-bold font-mont text-secondary">
        Lelang Terbaru
      </h1>
      <div className="flex justify-center items-center">
        <div className="border-t-2 border-color2 w-32"></div>
        <FontAwesomeIcon icon={faGavel} className="mx-2 text-lg text-primary" />
        <div className="border-t-2 border-color2 w-32"></div>
      </div>
      {items.length != 0 ? (
        <div className="grid grid-cols-12 px-4 md:px-10 mt-2 w-full  gap-4 mt-4">
          {items.map((item, e) => (
            <div className="col-span-6  lg:col-span-3" key={e}>
              <GridView data={item} />
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default LatestAuction;
