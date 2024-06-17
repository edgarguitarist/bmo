import ActionButtons from "./action-buttons";

export default function RightButtons() {
  return (
    <div className="flex flex-row w-1/2 justify-center">
      <span className="w-1/5"></span>
      <div className="flex flex-row w-4/5 justify-center">
        <ActionButtons />
      </div>
    </div>
  );
}
