export default function DPad() {
  const shadow = {
    filter: 'drop-shadow(0px 5px 4px #000)',
  }
  return (
    <div style={shadow} className="grid grid-cols-3 grid-rows-3 w-fit">
      <span></span>
      <button className="w-[30px] h-[30px] bg-[#fdd621] hover:bg-[#efd254] border border-x-black border-t-black border-b-[#fdd621]"></button>
      <span></span>
      <button className="w-[30px] bg-[#fdd621] border border-y-black border-l-black border-r-[#fdd621]"></button>
      <span className="w-[30px] bg-[#fdd621] z-20"></span>
      <button className="w-[30px] bg-[#fdd621] border border-y-black border-r-black border-l-[#fdd621]"></button>
      <span></span>
      <button className="w-[30px] bg-[#fdd621] border border-x-black border-b-black border-t-[#fdd621]"></button>
      <span></span>
    </div>
  );
}
