"use client";

import { deleteBooking } from "@/lib/actions";
import { Booking } from "@/lib/types";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";

export default function ReservationsList({
  bookings,
}: {
  bookings: Booking[];
}) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings: Booking[], bookingId: number) => {
      return currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
