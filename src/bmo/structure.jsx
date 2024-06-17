import Face from "./parts/face/face";
import Chest from "./parts/chest/chest";
export default function Structure() {
  return (
    <div className="flex flex-row h-screen justify-center">
      <div id="left-arm" className="bg-[#509284] w-1/4 rounded-2xl"></div>
      <div className="bg-[#58b09a] w-2/5 p-12 flex flex-col justify-start rounded-2xl">
        <Face />
        <Chest/>
      </div>
      <div id="rigth-arm" className="bg-[#509284] w-1/4 rounded-2xl"></div>
    </div>
  );
}
