"use client";
import { deleteBooking } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useFormStatus } from "react-dom";

function DeleteReservation({ bookingId }: { bookingId: number }) {
  return (
    <form className="w-full" action={() => deleteBooking(bookingId)}>
      <FormButton />
    </form>
  );
}

export default DeleteReservation;

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="group w-full flex items-center gap-2 py-4 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      <span className="mt-1">{pending ? "Deleting" : "Delete"} </span>
    </button>
  );
}
