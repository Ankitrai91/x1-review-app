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

          transaction.update(
            reviewRef,
            {
              used: true,
            }
          );

          return {
            id: freshSnapshot.id,
            ...data,
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