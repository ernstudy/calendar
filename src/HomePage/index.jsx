import { Container } from "@mui/material";
import RecentEvents from "./RecentEvents/RecentEvents";
import HomeStyle from "./HomePage.module.css";
import EventModal from "../components/EventModal/EventModal";
import HomeCalendar from "./HomeCalendar/HomeCalendar";
import Logo from "../utils/Logo/Logo";
export default function index() {
  return (
    <>
      <Container maxWidth="lg">
        <div className={HomeStyle.logoBox}>
          <Logo />
        </div>
        <div className={HomeStyle.container}>
          <HomeCalendar />

          <RecentEvents />
          <EventModal />
        </div>
      </Container>
    </>
  );
}
