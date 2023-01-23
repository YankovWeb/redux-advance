import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import {uiActions} from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.carIsVisilbe);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCardData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sendig...",
          message: "Sending Cart data!",
        })
      );
      const respons = await fetch(
        "https://react-redux-async-3c083-default-rtdb.firebaseio.com/cart.json",
        {method: "PUT", body: JSON.stringify(cart)}
      );
      if (!respons.ok) {
        throw new Error("Sending cart data failed.");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!...",
          message: "Sending Cart data successfully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCardData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending Cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
