import Diskette from "./diskette";
import LeftButtons from "./left-buttons/left-buttons";
import RightButtons from "./right-buttons/right-buttons";

export default function Chest() {
  return (
    <div className="w-full h-[40vh] pt-8">
      <Diskette></Diskette>
      <div className="flex h-full">
        <LeftButtons />
        <RightButtons />
      </div>
    </div>
  );
}
