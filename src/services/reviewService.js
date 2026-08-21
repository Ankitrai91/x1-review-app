import {
  collection,
  query,
  where,
  limit,
  getDocs,
  doc,
  runTransaction,
} from "firebase/firestore";

import { db } from "../src/firebase";

export const getUniqueReview = async (
  collectionName
) => {
  const reviewsRef = collection(
    db,
    collectionName
  );

  const q = query(
    reviewsRef,
    where("used", "==", false),
    limit(10)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  for (const reviewSnapshot of snapshot.docs) {
    const reviewRef = doc(
      db,
      collectionName,
      reviewSnapshot.id
    );

    try {
      const result = await runTransaction(
        db,
        async (transaction) => {
          const freshSnapshot =
            await transaction.get(reviewRef);

          if (!freshSnapshot.exists()) {
            return null;
          }

          const data =
            freshSnapshot.data();

          if (data.used === true) {
            return null;
          }

          // transaction.update(
          //   reviewRef,
          //   {
          //     used: true,
          //   }
          // );

           const reviewSnapshot = snapshot.docs[0];


          return {
            id: freshSnapshot.id,
            ...reviewSnapshot.data(),
          };
        }
      );

      if (result) {
        return result;
      }
    } catch (error) {
      console.error(
        "Review assignment failed:",
        error
      );
    }
  }

  return null;
};

export const markReviewAsUsed = async (
  collectionName,
  reviewId
) => {
  const reviewRef = doc(
    db,
    collectionName,
    reviewId
  );

  try {
    const result = await runTransaction(
      db,
      async (transaction) => {
        const reviewSnapshot =
          await transaction.get(reviewRef);

        if (!reviewSnapshot.exists()) {
          return false;
        }

        const data = reviewSnapshot.data();

        // Someone else already used it
        if (data.used === true) {
          return false;
        }

        transaction.update(reviewRef, {
          used: true,
        });

        return true;
      }
    );

    return result;
  } catch (error) {
    console.error(
      "Failed to mark review as used:",
      error
    );
    return false;
  }
};
