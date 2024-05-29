import ReservationsList from "@/components/ReservationsList";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/data-service";
import { ExtendedSession } from "@/lib/types";

export const metadata = {
  title: "reservation",
};
export default async function Page() {
  const user: ExtendedSession | null = await auth();

  const bookings = await getBookings(user?.user?.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationsList bookings={bookings} />
      )}
    </div>
  );
}
