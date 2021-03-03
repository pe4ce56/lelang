import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faSearch } from "@fortawesome/free-solid-svg-icons";
import GridView from "../Product/GridView";

function LatestAuction() {
  return (
    <section className="mt-20">
      <h1 className="text-center text-3xl font-bold font-mont text-secondary">
        Lelang Terbaru
      </h1>
      <div className="flex justify-center items-center">
        <div className="border-t-2 border-color2 w-32"></div>
        <FontAwesomeIcon icon={faGavel} className="mx-2 text-lg text-primary" />
        <div className="border-t-2 border-color2 w-32"></div>
      </div>
      <div className="grid grid-cols-12 px-4 md:px-10 mt-2 w-full  gap-4 mt-4">
        {[1, 2, 3, 4].map((e) => (
          <div className="col-span-6  lg:col-span-3">
            <GridView />
          </div>
        ))}
      </div>
    </section>
  );
}

export default LatestAuction;
