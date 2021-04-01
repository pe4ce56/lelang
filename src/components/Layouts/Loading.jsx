import React, { Fragment } from "react";
export default function Loading() {
  return (
    <div className="grid grid-cols-12 mt-2 w-full gap-4 mt-4">
      {[1, 2, 3, 4, 5].map((e) => (
        <div className="col-span-6 lg:col-span-4" key={e}>
          <div className=" border border-blue-100 shadow animate-pulse relative max-w-full overflow-hidden shadow-lg pt-5 ">
            <div>
              <div className="h-72 z-0">
                <div
                  className="object-contain w-3/4 h-3/4 mx-auto z-0 bg-blue-200 rounded"
                  alt="Sunset in the mountains"
                />
              </div>
              <div className="w-full absolute top-56 md:px-4">
                <div className="py-2  w-auto grid grid-flow-col grid-cols-4 shadow-md  divide-x "></div>
              </div>
              <div className="w-full absolute top-56 md:px-4">
                <div className="py-5  w-auto shadow-md  divide-x  bg-blue-100">
                  <p className="text-center text-xl text-grey-200"></p>
                </div>
              </div>
              <div className="px-2 py-2 border-t-2 border-color1">
                <div className="mb-2 flex justify-center rounded bg-blue-200 py-4">
                  <p className="text-secondary font-bold text-sm font-mont  "></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
