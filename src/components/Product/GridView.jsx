import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
function GridView() {
  return (
    <div class="relative max-w-sm overflow-hidden shadow-lg pt-5">
      <img
        class="object-contain w-full h-64"
        src="/image/headphone1.jpg"
        alt="Sunset in the mountains"
      />
      <div className="absolute top-10 left-4">
        <div className="rounded-full bg-primary text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer">
          <FontAwesomeIcon icon={faGavel} size="md" />
        </div>
        <div className="rounded-full bg-white text-color2 hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer mt-5">
          <FontAwesomeIcon icon={faHeart} size="md" />
        </div>
        <div className="rounded-full bg-white text-color2 hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer mt-5">
          <FontAwesomeIcon icon={faSearch} size="md" />
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
    </div>
  );
}

export default GridView;
