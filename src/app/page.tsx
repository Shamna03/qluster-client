import { Animatedtheme } from "@/Components/home/Animatedtheme";
import { Techstacks } from "@/Components/home/Techstacks";
import { Landingpage } from "@/Components/home/Landingpage";
import Navbar from "@/Components/home/Navbar";
import { Feturescard } from "@/Components/home/Futeres";


export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <Landingpage />
       <Animatedtheme/>
       <Techstacks/>
       <Feturescard/>
    
    </div>
  );
}
