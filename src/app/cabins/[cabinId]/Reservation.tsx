import DateSelector from "@/components/DateSelector";
import LoginMessage from "@/components/LoginMessage";
import ReservationForm from "@/components/ReservationForm";
import { auth } from "@/lib/auth";
import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import { CabinType } from "@/lib/types";

type ReservationProps = {
  cabin: CabinType;
};

export default async function Reservation({ cabin }: ReservationProps) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const user = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      {user !== null ? (
        <ReservationForm cabin={cabin} user={user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
