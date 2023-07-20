import { NavigateToResource } from "@refinedev/nextjs-router";
import LandingPage from "./landingpage";

export default function Home() {
  // return <NavigateToResource resource="blog_posts" />;
  return <LandingPage />;
}

Home.noLayout = true;
