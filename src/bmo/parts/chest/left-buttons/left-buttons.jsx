import DPad from "./d-pad";
import SelectStartButtons from "./select-start-buttons";

export default function LeftButtons() {
  return (
    <div className="flex flex-col w-1/2 h-full">
      <div className="flex flex-col w-3/5 h-full justify-evenly items-center">
        <DPad />
        <SelectStartButtons />
      </div>
    </div>
  );
}
