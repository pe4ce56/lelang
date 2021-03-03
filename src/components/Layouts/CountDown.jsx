import { Fragment } from "react";
import Countdown from "react-countdown";

function CountDown({ date, className }) {
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
    <div className="py-2  w-auto grid grid-flow-col grid-cols-4 shadow-md  divide-x ">
      <Countdown date={date} renderer={countDownView} />
    </div>
  );
}

export default CountDown;
