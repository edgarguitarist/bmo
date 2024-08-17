import Letters from "../letters";
import Speaker from "../speaker";

export default function LeftSide() {
  return (
    <div className=" flex flex-col bg-[#509284] w-1/4 rounded-2xl">
        <Speaker/>
        <Letters/>
    </div>
  );
}