import { Animatedtheme } from "@/Components/home/Animatedtheme";
import { Techstacks } from "@/Components/home/Techstacks";
import { Landingpage } from "@/Components/home/Landingpage";
import Navbar from "@/Components/home/Navbar";
import { Feturescard } from "@/Components/home/Futeres";
import Footer from "@/Components/home/Footer";


export default function Home() {
  return (
    <div className="bg-white dark:bg-[#18181b]">
      <Navbar />
      <Landingpage />
       <Animatedtheme/>
       <Techstacks/>
       {/* <Feturescard/> */}
       <Footer/>
    
    </div>
  );
}
