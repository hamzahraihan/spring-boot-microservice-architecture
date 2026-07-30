import { useState } from "react";
import "./product.css";
import type { OrderType, ProductType } from "../../../types/api";

function ProductCard({
  data,
  handleOrder,
  isOrdering,
}: {
  data: ProductType;
  handleOrder: (data: OrderType) => void;
  isOrdering: boolean;
}) {
  const [qty, setQty] = useState<number>(1);

  return (
    <div key={data.id} className="card">
      <div className="card-content">
        <ul>
          <li>
            <h2>{data.name}</h2>
          </li>
          <li>
            <p>Price: ${data.price}</p>
          </li>
        </ul>
        <label htmlFor={data.id}>Quantity</label>
        <input
          type="number"
          id={data.id}
          name="qty"
          value={Number.isNaN(qty) ? "" : qty}
          min={1}
          step={1}
          disabled={isOrdering}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "") {
              setQty(1);
            } else {
              setQty(Number(val));
            }
          }}
          className="input"
          required
        />
      </div>
      <button
        className="btn btn-order"
        disabled={isOrdering}
        onClick={() =>
          handleOrder({
            skuCode: data.skuCode,
            price: data.price,
            quantity: qty,
          })
        }
      >
        {isOrdering ? "Ordering..." : "Order Now"}
      </button>
    </div>
  );
}
export default ProductCard;
