import SideNavigation from "@/components/SideNavigation";
import { PropsWithChildren } from "react";

export default function Accountlayout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
