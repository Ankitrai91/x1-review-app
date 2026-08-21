import { useState } from "react";
import { markReviewAsUsed } from "../services/reviewService";

function ReviewCard({
  review,
  businessConfig,
}) {
  const [copied, setCopied] =
    useState(false);


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        review.text
      );

        const markedAsUsed =
        await markReviewAsUsed(
          businessConfig.collectionName,
          review.id
        );

      if (!markedAsUsed) {
        setError(
          "This review is no longer available. Please try again."
        );

        return;
      }


      setCopied(true);
    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );
    }
  };

  const handleContinue = () => {
    window.location.href = businessConfig.googleReviewUrl;
  };

  return (
    <main className="page">
      <div className="card">

        <div className="brand">
          <h1>{businessConfig.businessName}</h1>
        </div>

        <div className="stars">
          ★★★★★
        </div>

        <h2>
          We'd love your review
        </h2>

        <p className="subtitle">
          {businessConfig.subtitle}
        </p>

        <div className="review-box">
          <p>{review.text}</p>
        </div>

        <button
          className="copy-btn"
          onClick={handleCopy}
        >
          {copied
            ? "✓ Review Copied"
            : "Copy Review"}
        </button>

        <button
          className="continue-btn"
          onClick={handleContinue}
        >
          Continue to Google
        </button>

        <p className="small-text">
          Copy the review first, then paste it
          on Google.
        </p>

      </div>
    </main>
  );
}

export default ReviewCard;