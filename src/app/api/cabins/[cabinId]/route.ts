import { getBookedDatesByCabinId, getCabin } from "@/lib/data-service";

export async function GET(
  request: Request,
  { params }: { params: { cabinId: string } }
) {
  const { cabinId } = params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(+cabinId),
      getBookedDatesByCabinId(+cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error: any) {
    return Response.json({ message: "Cabin not found" });
  }
}
