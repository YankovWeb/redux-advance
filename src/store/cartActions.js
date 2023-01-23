import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";
export const FetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const respons = await fetch(
        "https://react-redux-async-3c083-default-rtdb.firebaseio.com/cart.json"
      );

      if (!respons.ok) {
        throw new Error("could not fetch cart data!");
      }

      const data = await respons.json();

      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching Cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sendig...",
        message: "Sending Cart data!",
      })
    );

    const sendRequest = async () => {
      const respons = await fetch(
        "https://react-redux-async-3c083-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!respons.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!...",
          message: "Sending Cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending Cart data failed!",
        })
      );
    }
  };
};
