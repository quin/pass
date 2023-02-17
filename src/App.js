import { useState, useCallback } from "react";
import "./App.css";
import HeartButton from "./HeartButton";
import { useEffect } from "react";
import { debounce } from "./utils";
const CURRENT_USER_ID = 1;
const LIKE_ID = 123;
const API_URL = "http://localhost:3001/api/v1/like";
const HEADERS = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const DEBOUNCE_TIMER = 300;

function App() {
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const onLikeClick = useCallback(
    debounce((likeId) => {
      if (!isLiked) {
        fetch(`${API_URL}/add`, {
          ...HEADERS,
          body: JSON.stringify({ likeId, userId: CURRENT_USER_ID }),
        })
          .then((res) => res.json())
          .then((_) => {
            let newCount = count + 1;
            setCount(newCount);
            setIsLiked(true);
          });
      } else {
        fetch(`${API_URL}/remove`, {
          ...HEADERS,
          body: JSON.stringify({ likeId, userId: CURRENT_USER_ID }),
        })
          .then((res) => res.json())
          .then((_) => {
            let newCount = count - 1;
            setCount(newCount);
            setIsLiked(false);
          });
      }
    }, DEBOUNCE_TIMER)
  );

  useEffect(() => {
    fetch(`${API_URL}/${LIKE_ID}/count`)
      .then((res) => res.json())
      .then((result) => {
        setCount(result.data);
      });

    fetch(`${API_URL}/${LIKE_ID}/user/${CURRENT_USER_ID}`)
      .then((res) => res.json())
      .then((result) => {
        setIsLiked(result.data);
      });
  }, []);

  return (
    <div>
      <HeartButton
        onClick={onLikeClick}
        isLiked={isLiked}
        count={count}
        likeId={LIKE_ID}
      />
    </div>
  );
}

export default App;
