import { memo } from "react";

const Like = ({ liked, onClick }) => {
  const classes = liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <button className="btn" onClick={onClick}>
      <span className={classes}></span>
    </button>
  );
};

export default memo(Like);
