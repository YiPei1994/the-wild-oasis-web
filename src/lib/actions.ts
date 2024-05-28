"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supbase";
import { ExtendedSession } from "./types";
import { getBooking, getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData): Promise<void> {
  const session: ExtendedSession | null = await auth();
  if (!session) throw new Error("You must be logged in.");

  const nationalID = formData.get("nationalID") as string;

  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  ).split("%");

  const guestId = session?.user?.guestId;
  if (!guestId) throw new Error("Guest ID not found.");

  // Validate nationalID
  const nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/;
  if (!nationalIDRegex.test(nationalID)) {
    throw new Error(
      "National ID must be alphanumeric and between 6 and 12 characters long."
    );
  }
  const { error } = await supabase
    .from("guests")
    .update({ nationalID, nationality, countryFlag })
    .eq("id", guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deleteBooking(id: number) {
  const session: ExtendedSession | null = await auth();
  if (!session) throw new Error("You must be logged in.");

  const bookings = await getBookings(session.user?.guestId);

  const exist = bookings.find((booking) => booking.id === id);

  if (!exist) throw new Error("no such booking");

  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  const session: ExtendedSession | null = await auth();
  if (!session) throw new Error("You must be logged in.");

  const bookingId = Number(formData.get("reservationId"));
  const booking = await getBooking(bookingId);
  const exist = booking.guestId === session.user?.guestId;
  if (!exist)
    throw new Error("this booking does not belong to same logged user.");

  const updatedFields = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations")?.slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
