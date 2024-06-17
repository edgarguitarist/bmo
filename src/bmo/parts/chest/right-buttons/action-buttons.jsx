export default function ActionButtons() {
  const rectangle = {
    width: 0,
    height: 0,
    borderWidth: '0px 30px 50px',
    borderStyle: 'solid',
    borderColor: 'transparent transparent #09d6f0',
    filter: 'drop-shadow(0px 5px 4px #000)',
  };
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full items-center">
      <button style={rectangle} className="-mt-[30%] "></button>
      <button className="bg-[#09f82b] shadow-black shadow-md mt-[40%] ml-[20%] w-[35%] aspect-square rounded-full"></button>
      <button className="bg-[#f70351] shadow-black shadow-md -mt-[70%] ml-[20%] w-[75%] aspect-square rounded-full"></button>
    </div>
  );
}
