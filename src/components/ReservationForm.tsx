"use client";

import { createBooking } from "@/lib/actions";
import { CabinType } from "@/lib/types";
import { useReservation } from "@/store/ReservationStore";
import { format } from "date-fns";
import { Session } from "next-auth";
import SubmitButton from "./SubmitButton";

type ReservationFromProps = {
  cabin: CabinType;
  user: Session;
};

function formatDateString(dateString: string) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Format the date object into the desired format
  return format(date, "yyyy-MM-dd HH:mm:ss");
}
function ReservationForm({ cabin, user }: ReservationFromProps) {
  const { maxCapacity } = cabin;
  const { range, resetRange } = useReservation();

  const startDate = range?.from && formatDateString(String(range?.from));
  const endDate = range?.to && formatDateString(String(range?.to));

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user?.user?.image}
            alt={user?.user?.name}
          />
          <p>{user?.user?.name}</p>
        </div>
      </div>

      <form
        action={async (formData: FormData) => {
          await createBooking(formData), resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <input type="hidden" name="cabinId" defaultValue={cabin.id} />
        <input
          type="hidden"
          name="rangeFrom"
          defaultValue={String(startDate)}
        />
        <input type="hidden" name="rangeTo" defaultValue={String(endDate)} />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <SubmitButton>Reserve now</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
