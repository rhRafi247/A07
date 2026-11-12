import AllProduct from "@/component/AllProduct";
import HomeBanner from "@/component/HomeBanner";
import PriceDropped from "@/component/PriceDropped";
import PriceIncreased from "@/component/PriceIncreased";


export default function Home() {
  return (
    <div>
      <HomeBanner/>
      <PriceIncreased/>
      <PriceDropped/>
      <AllProduct/>
    </div>
  );
}
