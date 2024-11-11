import { Order } from "@/data";
import { Menu } from "@/menus";

export default function OrderStatus({
  menuItems,
  order,
  buttonText,
  buttonAction,
  actionAvailable = true,
  showDetails = true,
  showRegister = true,
  archived = false,
  statusIcon = "",
}: {
  menuItems: Menu[];
  order: Order;
  buttonText: string;
  buttonAction: (id: number) => void;
  actionAvailable?: boolean;
  showDetails?: boolean;
  showRegister?: boolean;
  archived?: boolean;
  statusIcon?: string;
}) {
  return (
    <div className={`order-status ${archived ? "archived" : ""}`}>
      <div>
        <h2>
          <div>{`Order ${order.id}`}</div>
          <div>{statusIcon}</div>
        </h2>
        {showRegister ? <p>Register {order.register}</p> : null}
      </div>
      <div className="order-items">
        {order.amounts.map((amount, i) =>
          amount > 0 ? (
            <div key={i} className="order-item">
              <p>
                <b>{menuItems[i].name}</b> <span>{amount}</span>
              </p>
              {showDetails ? <p>{menuItems[i].description}</p> : null}
            </div>
          ) : null
        )}
      </div>
      {actionAvailable ? (
        <button onClick={() => buttonAction(order.id)}>{buttonText}</button>
      ) : null}
    </div>
  );
}
