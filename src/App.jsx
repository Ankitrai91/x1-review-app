import { useEffect, useState } from "react";
import ReviewCard from "./components/ReviewCard";
import { getUniqueReview } from "./services/reviewService";
import { getBusinessConfig } from "./src/config/getBusinessConfig";

console.log(
  "Testing function:",
  getBusinessConfig()
);

// const CONFIG = {
//   gym: {
//     collection: "reviews",
//     name: "X1 Fitness",
//     subtitle: "Share your experience with us on Google.",
//     googleUrl: "https://g.page/r/CUMNW_N0qfZIEBM/review",
//   },

//   restra: {
//     collection: "restrareview",
//     name: "Biryani Box",
//     subtitle: "Share your dining experience with us on Google.",
//     googleUrl: "https://g.page/r/CTdJB1oPJjxCEAE/review",
//   },
// };

function App() {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const [businessConfig, setBusinessConfig] =
    useState(null);

  // Get current URL
  const pathname = window.location.pathname.toLowerCase();

  // Decide which business
  let type = "gym";

  if (pathname.startsWith("/restra")) {
    type = "restra";
  }

  // Get configuration for selected business
  // const config = CONFIG[type];

  

  useEffect(() => {
    const loadReview = async () => {
      try {
        setLoading(true);
        setError("");

     


         const config =
          getBusinessConfig();

             console.log("Business:", type);
        console.log("Collection:", businessConfig?.collectionName);

        if (!config) {
          setError(
            "Invalid business link."
          );

          setLoading(false);

          return;
        }

        setBusinessConfig(config);



        const data = await getUniqueReview(
          businessConfig.collectionName
        );

        console.log("Review:", data);

        setReview(data);
      } catch (error) {
        console.error("Review loading error:", error);

        setError(
          "Unable to load review. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadReview();
  }, [type, businessConfig?.collectionName]);

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
          There are no unused reviews available.
        </p>
      </div>
    );
  }

  return (
    <ReviewCard
      review={review}
      businessConfig={businessConfig}

    />
  );
}

export default App;