import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddToCartByUserIdMutation,
  useGetAllProductsQuery,
} from "../slices/api";
import { useNavigate } from "react-router-dom";

function Products() {
  const { isLoading } = useGetAllProductsQuery();
  const products = useSelector((state) => state.products);
  const [product, setProduct] = useState("");
  const user = useSelector((state) => state.auth.credentials.users);
  const [token, setToken] = useState(null);
  const user_token = useSelector((state) => state.auth.credentials.token);
  const [addToCartFunc] = useAddToCartByUserIdMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(user_token);
  }, [user_token]);

  const handleAddToCart = async (e) => {
    let positionClick = e.target;
    if (positionClick.classList.contains("addToCartButton")) {
      let product_id = positionClick.parentElement.dataset.id;
      await addToCartFunc({ product_id: product_id });
      window.location.reload();
    }
  };
  const handleEditButton = (e) => {
    let positionClick = e.target;
    if (positionClick.classList.contains("editButton")) {
      let product_id = positionClick.parentElement.dataset.id;
      navigate(`/products/editProducts/${product_id}`);
    }
  };
  return (
    <>
      <div className="searchProductsWrapper">
        <input
          type="text"
          placeholder="Search for products..."
          onChange={(e) => setProduct(e.target.value)}
          className="searchBar"
        />
      </div>
      {isLoading ? (
        <h1 className="emptyCart">Loading Products...</h1>
      ) : (
        <div id={"Products"}>
          {products.length < 1 ? (
            <h1>No Available Products...</h1>
          ) : (
            products
              .filter((i) =>
                i.name.toLowerCase().includes(product.toLowerCase())
              )
              .map((i) => (
                <div key={i.id} data-id={i.id} className="Product">
                  <Link to={"/products/" + i.id}>
                    <h1 className="productLink">{i.name}</h1>
                  </Link>
                  <img src={i.image_url} alt={i.description} />
                  {i.availability ? (
                    <h3 style={{ color: "lawngreen", fontSize: "14px" }}>
                      In Stock
                    </h3>
                  ) : (
                    <h3 style={{ color: "firebrick", fontSize: "14px" }}>
                      Out of Stock
                    </h3>
                  )}
                  <h2>Category: {i.description}</h2>
                  <h2>Price: ${i.price}</h2>
                  {!user.id && !token ? (
                    <h2>Please login to add products to cart.</h2>
                  ) : (
                    <>
                      {!i.availability ? (
                        <>
                          <button className="addToCartButtonout" disabled>
                            Out of Stock
                          </button>
                          <br />
                          <br />
                        </>
                      ) : (
                        <>
                          <button
                            className="addToCartButton"
                            onClick={(e) => handleAddToCart(e, i.id)}
                          >
                            Add to Cart
                          </button>
                          <br />
                          <br />
                        </>
                      )}
                    </>
                  )}
                  {user.is_admin && (
                    <button
                      className="editButton"
                      onClick={(e) => handleEditButton(e)}
                    >
                      Edit Item
                    </button>
                  )}
                </div>
              ))
          )}
        </div>
      )}
    </>
  );
}
export default Products;
