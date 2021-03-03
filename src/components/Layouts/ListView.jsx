import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

function ListView() {
  return (
    <div className="relative rounded-sm shadow-lg w-full py-4 px-6 flex justify-between mt-2 grid grid-cols-12 h-auto">
      <div className="col-span-12 md:col-span-4 flex justify-center">
        <img
          class="object-contain w-1/2 md:w-full h-auto "
          src="/image/headphone1.jpg"
          alt="Sunset in the mountains"
        />
      </div>
      <div className="col-span-12 md:col-span-6 pt-10  text-center md:text-left">
        <p className="text-2xl font-mont text-secondary font-bold  cursor-pointer hover:text-primary">
          Smartphone Buds
        </p>
        <p className="text-sm font-mont text-color3 mt-3">
          The Ragdoll is a cat breed with blue eyes and a distinct colorpoint
          coat. It is a large and muscular semi-longhair cat with a soft and
          silky coat. Like all long haired cats, Ragdolls need grooming to
          ensure their fur does not mat
        </p>
        <div className="mb-2 flex mt-3 justify-center md:justify-start">
          <p className="text-color2 text-sm font-mont font-normal">Tawaran:</p>
          <p className="text-secondary font-bold text-sm font-mont">
            Rp. 400.000,00
          </p>
        </div>
        <div className="absolute top-10 left-4 ">
          <div className="rounded-full bg-primary text-white w-8 h-8 flex justify-center items-center shadow-md cursor-pointer">
            <FontAwesomeIcon icon={faGavel} size="md" />
          </div>
          <div className="rounded-full bg-white text-color2 hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md  cursor-pointer  mt-5">
            <FontAwesomeIcon icon={faHeart} size="md" />
          </div>
          <div className="rounded-full bg-white text-color2 hover:bg-primary hover:text-white w-8 h-8 flex justify-center items-center shadow-md  cursor-pointer mt-5">
            <FontAwesomeIcon icon={faSearch} size="md" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListView;
