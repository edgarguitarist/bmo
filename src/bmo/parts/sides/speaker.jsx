export default function Speaker() {
    const holeSize = "w-[40%]";

    return (
        <div className="grid grid-cols-5 grid-rows-3 w-[90%] h-[35%] justify-items-center items-center mx-auto mt-10 mb-6">
            <span></span>
            <div className={holeSize + ' aspect-square rounded-full bg-black'}></div>
            <span></span>
            <div className={holeSize + ' aspect-square rounded-full bg-black'}></div>
            <span></span>
            <div className={holeSize + ' aspect-square rounded-full bg-black'}></div>
            <span></span>
            <div className={holeSize + ' aspect-square rounded-full bg-black'}></div>
            <span></span>
            <div className={holeSize + ' aspect-square rounded-full bg-black'}></div>
            <span></span>
            <div className={holeSize + ' aspect-square rounded-full bg-black'}></div>
            <span></span>
            <div className={holeSize + ' aspect-square rounded-full bg-black'}></div>
            <span></span>
        </div>
    )
}