import { useEffect, useState } from "react";
import ReviewCard from "./components/ReviewCard";
import { getUniqueReview } from "./services/reviewService";

const CONFIG = {
  gym: {
    collection: "reviews",
    name: "X1 Fitness",
    subtitle: "Share your experience with us on Google.",
    googleUrl:
      "YOUR_GYM_GOOGLE_REVIEW_URL",
  },

  restra: {
    collection: "restrareview",
    name: "Biryani Box",
    subtitle: "Share your dining experience with us on Google.",
    googleUrl:
      "YOUR_RESTAURANT_GOOGLE_REVIEW_URL",
  },
};

function App() {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pathname = window.location.pathname.toLowerCase();

  let type = "gym";

  if (pathname.startsWith("/restra")) {
    type = "restra";
  }

  const CONFIG = {
  gym: {
    collection: "reviews",
    name: "X1 Fitness",
    subtitle: "Share your experience with us on Google.",
    googleUrl:
      "https://g.page/r/CUMNW_N0qfZIEBM/review"
  },

  restra: {
    collection: "restrareview",
    name: "Biryani Box",
    subtitle: "Share your dining experience with us on Google.",
    googleUrl:
      "https://g.page/r/CTdJB1oPJjxCEAE/review",
  },
};

  useEffect(() => {
    const loadReview = async () => {
      try {
        setLoading(true);

        const data = await getUniqueReview(
          config.collection
        );

        setReview(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load review.");
      } finally {
        setLoading(false);
      }
    };

    loadReview();
  }, [config.collection]);

  if (loading) {
    return (
      <div className="center">
        <div className="loader"></div>
        <p>Preparing your review...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="center">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="center">
        <h2>No Reviews Available</h2>
        <p>
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <ReviewCard
      review={review}
      businessName={config.name}
      subtitle={config.subtitle}
      googleUrl={config.googleUrl}
    />
  );
}

export default App;