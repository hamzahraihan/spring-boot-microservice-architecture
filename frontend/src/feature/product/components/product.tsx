import { useState } from "react";
import type { ProductType } from "./product-list";
import "./product.css";
import type { OrderType } from "../../order/type/ordertype";

function ProductCard({
  data,
  handleOrder,
}: {
  data: ProductType;
  handleOrder: (data: OrderType) => void;
}) {
  const [qty, setQty] = useState<number>(1);
  return (
    <div key={data.id} className="card">
      <div>
        <ul>
          <li>
            <h2>{data.name}</h2>
          </li>
          <li>
            <p>Price: ${data.price}</p>
          </li>
        </ul>
        <p>Quantity</p>
        <input
          type="number"
          id={data.id}
          name="qty"
          value={Number.isNaN(qty) ? "" : qty}
          min={1}
          onChange={(e) => {
            const val = e.target.value;

            // If empty, set state to 0 or "" so the user can type something new
            if (val === "") {
              setQty(1);
            } else {
              setQty(Number(val));
            }
          }}
          className="input-product"
          required
        />
      </div>
      <button
        className="btn btn-order"
        onClick={() =>
          handleOrder({
            skuCode: data.skuCode,
            price: data.price,
            quantity: qty,
          })
        }
      >
        Order Now
      </button>
    </div>
  );
}
export default ProductCard;
