import { useState, type ChangeEvent, type FormEvent } from "react";
import type { ProductType } from "../../../types/api";
import { createProduct } from "../api/create-product";
import { useKeycloak } from "../../../hooks/useKeycloak";
import "./add-product.css";
import { useNavigate } from "react-router";

function AddProductPage() {
  const { keycloak } = useKeycloak();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!keycloak?.token) {
      setSubmitError("Please login before adding a product.");
      return;
    }

    try {
      setSubmitError(null);
      setIsSubmitting(true);
      const response = await createProduct(keycloak.token, formData);
      if (response.ok) {
        navigate("/");
        return;
      }

      if (response.status === 409) {
        setSubmitError("SKU code already exists. Please use a different SKU.");
        return;
      }

      if (response.status === 400) {
        setSubmitError("Invalid product data. Please review the fields.");
        return;
      }

      setSubmitError("We couldn't add this product right now. Please try again.");
    } catch (err) {
      console.error("Create product failed", err);
      setSubmitError("Unexpected error while saving product. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="add-product-page">
      <div className="add-product-header">
        <h2>Add Product</h2>
      </div>

      {submitError && (
        <p className="add-product-notice" role="alert">
          {submitError}
        </p>
      )}

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="add-product-field">
          <label>Name Product:</label>
          <input
            type="text"
            id="name"
            className="form-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="add-product-field">
          <label>Description Product:</label>
          <input
            type="text"
            id="description"
            className="form-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="add-product-field">
          <label>Price Product:</label>
          <input
            type="number"
            id="price"
            className="form-input"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min={0}
            step="0.01"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="add-product-field">
          <label>Sku Code of Product:</label>
          <input
            type="text"
            className="form-input"
            id="skuCode"
            name="skuCode"
            value={formData.skuCode}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>

        <button type="submit" className="btn btn-submit add-product-submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
}

export default AddProductPage;
