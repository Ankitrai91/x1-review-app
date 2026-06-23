import {
  collection,
  query,
  where,
  limit,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

import { db } from "../src/firebase";

export const getUniqueReview = async () => {
  const q = query(
    collection(db, "reviews"),
    where("used", "==", false),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const reviewDoc = snapshot.docs[0];

  await updateDoc(
    doc(db, "reviews", reviewDoc.id),
    {
      used: true
    }
  );

  return {
    id: reviewDoc.id,
    ...reviewDoc.data()
  };
};