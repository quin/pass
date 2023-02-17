import { ReactComponent as HeartIcon } from "./heart-icon.svg";
import { thousandFormat } from "./utils";
import "./App.css";
const Heart = ({ selected }) => {
  return (
    <span className="heart" role="button">
      {selected ? <HeartIcon fill={"red"} /> : <HeartIcon />}
    </span>
  );
};

const LikeCounter = ({ count }) => {
  return <div class="like-count">{thousandFormat(count)}</div>;
};

const HeartButton = ({ count, isLiked, onClick, likeId }) => {
  return (
    <div onClick={(e) => onClick(likeId)} class="heart-container">
      <Heart likeId={likeId} selected={isLiked} />
      <LikeCounter count={count} />
    </div>
  );
};

export default HeartButton;
