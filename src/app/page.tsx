import { Techstacks } from "@/Components/home/Techstacks";
import { Landingpage } from "@/Components/home/Landingpage";
import Navbar from "@/Components/home/Navbar";
import { Feturescard } from "@/Components/home/Futeres";
import Footer from "@/Components/home/Footer";
import { FeaturesSection } from "@/Components/home/Features";


export default function Home() {
  return (
    <div className="bg-white dark:bg-[#18181b]">
      <Landingpage />
       <Techstacks/>
       <FeaturesSection/>
    
    </div>
  );
}
