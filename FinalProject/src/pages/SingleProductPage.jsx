import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useAddToCartByUserIdMutation,
  useDeleteProductMutation,
} from "../slices/api";
import { useState, useEffect } from "react";

function SingleProduct() {
  const productsData = useSelector((state) => state.products);
  const params = useParams();
  const chosenProduct = productsData.find((i) => i.id === Number(params.id));
  const user = useSelector((state) => state.auth.credentials.users);
  const user_token = useSelector((state) => state.auth.credentials.token);
  const [token, setToken] = useState(null);
  const [addToCart] = useAddToCartByUserIdMutation();
  const [del] = useDeleteProductMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(user_token);
  }, [user_token]);

  const handleAddToCart = () => {
    addToCart({ product_id: chosenProduct.id });
    navigate("/products");
  };
  const handleDeleteProduct = async () => {
    await del(chosenProduct.id);
    navigate("/products");
    window.location.reload();
  };
  return (
    <>
      <div id={"productDetailWrapper"}>
        <div className={"header"}>
          <h1>Product Details - {chosenProduct.name}</h1>
          <p>Detail Page of Product</p>
        </div>
        <div className={"imageWrapper"}>
          <img
            className={"productImage"}
            src={chosenProduct.image_url}
            alt={chosenProduct.description}
          />
          <img
            className={"nutritionFactsImg"}
            src={chosenProduct.nutrition_facts}
            alt={chosenProduct.description}
          />
        </div>
        {!user.id && !token ? (
          <>
            <h1>You must be logged in to add to cart!</h1>
          </>
        ) : (
          <button onClick={handleAddToCart}>Add to Cart</button>
        )}
        {user.is_admin && (
          <button onClick={handleDeleteProduct}>Delete Product</button>
        )}
      </div>
    </>
  );
}
export default SingleProduct;
