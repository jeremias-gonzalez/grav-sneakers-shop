import Logo from "../Logo/Logo";
import "./loader.css"

export default function Loader() {
  return (
    <div className="flex flex-col justify-center my-20"> 
  <div className="items-center ml-[-4.5rem] mb-[1rem]">
  <Logo/>
  </div> 
    <div class="loader"></div>
  </div>
  );
}