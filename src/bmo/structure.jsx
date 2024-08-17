import Face from "./parts/face/face";
import Chest from "./parts/chest/chest";
import LeftSide from "./parts/sides/left-side/left-side";
import RightSide from "./parts/sides/right-side/right-side";
export default function Structure() {
  return (
    <div className="flex flex-row h-screen justify-center">
      <LeftSide/>
      <div className="bg-[#58b09a] w-2/5 p-12 flex flex-col justify-start rounded-2xl">
        <Face />
        <Chest/>
      </div>
      <RightSide/>
    </div>
  );
}
