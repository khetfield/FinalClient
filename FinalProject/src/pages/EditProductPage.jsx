import { useState } from "react";
import { useEditProductsMutation } from "../slices/api";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditProduct() {
  const [editProduct] = useEditProductsMutation();
  const product_info = useSelector((state) => state.products);
  const params = useParams();
  const chosenProduct = product_info.find((i) => i.id === Number(params.id));

  const [price, setPrice] = useState(chosenProduct.price);
  const [description, setDescription] = useState(chosenProduct.description);
  const [name, setName] = useState(chosenProduct.name);
  const [category, setCategory] = useState(chosenProduct.categories);
  const [image, setImage] = useState(chosenProduct.image_url);
  const [availability, setAvailability] = useState(chosenProduct.availability);
  const [nutrition, setNutrition] = useState(chosenProduct.nutrition_facts);
  const navigate = useNavigate();
  console.log(chosenProduct.id);

  const onSubmit = async () => {
    await editProduct({
      price: price,
      description: description,
      name: name,
      categories: category,
      image_url: image,
      availability: availability,
      nutrition_facts: nutrition,
      id: chosenProduct.id,
    });
    navigate("/products");
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
export default EditProduct;
