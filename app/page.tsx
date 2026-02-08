import EventCards from "@/components/EventCards"
import ExploreBtn from "@/components/ExploreBtn"
import { IEvent } from "@/database";
import { fetchAllEvents } from "@/lib/actions/event.actions";
import { cacheLife } from "next/cache";



//step6 create event arrays, use data from constants and get rid of hardcoded data,usually this data comes from a database or api

const page = async () => {
  //step21 add the use cache control header to the fetch request to cache the response for 1 hour.
  "use cache";
  cacheLife("hours")

  //step14 we want to fetch the events from the database and display them on the homepage, you can use the same prompt to generate the code or you can use junie to generate the code, both will work just fine, we have tested both and they work just fine, you can choose either one of them to generate the code, we have also added comments to explain the code, you can read the comments to understand the code better, if you have any questions feel free to ask us, we are here to help you. make your page async and fetch the events from the database using the GET route we defined in the api/events/route.ts file, then pass the events to the EventCards component to display them on the homepage

  // const response = await fetch(`${BASE_URL}/api/events`);
  // //detsructure the response to get the events from the data
  // const { events } = await response.json();
  const events = await fetchAllEvents() as unknown as IEvent[];

  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br /> Event You Can not Miss</h1>
      <p className='text-center mt-5'>Hackathons, Conferences, Meetups, All in One Place</p>

      <ExploreBtn />

      <div  className="mt-20 space-x-7">
        <h3>Featured Events</h3>

        <ul className="events mt-5">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event.title} className="list-none">
              <EventCards {...event}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page