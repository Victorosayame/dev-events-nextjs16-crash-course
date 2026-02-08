//step16 create a dynamic route to display event details based on the slug, this page will fetch the event details from the database using the slug and display it to the user
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import Image from "next/image";
import { notFound } from "next/navigation";
import BookEvent from "./BookEvent";
import EventCards from "./EventCards";
import { cacheLife } from "next/cache";

const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

//create a small reusable component to display the event details
const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => (
  <div className="flex-row-gap-2 items-center">
    <Image 
     src={icon}     
     alt={alt}
     width={17}
     height={17}
    />
    <p>{label}</p>
  </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div key={tag} className="pill">{tag}</div>
    ))}
  </div>
)

const EventDetails = async ({ params }: { params: Promise<string>}) => {
  "use cache"
  cacheLife("hours")
  const  slug  = await params;
  let event;
  try {
     //make a request to the GET route we defined in the api/events/[slug]/route.ts file to fetch the event details using the slug, then display the event details on the page, you can use the same prompt to generate the code or you can use junie to generate the code, both will work just fine, we have tested both and they work just fine, you can choose either one of them to generate the code, we have also added comments to explain the code, you can read the comments to understand the code better, if you have any questions feel free to ask us, we are here to help you.
    const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 60 }
    });

    if(!request.ok) {
      if(request.status === 404) {
        return notFound();
      }
        throw new Error(`Failed to fetch event details: ${request.statusText}`);
    }

    const response = await request.json();
    event = response.event;

    if (!event) {
      return notFound();
    }
    
  } catch (error) {
    console.error("Error fetching event details:", error);
    return notFound();
  }
  const {description, image, overview, date, time, location, mode,agenda, audience, organizer,tags } = event;

  if (!description) return notFound(); 

  const bookings = 10; //replace this with the actual number of bookings for the event, you can fetch this data from the database or you can calculate it based on the number of bookings for the event, we have hardcoded it for now just to display it on the page, you can replace it with the actual data later on

  //step19 call sever actions to fetch similar event,with sever actions we can fetch the data directly without making an API call, this is one of the advantages of using server actions, you can read more about server actions in the official documentation, we have also added comments to explain the code, you can read the comments to understand the code better, if you have any questions feel free to ask us, we are here to help you.
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">

        <div className="content">
          <Image 
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="Date" label={date} />
            <EventDetailItem icon="/icons/clock.svg" alt="time" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="Location" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="Audience" label={audience} />
          </section>

          {/**we parse the data as it is coming stringified */}
          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>
        
        <aside className="booking">
         <div className="signup-card">
          <h2>Book Your Spot</h2>
          {bookings > 0 ? (
            <p className="text-sm">
              Join {bookings} people who have already bookeded their spot!
            </p>
          ): (<p className="text-sm">Be the first to book your spot!</p>)}
            
            {/**step24 add eventid and slug */}
          <BookEvent eventId={event._id} slug={event.slug} />
          
         </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
            <EventCards key={similarEvent.title} {...similarEvent} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventDetails