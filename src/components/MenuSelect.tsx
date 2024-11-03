import { Menu } from "@/menus";

export default function MenuSelect({
  menu,
  numSelects,
  addSelect,
  removeSelect,
}: {
  menu: Menu;
  numSelects: number;
  addSelect: () => void;
  removeSelect: () => void;
}) {
  return (
    <div className="menu-select" onClick={addSelect}>
      <div className="menu-details">
        <h2>{menu.name}</h2>
        <p>{menu.description}</p>
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
