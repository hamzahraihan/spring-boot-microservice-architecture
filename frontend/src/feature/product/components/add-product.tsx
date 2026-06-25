import { useState, type ChangeEvent } from "react";
import type { ProductType } from "../../../types/api";
import { createProduct } from "../api/create-product";
import { useKeycloak } from "../../../hooks/useKeycloak";
import "./add-product.css";
import { useNavigate } from "react-router";

function AddProductPage() {
  const { keycloak } = useKeycloak();
  const [formData, setFormData] = useState<ProductType>({
    name: "",
    description: "",
    skuCode: "",
    price: 0,
  });

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" && value !== "" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: ChangeEvent) => {
    event.preventDefault();
    console.log("Form submitted successfully: ", formData);
    const response = await createProduct(keycloak?.token, formData);
    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex" style={{ marginBottom: 15 }}>
          <label>Name Product:</label>
          <input
            type="text"
            id="name"
            className="form-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex" style={{ marginBottom: 15 }}>
          <label>Description Product:</label>
          <input
            type="text"
            id="description"
            className="form-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex" style={{ marginBottom: 15 }}>
          <label>Price Product:</label>
          <input
            type="number"
            id="price"
            className="form-input"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex" style={{ marginBottom: 15 }}>
          <label>Sku Code of Product:</label>
          <input
            type="text"
            className="form-input"
            id="skuCode"
            name="skuCode"
            value={formData.skuCode}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
