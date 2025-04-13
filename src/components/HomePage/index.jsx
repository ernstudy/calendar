import { Container } from "@mui/material";
import RecentEvents from "./RecentEvents/RecentEvents";
import HomeCalendar from "./HomeCalendar/HomeCalendar";

export default function index() {
  return (
    <Container maxWidth="lg" className="home-container">
      <HomeCalendar />

      <RecentEvents />
    </Container>
  );
}
