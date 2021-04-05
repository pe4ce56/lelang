import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import actionType from "../../redux/reducer/globalType";
const SuccessRegiister = ({ openLogin, location }) => {
  return (
    <Fragment>
      {!location?.props?.success && <Redirect to="/" />}
      <div className="px-20 pt-10 mb-32 ">
        <h3 className="text-lg md:text-1xl lg:text-2xl text-mont text-gray-700">
          Registrasi berhasil, Silahkan login menggunakan akun yang telah
          dibuat!!
        </h3>
        <button
          onClick={() => openLogin()}
          className="focus:outline-none hover:bg-blue-300  px-10 py-2 mt-2 bg-primary text-white rounded "
        >
          Login
        </button>
      </div>
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch) => ({
  openLogin: () => dispatch({ type: actionType.TOGGLE_LOGIN }),
});
export default connect(null, mapDispatchToProps)(SuccessRegiister);
