import axios from "axios";
import actionType from "./globalType";
import { API } from "../../config/config";
const globalState = {
  toggleLogin: false,
  loginMessage: "",
  quickView: {
    show: false,
    id: 0,
  },
  wishlist: [],
};
const rootReducer = (state = globalState, action) => {
  switch (action.type) {
    case actionType.TOGGLE_LOGIN:
      // logout
      if (!state.toggleLogin) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      return {
        ...state,
        toggleLogin: !state.toggleLogin,
      };
    case actionType.SET_LOGIN_MESSAGE:
      return {
        ...state,
        loginMessage: action.value,
      };
    case actionType.SHOW_QUICK_VIEW:
      return {
        ...state,
        quickView: { show: true, id: action.value },
      };
    case actionType.HIDE_QUICK_VIEW:
      return {
        ...state,
        quickView: { show: false, id: action.value },
      };

    case actionType.TOGGLE_WISHLIST:
      const token = localStorage.getItem("token");
      console.log(token);
      if (token == null) return { ...state, wishlist: [] };
      const index = state.wishlist.findIndex(
        ({ auction_id }) => auction_id == action.value
      );
      console.log("index", index);
      // checking exist
      if (index !== -1) {
        // delete wishlis
        if (state.wishlist.length > -1) {
          axios(`${API}/API/auctions/wishlist`, {
            method: "DELETE",
            data: { auction_id: action.value, client_id: 1 },
            headers: { Authorization: `Bearer ${token}` },
          }).catch((e) => {
            if (e.response.status == 403) {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }
          });
          return {
            ...state,
            wishlist: state.wishlist.filter(
              ({ auction_id }) => auction_id !== action.value
            ),
          };
        }

        return state;
      }

      // add wishlist
      axios(`${API}/API/auctions/wishlist`, {
        method: "POST",
        data: { auction_id: action.value, client_id: 1 },
        headers: { Authorization: `Bearer ${token}` },
      }).catch((e) => {
        if (e.response.status == 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      });

      return {
        ...state,
        wishlist: [
          ...state.wishlist,
          {
            auction_id: action.value,
          },
        ],
      };
    case actionType.FETCH_WISHLIST: {
      const token = localStorage.getItem("token");
      if (token == null) return { ...state, wishlist: [] };
      return {
        ...state,
        wishlist: action.value,
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
