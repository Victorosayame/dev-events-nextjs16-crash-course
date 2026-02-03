import EventCards from "@/components/EventCards"
import ExploreBtn from "@/components/ExploreBtn"
import { events } from "@/lib/constants/constants"


//step6 create event arrays, use data from constants and get rid of hardcoded data,usually this data comes from a database or api

const page = () => {
  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br /> Event You Can not Miss</h1>
      <p className='text-center mt-5'>Hackathons, Conferences, Meetups, All in One Place</p>

      <ExploreBtn />

      <div  className="mt-20 space-x-7">
        <h3>Featured Events</h3>

        <ul className="events mt-5">
          {events.map((event) => (
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