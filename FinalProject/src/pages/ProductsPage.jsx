import { useGetAllProductsQuery } from "../slices/api";
import Products from "./Products";

function ProductsPage() {
  return (
    <>
      <div>
        <Products />
      </div>
    </>
  );
}
export default ProductsPage;
