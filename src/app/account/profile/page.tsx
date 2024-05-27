import { auth } from "@/lib/auth";
import { getGuest } from "@/lib/data-service";
import ProfileForm from "./ProfileForm";

export const metadata = {
  title: "profile",
};

export default async function Page() {
  const session = await auth();

  const guest = await getGuest(session?.user?.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <ProfileForm guest={guest} />
    </div>
  );
}
