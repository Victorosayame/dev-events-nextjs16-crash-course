import EventDetails from "@/components/EventDetails";
import { Suspense } from "react";



const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  //step26
  const slug = params.then((p) => p.slug);
 
 return (
  <main>
    <Suspense fallback={<div className="loading">Loading event details...</div>}>
      <EventDetails params={slug} />
    </Suspense>
  </main>
 )
}

export default EventDetailsPage