import { useState } from "react";
import { useAddProductsMutation } from "../slices/api";
import { useNavigate } from "react-router-dom";
function AddProduct() {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [availability, setAvailability] = useState(true);
  const [nutrition, setNutrition] = useState("");

  const navigate = useNavigate();

  const [addProducts] = useAddProductsMutation();

  const onSubmit = async () => {
    await addProducts({
      price: price,
      description: description,
      name: name,
      categories: category,
      image_url: image,
      availability: availability,
      nutrition_facts: nutrition,
    }).then(() => {
      navigate("/products");
      window.location.reload();
    });
  };
  return (
    <>
      <div id={"productFormWrapper"}>
        <div id={"productForm"}>
          <input
            type={"number"}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter price..."
          />
          <input
            type={"text"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description..."
          />
          <input
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name..."
          />
          <input
            type={"text"}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter product category..."
          />
          <input
            type={"text"}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image url..."
          />
          <input
            type={"text"}
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="Availability? true or false..."
          />
          <input
            type={"text"}
            value={nutrition}
            onChange={(e) => setNutrition(e.target.value)}
            placeholder="Image url..."
          />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
}
export default AddProduct;
