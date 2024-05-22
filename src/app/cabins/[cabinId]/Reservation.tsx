import DateSelector from "@/components/DateSelector";
import ReservationForm from "@/components/ReservationForm";
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
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
