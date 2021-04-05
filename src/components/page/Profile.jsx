import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import DropNCrop from "@synapsestudios/react-drop-n-crop";
import "@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.css";

import { API } from "../../config/config";
import { Redirect } from "react-router";
import swal from "sweetalert";
import { LoadingSpinner } from "../Layouts/Loading";
const Profile = () => {
  const [image, setImage] = useState({
    result: null,
    filename: null,
    filetype: null,
    src: null,
    error: null,
  });
  const ref = useRef();
  const [loggined, setLoggined] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const [dataPasswordChanger, setDataPasswordChanger] = useState({
    old_password: null,
    new_password: null,
    confirm_password: null,
  });
  const [errorFormValue, setErrorFormValue] = useState({});

  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    axios(`${API}/api/auth/getUser/${user?.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const date = new Date(res.data.user[0].date_of_birth);
        date.setDate(date.getDate() + 1);
        res.data.user[0].date_of_birth = date.toISOString().substr(0, 10);
        setName(res.data.user[0].name);
        setData(res.data.user[0]);

        setLoading(false);
      })
      .catch((e) => {
        if (e.response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setLoggined(false);
          setLoading(false);
          swal({
            title: "Sesi login anda habis!!",
            icon: "warning",
            dangerMode: true,
          });
        }
      });
  }, [editProfile, editImage]);

  const validation = () => {
    let error = {};
    for (let i in data) {
      if (!data[i]) {
        error = {
          ...error,
          [i]: `Field tidak boleh kosong`,
        };
      } else {
        delete error[i];
      }
    }

    if (Object.keys(error).length > 0) {
      setErrorFormValue(error);
      return false;
    }
    setErrorFormValue({});
    return true;
  };
  const validationPassword = () => {
    let error = {};
    for (let i in dataPasswordChanger) {
      if (!dataPasswordChanger[i]) {
        error = {
          ...error,
          [i]: `Field tidak boleh kosong`,
        };
      } else {
        delete error[i];
      }
    }
    if (
      dataPasswordChanger.new_password !== dataPasswordChanger.confirm_password
    ) {
      error = {
        ...error,
        confirm_password: "Password tidak sama",
      };
    }
    console.log(error);
    if (Object.keys(error).length > 0) {
      setErrorFormValue(error);
      return false;
    }
    setErrorFormValue({
      old_password: null,
      new_password: null,
      confirm_password: null,
    });
    return true;
  };
  const handleInput = (e) => {
    if (!editProfile) return;
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleInputPassword = (e) => {
    if (!editPassword) return;
    const name = e.target.name;
    const value = e.target.value;
    setDataPasswordChanger({ ...dataPasswordChanger, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    axios(`${API}/api/auth/edit/${data.user_id}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "PUT",
      data,
    })
      .then((res) => {
        setEditProfile(false);
        setLoading(false);
      })
      .catch((e) => {
        setEditProfile(false);
        setLoading(false);
        swal({
          title: "Profile gagal diubah!!",
          icon: "warning",
          dangerMode: true,
        });
      });
  };
  const showModalImage = () => {
    setImage({
      result: null,
      filename: null,
      filetype: null,
      src: null,
      error: null,
    });
    setEditImage(true);
  };
  const saveImage = () => {
    const token = localStorage.getItem("token");
    axios(`${API}/api/auth/update_image/${data.user_id}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "PATCH",
      data: {
        image: image.result,
        username: data.username,
        imageName: image.filename,
      },
    })
      .then(() => {
        setEditImage(false);
      })
      .catch(() => {
        setEditImage(false);
        swal({
          title: "Oopss...!!",
          text: "Profile gagal diubah!!",
          icon: "warning",
          dangerMode: true,
        });
      });
  };

  const deleteProfileImage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    swal({
      title: "Yakin ingin menghapus data?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true);
        axios(`${API}/api/auth/deleteProfileImage/${user?.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            setData({ ...data, profile_image: null });
            setLoading(false);
          })
          .catch((e) => {
            if (e?.response?.status === 403) {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setLoggined(false);
              swal({
                title: "Sesi login anda habis!!",
                icon: "warning",
                dangerMode: true,
              });
            }
            swal({
              title: "Foto profil gagal dihapus!!",
              icon: "warning",
              dangerMode: true,
            });
            setLoading(false);
          });
      }
    });
  };

  const handleSubmitPasswordChanger = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validationPassword()) return;
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      swal({
        title: "Sesi login anda habis!!",
        icon: "warning",
        dangerMode: true,
      });
      setLoggined(false);
    }
    axios(`${API}/api/auth/changePassword/${user.id}`, {
      method: "PATCH",
      data: dataPasswordChanger,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setLoading(false);
        setEditPassword(false);
        swal({
          title: "Yeyyy.... !",
          text: "Password Berhasil Diubah",
          icon: "success",
        });
        return;
      })
      .catch((res) => {
        if (res.response.status != 400) {
          swal({
            title: "Oopss....!!",
            text: "Kesalahan mengambil data",
            icon: "warning",
            dangerMode: true,
          });
          return;
        }

        if (res.response.data.error) {
          const key = Object.keys(res.response.data.error);
          const msg = res.response.data.error[key];
          setErrorFormValue({ [key]: msg });
          setLoading(false);
        }
      });
  };

  return (
    <Fragment>
      {!loggined && <Redirect to="/" />}
      {loading && <LoadingSpinner />}
      <div className="px-10  py-10 ">
        <div className="bg-primary rounded-xl mx-auto w-full md:w-3/5  p-5">
          <h4 className="text-white text-mont font-bold">Profile Setting</h4>
          <div className="grid grid-cols-12 mt-6 lg:gap-10 px-10">
            <div className="col-span-full md:col-span-4 flex flex-col items-center">
              <div>
                <img
                  className="w-28 h-28 scale-100 object-fill rounded-full"
                  src={
                    data?.profile_image
                      ? `${API}/profile_images/clients/${data?.profile_image}`
                      : `${API}/img/profile_small.jpg`
                  }
                  alt=""
                />
                <button
                  onClick={showModalImage}
                  className="float-right rounded-full bg-white w-6 h-6 flex items-center justify-center p-3 text-gray-800 hover:bg-gray-200 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faPen} size="xs" />
                </button>
              </div>
              <p className="text-white  mt-3 font-bold text-sm">{name}</p>
              <button
                onClick={deleteProfileImage}
                className="rounded-full bg-white px-8 px-2 mt-2  focus:outline-none hover:bg-gray-100 text-xs"
                style={{ paddingTop: 4, paddingBottom: 4 }}
              >
                Hapus Foto
              </button>
            </div>
            <form
              className="col-span-full md:col-span-8"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-12 gap-3 ">
                <div className="form col-span-12">
                  <label
                    htmlFor=""
                    className="text-white text-sm font-semibold"
                  >
                    Nama
                  </label>
                  <div>
                    <input
                      value={data?.name || ""}
                      autoComplete="off"
                      onChange={handleInput}
                      name="name"
                      type="text"
                      className={
                        (!editProfile && " bg-gray-300 ") +
                        (errorFormValue?.name && " bg-red-200 ") +
                        " px-2 rounded-full focus:outline-none w-full text-sm  shadow-sm focus:shadow-lg"
                      }
                      style={{ paddingTop: 3, paddingBottom: 3 }}
                    />
                    {errorFormValue?.name && (
                      <div className="text-red-300 font-bold  text-sm">
                        {errorFormValue.name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form col-span-12 md:col-span-6">
                  <label
                    htmlFor=""
                    className="text-white  text-sm font-semibold"
                  >
                    Username
                  </label>
                  <div>
                    <input
                      value={data?.username || ""}
                      autoComplete="off"
                      onChange={handleInput}
                      name="username"
                      type="text"
                      className={
                        (!editProfile && " bg-gray-300 ") +
                        (errorFormValue?.username && " bg-red-200 ") +
                        " px-2 rounded-full focus:outline-none w-full text-sm  shadow-sm focus:shadow-lg"
                      }
                      style={{ paddingTop: 3, paddingBottom: 3 }}
                    />
                    {errorFormValue?.username && (
                      <div className="text-red-300 font-bold  text-sm">
                        {errorFormValue.username}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form col-span-12 md:col-span-6">
                  <label
                    htmlFor=""
                    className="text-white  text-sm font-semibold"
                  >
                    Email
                  </label>
                  <div>
                    <input
                      value={data?.email || ""}
                      autoComplete="off"
                      onChange={handleInput}
                      name="email"
                      type="text"
                      className={
                        (!editProfile && " bg-gray-300 ") +
                        (errorFormValue?.email && " bg-red-200 ") +
                        " px-2 rounded-full focus:outline-none w-full text-sm  shadow-sm focus:shadow-lg"
                      }
                      style={{ paddingTop: 3, paddingBottom: 3 }}
                    />
                    {errorFormValue?.email && (
                      <div className="text-red-300 font-bold  text-sm">
                        {errorFormValue.email}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form col-span-12 md:col-span-6">
                  <label
                    htmlFor=""
                    className="text-white  text-sm font-semibold"
                  >
                    Tempat Lahir
                  </label>
                  <div>
                    <input
                      value={data?.place_of_birth || ""}
                      autoComplete="off"
                      onChange={handleInput}
                      name="place_of_birth"
                      type="text"
                      className={
                        (!editProfile && " bg-gray-300 ") +
                        (errorFormValue?.place_of_birth && " bg-red-200 ") +
                        " px-2 rounded-full focus:outline-none w-full text-sm  shadow-sm focus:shadow-lg"
                      }
                      style={{ paddingTop: 3, paddingBottom: 3 }}
                    />
                    {errorFormValue?.place_of_birth && (
                      <div className="text-red-300 font-bold  text-sm">
                        {errorFormValue.place_of_birth}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form col-span-12 md:col-span-6">
                  <label
                    htmlFor=""
                    className="text-white  text-sm font-semibold"
                  >
                    Tanggal Lahir
                  </label>
                  <div>
                    <input
                      value={data?.date_of_birth || ""}
                      onChange={handleInput}
                      name="date_of_birth"
                      type="date"
                      className={
                        (!editProfile && " bg-gray-300 ") +
                        (errorFormValue?.date_of_birth && " bg-red-200 ") +
                        " px-2 rounded-full focus:outline-none w-full text-sm  shadow-sm focus:shadow-lg"
                      }
                      style={{ paddingTop: 3, paddingBottom: 3 }}
                    />
                    {errorFormValue?.date_of_birth && (
                      <div className="text-red-300 font-bold  text-sm">
                        {errorFormValue.date_of_birth}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                {editProfile && (
                  <div className="mt-8">
                    <button
                      type="submit"
                      className="bg-white rounded-full px-6 hover:bg-gray-100  text-sm focus:outline-none"
                      style={{ paddingBottom: 2, paddingTop: 2 }}
                    >
                      Simpan Perubahan
                    </button>
                    <div
                      type="button"
                      onClick={(e) => {
                        setErrorFormValue({});
                        setEditProfile(false);
                      }}
                      className="ml-4 bg-white rounded-full px-6  inline hover:bg-gray-100 text-sm focus:outline-none cursor-pointer"
                      style={{ paddingBottom: 2, paddingTop: 2 }}
                    >
                      Cancel
                    </div>
                  </div>
                )}
                {!editPassword && !editProfile && (
                  <div className="mt-8 float-right flex">
                    <div
                      type="button"
                      onClick={(e) => setEditProfile(true)}
                      className="bg-white rounded-full px-6 hover:bg-gray-100  text-sm focus:outline-none cursor-pointer mr-2"
                      style={{ paddingBottom: 2, paddingTop: 2 }}
                    >
                      Edit Profile
                    </div>
                    <div
                      type="button"
                      onClick={(e) => setEditPassword(true)}
                      className="bg-white rounded-full px-6 hover:bg-gray-100  text-sm focus:outline-none cursor-pointer"
                      style={{ paddingBottom: 2, paddingTop: 2 }}
                    >
                      Ubah Password
                    </div>
                  </div>
                )}
              </div>
            </form>
            {editPassword && (
              <form
                onSubmit={handleSubmitPasswordChanger}
                className="col-span-full md:col-start-5 mt-2"
                method="post"
                ref={ref}
              >
                <h5 className="text-white font-bold">Ubah Password</h5>
                <div className="form w-full mt-2">
                  <label
                    htmlFor=""
                    className="text-white  text-sm font-semibold"
                  >
                    Password Lama
                  </label>
                  <div>
                    <input
                      autoComplete="off"
                      onChange={handleInputPassword}
                      name="old_password"
                      type="password"
                      className={
                        (errorFormValue?.old_password && " bg-red-200 ") +
                        " px-2 rounded-full focus:outline-none w-full text-sm  shadow-sm focus:shadow-lg"
                      }
                      style={{ paddingTop: 3, paddingBottom: 3 }}
                    />
                    {errorFormValue?.old_password && (
                      <div className="text-red-300 font-bold  text-sm">
                        {errorFormValue.old_password}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form w-full mt-2">
                  <label
                    htmlFor=""
                    className="text-white  text-sm font-semibold"
                  >
                    Password Baru
                  </label>
                  <div>
                    <input
                      autoComplete="off"
                      onChange={handleInputPassword}
                      name="new_password"
                      type="password"
                      className={
                        (errorFormValue?.new_password && " bg-red-200 ") +
                        " px-2 rounded-full focus:outline-none w-full text-sm  shadow-sm focus:shadow-lg"
                      }
                      style={{ paddingTop: 3, paddingBottom: 3 }}
                    />
                  </div>
                  {errorFormValue?.new_password && (
                    <div className="text-red-300 font-bold  text-sm">
                      {errorFormValue.new_password}
                    </div>
                  )}
                </div>
                <div className="form w-full mt-2">
                  <label
                    htmlFor=""
                    className="text-white  text-sm font-semibold"
                  >
                    Konfirmasi Password
                  </label>
                  <div>
                    <input
                      autoComplete="off"
                      onChange={handleInputPassword}
                      name="confirm_password"
                      type="password"
                      className={
                        (errorFormValue?.confirm_password && " bg-red-200 ") +
                        " px-2 rounded-full focus:outline-none w-full text-sm  shadow-sm focus:shadow-lg"
                      }
                      style={{ paddingTop: 3, paddingBottom: 3 }}
                    />
                    {errorFormValue?.confirm_password && (
                      <div className="text-red-300 font-bold  text-sm">
                        {errorFormValue.confirm_password}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div
                    onClick={() => setEditPassword(false)}
                    className="bg-white rounded-full px-6 hover:bg-gray-100  text-sm focus:outline-none cursor-pointer mt-4 mr-2"
                    style={{ paddingBottom: 2, paddingTop: 2 }}
                  >
                    Batal
                  </div>
                  <button
                    className="bg-white rounded-full px-6 hover:bg-gray-100  text-sm focus:outline-none cursor-pointer mt-4 "
                    style={{ paddingBottom: 2, paddingTop: 2 }}
                  >
                    Simpan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      {editImage && (
        <main
          data-value="modal"
          className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black bg-opacity-70"
        >
          <div className="relative w-auto my-6 mx-auto w-3/4 md:max-w-2xl h-auto ">
            {/*content*/}
            <div className="border-0 shadow-lg relative flex flex-col w-full h-full bg-secondary rounded-xl overflow-hidden">
              {/*Header*/}
              <div className="bg-secondary flex  pl-6 pr-3 py-4">
                <p className="text-white text-2xl font-extrabold text-mont ">
                  Upload Foto Profile
                </p>
                <button
                  onClick={() => setEditImage(false)}
                  className="w-6 h-6 ml-auto  text-color2 hover:text-white focus:outline-none"
                >
                  X
                </button>
              </div>
              <div className=" py-6  px-8 flex-auto bg-white">
                <DropNCrop
                  cropperOptions={{
                    guides: true,
                    viewMode: 1,
                    autoCropArea: 0,
                    aspectRatio: 1,
                  }}
                  onChange={(value) => setImage(value)}
                  value={image}
                />
                <button
                  onClick={saveImage}
                  className="mt-6 px-8 py-2 rounded-full bg-primary text-white text-base font-mont font-bold"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </Fragment>
  );
};

export default Profile;
