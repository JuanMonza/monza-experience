import BootLoader from "@/components/experience/BootLoader";
import CityJourney from "@/components/experience/CityJourney";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/layout/Navbar";
import ProjectArchive from "@/components/projects/ProjectArchive";

export default function Home() {
  return (
    <>
      <BootLoader />

      <Navbar />

      <Hero />

      <CityJourney />
      <ProjectArchive />
    </>
  );
}
