import { Fragment } from "react";

function Footer() {
  return (
    <Fragment>
      <div className="grid grid-cols-12 w-full px-6 md:px-10 py-6 bg-primary">
        <div className="col-span-12 md:col-span-6">
          <p className=" text-mont font-bold text-white text-xl">
            Browse through our products library!
          </p>
        </div>
        <div className="col-span-12 md:col-start-9 md:col-span-4">
          <form method="GET" className="mt-2 md:mt-0 w-full">
            <div class="relative text-gray-600 focus-within:text-gray-400">
              <span class="absolute inset-y-0 right-0 flex items-center ">
                <button
                  type="submit"
                  class=" group focus:outline-none focus:shadow-outline hover:bg-white   bg-secondary rounded-full h-full w-9 flex justify-center items-center"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                    class="w-5 h-5 text-white group-hover:text-primary"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="text"
                name="q"
                class="py-2 text-base text-color2 rounded-md pr-10 pl-2 focus:outline-none focus:bg-white focus:text-gray-900 rounded-full w-full"
                placeholder="Search..."
                autoComplete="off"
              />
            </div>
          </form>
        </div>
      </div>
      <footer className="grid grid-cols-12 gap-4 px-6 md:px-10 py-10 pt-10">
        <div className="col-span-12 md:col-span-4">
          <div className=" flex">
            <h3 className="text-primary text-5xl font-sans font-bold">Le</h3>
            <h3 className="text-secondary text-5xl  font-sans font-bold">
              Lang
            </h3>
          </div>
          <p className="font-mont text-color3 text-sm mt-2">
            damaideo6@gmail.com
          </p>
          <p className="font-mont text-color3 text-sm">082217974659</p>
        </div>

        <div className="col-span-12 md:col-span-4 mt-2">
          <h2 className="font-mont text-secondary font-bold text-3xl">Link</h2>
          <ul className="font-mont text-color2 text-base list-disc ml-6">
            <li>Handphone</li>
            <li>Laptop</li>
            <li>Headphone</li>
          </ul>
        </div>
        <div className="col-span-12">
          <p className="font-mont text-color3 text-sm mt-10">
            Copyright by Lelang. All Rights Reserved.
          </p>
        </div>
      </footer>
    </Fragment>
  );
}

export default Footer;
