import Link from "next/link";

const unitBangla = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  dozen: "ডজন",
  hali: "হালি",
  gm: "গ্রাম",
};

function ProductCard({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
      {items.map((i) => {
        const isUp = i.change?.dir === "up";
        const isDown = i.change?.dir === "down";

        return (
          <Link key={i.id} href={`/product-details/${i.id}`}>
            <div
              key={i.id}
              className="p-4 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.1)] bg-white flex flex-col justify-between"
            >
              {/* উপরের অংশ */}
              <div className="flex gap-4 items-start">
                <span className="bg-gray-100 w-12.5 h-12.5 flex justify-center items-center text-[25px] rounded-2xl shrink-0">
                  {i.image}
                </span>
                <div>
                  <h1 className="text-2xl font-bold">
                    {i.nameBn || i.categoryNameBn}
                  </h1>
                  <div>
                    <p className="text-gray-500 text-sm">
                      প্রতি {unitBangla[i.unit] || i.unit}
                    </p>
                  </div>
                </div>
              </div>

              {/* নিচের অংশ: আজকের দাম এবং পার্সেন্টেজ ব্যাজ */}
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-500">আজকের দাম</p>
                  <h1 className="font-bold">
                    <span className="text-2xl font-bold">
                      {Number(i.today).toLocaleString("bn-BD")}
                    </span>{" "}
                    টাকা
                  </h1>
                </div>

                {/* পার্সেন্টেজ ব্যাজ */}
                {i.change && (
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span className="text-[10px]">
                      {isUp ? "▲" : isDown ? "▼" : "•"}
                    </span>
                    <span>
                      {Math.abs(Number(i.change.pct)).toLocaleString("bn-BD")}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductCard;
