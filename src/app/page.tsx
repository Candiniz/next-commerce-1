import Footer from "./components/Footer";
import { fetchProducts } from "./actions";
import InfiniteScroll from "./components/InfiniteScroll";




export default async function Home() {

  const { formatedProducts } = await fetchProducts({});


  return (
    <>
      <div className="w-full flex items-center">
          <video
            src="/mainvideo1.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: 'auto' }}
          />
      </div>
      <div className="text-gray-300 container bg-slate-600 min-h-screen mx-auto pt-8 px-8 xl:px-0 w-2/3">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lx:gap-6 px-[1%]">

          <InfiniteScroll initialProducts={formatedProducts} />

        </div>
      </div>
      <Footer />
    </>
  );
}
