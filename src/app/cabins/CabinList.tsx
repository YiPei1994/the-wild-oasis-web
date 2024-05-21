import CabinCard from "@/components/CabinCard";
import { getCabins } from "@/lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

type CabinListProps = {
  filter: string;
};

export default async function CabinList({ filter }: CabinListProps) {
  noStore();
  const cabins = await getCabins();
  if (!cabins.length) return null;
  let filtered;
  if (filter === "all") filtered = cabins;
  if (filter === "small")
    filtered = cabins.filter((cabin) => cabin.maxCapacity <= 4);
  if (filter === "mid")
    filtered = cabins.filter(
      (cabin) => cabin.maxCapacity <= 8 && cabin.maxCapacity > 4
    );
  if (filter === "large")
    filtered = cabins.filter((cabin) => cabin.maxCapacity > 8);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filtered?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
