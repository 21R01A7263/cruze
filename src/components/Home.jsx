import Footer from "./Footer";

const Home = () => {
  const cover1 = "Harleys In Hawaii_track_cover";
  const cover2 = "I Remember Everything (feat. Kacey Musgraves)_track_cover";
  const genre1 = "Pop";
  const genre2 = "Indie";
  return (
    <div className="w-full h-screen flex items-center justify-center noisebg">
      <div className="relative w-[85vw] h-[85vh] border-6 rounded-[64px] overflow-hidden border-white">
        
        <Footer />
      </div>
    </div>
  );
};

export default Home;
