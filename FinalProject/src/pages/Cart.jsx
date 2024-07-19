import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useSelector } from "react-redux";
import {
  useGetCartItemsByUserIdQuery,
  useDeleteCartItemByIdMutation,
  useCheckOutMutation,
} from "../slices/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const user = useSelector((state) => state.auth.credentials.users);
  const { isLoading } = useGetCartItemsByUserIdQuery(user.id);
  const cart = useSelector((state) => state.carts.cart);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [del] = useDeleteCartItemByIdMutation();
  const [checkout] = useCheckOutMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (cart) {
      setCartItems(cart);
      setQuantity(new Array(cart.length).fill(1));
      const storedQuantities = cart.map((item) => {
        const cartId = item.cart_id;
        const storedCheck = localStorage.getItem(`quantity-${cartId}`);

        if (storedCheck && handleQuantityChange.called) {
          localStorage.setItem(`quantity-${cartId}`, 1);
        }
        const storedQuantity = localStorage.getItem(`quantity-${cartId}`) || 1;
        return storedQuantity ? Number(storedQuantity) : 1;
      });
      setQuantity(storedQuantities);
    }
  }, [cart]);
  const handleQuantityChange = async (index, newQuantity) => {
    setQuantity((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = newQuantity;
      localStorage.setItem(`quantity-${cartItems[index].cart_id}`, newQuantity);
      return newQuantities;
    });
  };
  const handleRemove = async (cartId) => {
    await del(cartId);
    window.location.reload();
  };
  const totalPrice = cartItems.reduce(
    (acc, item, index) => acc + Number(item.price) * quantity[index] || 1,
    0
  );

  const handleCheckout = async () => {
    cartItems.forEach((i) => {
      const productId = i.product_id;
      let quant = Number(localStorage.getItem(`quantity-${i.cart_id}`));
      if (quant === 0) {
        quant = 1;
      }
      const pri = (Number(i.price) * quant).toFixed(2);
      const car = i.cart_id;

      checkout({
        product_id: productId,
        quantity: quant,
        price: pri,
      });
      del(car);
    });
    navigate("/profile");
  };
  return (
    <div className="cartPage">
      <h1 className="shoppingCartHeader">Shopping Cart</h1>
      {isLoading ? (
        <p className="emptyCart">Loading Cart...</p>
      ) : cartItems.length === 0 ? (
        <p className="emptyCart">Your cart is empty. Fill it up!</p>
      ) : (
        <div className="cartItems">
          {cartItems.map((item, index) => (
            <div key={item.id} className="cartItem">
              <div className="cartItemInfo">
                <span className="itemName">{item.product_name}</span>
                <span>${item.price}</span>
                <span>Quantity: {quantity[index]}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(index, Number(quantity[index]) + 1)
                  }
                  className="test"
                >
                  Add
                </button>
                {quantity[index] > 1 ? (
                  <button
                    onClick={() =>
                      handleQuantityChange(index, Number(quantity[index]) - 1)
                    }
                    className="test"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemove(item.cart_id, item.product_id)}
                  >
                    Remove
                  </button>
                )}
                <span className="itemTotal">
                  Total: ${(Number(item.price) * quantity[index]).toFixed(2)}
                </span>
              </div>
              <button
                className="deleteItemButton"
                onClick={() => handleRemove(item.cart_id, item.product_id)}
              >
                <DeleteRoundedIcon />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="cartTotal">
        <h3>Total: ${Number(totalPrice.toFixed(2))}</h3>
        <button className="checkoutButton" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
