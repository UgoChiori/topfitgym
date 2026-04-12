import { db } from "../auth/Firebase"; // Make sure this path matches your Firebase config
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { ArenaBooking } from "../types/arena";

export const createArenaBooking = async (bookingData: ArenaBooking) => {
  // Creates a unique ID so two people can't book the same court at the same time
  const bookingId = `${bookingData.date}_${bookingData.resourceId}_${bookingData.startTime}`;
  const bookingRef = doc(db, "bookings", bookingId);

  try {
    const snap = await getDoc(bookingRef);
    if (snap.exists()) {
      throw new Error("This slot is already booked.");
    }

    await setDoc(bookingRef, {
      ...bookingData,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};