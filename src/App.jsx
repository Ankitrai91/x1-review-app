import { useEffect, useState } from "react";

import ReviewCard from "./components/ReviewCard";

import { getUniqueReview } from "./services/reviewService";

function App() {
  const [review, setReview] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadReview = async () => {
      const data =
        await getUniqueReview();

      setReview(data);

      setLoading(false);
    };

    loadReview();
  }, []);

  if (loading) {
    return (
      <div className="center">
        Loading...
      </div>
    );
  }

  if (!review) {
    return (
      <div className="center">
        No reviews available.
      </div>
    );
  }

  return <ReviewCard review={review} />;
}

export default App;