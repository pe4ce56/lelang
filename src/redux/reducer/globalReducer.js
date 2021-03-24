import axios from "axios";
import actionType from "./globalType";
import { API } from "../../config/config";
const globalState = {
  toggleLogin: false,
  quickView: {
    show: false,
    id: 0,
  },
  wishlist: [],
};
const rootReducer = (state = globalState, action) => {
  switch (action.type) {
    case actionType.TOGGLE_LOGIN:
      return {
        ...state,
        toggleLogin: !state.toggleLogin,
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
      const index = state.wishlist.findIndex(
        ({ auction_id }) => auction_id == action.value
      );
      // checking exist
      if (index !== -1) {
        // delete wishlis
        if (state.wishlist.length > -1) {
          axios(`${API}/API/auctions/wishlist`, {
            method: "DELETE",
            data: { auction_id: action.value, client_id: 1 },
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
