"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supbase";

export async function updateProfile(formData: FormData): Promise<void> {
  const session = await auth();
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
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
