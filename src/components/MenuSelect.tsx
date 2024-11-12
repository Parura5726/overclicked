import { Menu } from "@/data";

export default function MenuSelect({
  menu,
  numSelects,
  remaining,
  addSelect,
  removeSelect,
}: {
  menu: Menu;
  numSelects: number;
  remaining: number;
  addSelect: () => void;
  removeSelect: () => void;
}) {
  let possible = remaining - numSelects > 0;
  return (
    <div
      className={`menu-select ${possible ? "active" : ""}`}
      onClick={possible ? addSelect : () => {}}
    >
      <div className="menu-details">
        <h2>{menu.name}</h2>
        <p>{menu.description}</p>
        <p className="smallprint">{remaining} remaining</p>
      </div>
      {numSelects > 0 ? (
        <div
          className="badge badge-remove-select"
          onClick={(e) => {
            e.stopPropagation();
            removeSelect();
          }}
        >
          -
        </div>
      ) : null}

      <div
        className="badge badge-num-select"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {numSelects}
      </div>
    </div>
  );
}
