import { memo } from "react";

const ListGroup = ({
  items,
  valueProperty,
  textProperty,
  countProperty,
  onItemSelect,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {items.map((g) => (
        <li
          key={g[valueProperty]}
          className={`list-group-item d-flex justify-content-between align-items-center clickable ${
            selectedItem && selectedItem === g ? "active" : null
          }`}
          onClick={() => onItemSelect(g)}
        >
          {g[textProperty]}
          <span className="badge bg-primary rounded-pill">
            {g[countProperty]}
          </span>
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "id",
  countProperty: "count",
};

export default memo(ListGroup);
