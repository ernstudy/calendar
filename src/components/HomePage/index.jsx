import { Container } from "@mui/material";
import RecentEvents from "./RecentEvents/RecentEvents";
import HomeCalendar from "./HomeCalendar/HomeCalendar";
import EventModal from "../EventModal/EventModal";

export default function index() {
  return (
    <>
      <Container maxWidth="lg" className="home-container">
        <HomeCalendar />

        <RecentEvents />
        <EventModal />
      </Container>
    </>
  );
}
