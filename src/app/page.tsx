import { Techstacks } from "@/Components/home/Techstacks";
import { Landingpage } from "@/Components/home/Landingpage";
import { Feturescard } from "@/Components/home/Futeres";
import { FeaturesSection } from "@/Components/home/Features";

const Home = () => {
  return (
    <div className="bg-white dark:bg-[#18181b]">
      <Landingpage />
      <Techstacks />
      <FeaturesSection />
      <Feturescard />
    </div>
  );
};
export default Home;
