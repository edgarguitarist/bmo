import Eyes from "./eyes";
import Mouth from "./mouth";

export default function Face() {
  return (
    <div className="bg-[#cefeda] w-full h-[50vh] border-2 border-black rounded-2xl justify-evenly flex flex-col">
      <Eyes></Eyes>
      <Mouth></Mouth>
    </div>
  );
}
