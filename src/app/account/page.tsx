import { auth } from "@/lib/auth";

export const metadata = {
  title: "Guest area",
};

async function AccountPage() {
  const user = await auth();

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome {user?.user?.name}
    </h2>
  );
}

export default AccountPage;
