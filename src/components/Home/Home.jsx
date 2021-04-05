import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import LatestAuction from "./LatestAuction";
import ListAuction from "./ListAuction";

import { API } from "../../config/config";
import Loading from "../Layouts/Loading";
const Home = () => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    axios(`${API}/api/auctions/single`).then((res) => {
      setItem(res.data.data);
    });
  }, []);

  return item ? (
    <Fragment>
      <LatestAuction />
      <ListAuction />
    </Fragment>
  ) : (
    <div className="container px-20">
      <Loading />
    </div>
  );
};

export default Home;
