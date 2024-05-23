import { getCabin, getCabins } from "@/lib/data-service";

import Spinner from "@/components/Spinner";
import { Suspense } from "react";
import Cabin from "./Cabin";
import Reservation from "./Reservation";

export async function generateMetadata({
  params,
}: {
  params: { cabinId: number };
}) {
  const { name } = await getCabin(params.cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function CabinDetail({
  params,
}: {
  params: { cabinId: number };
}) {
  const cabin = await getCabin(params.cabinId);
  const { id, name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />} key={id}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
