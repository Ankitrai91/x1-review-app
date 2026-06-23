import { useState } from "react";

const GOOGLE_REVIEW_URL =
  "https://g.page/r/CUMNW_N0qfZIEBM/review";

function ReviewCard({ review }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      review.text
    );

    setCopied(true);
  };

  const handleContinue = () => {
    window.location.href =
      GOOGLE_REVIEW_URL;
  };

  return (
    <div className="card">
      <h1>X1 Fitness</h1>

      <p className="subtitle">
        Copy this review and paste it on Google.
      </p>

      <div className="review-box">
        {review.text}
      </div>

      <button
        className="copy-btn"
        onClick={handleCopy}
      >
        {copied
          ? "Review Copied ✓"
          : "Copy Review"}
      </button>

      <button
        className="continue-btn"
        onClick={handleContinue}
      >
        Continue To Google Review
      </button>
    </div>
  );
}

export default ReviewCard;