//  const handleSearch = async () => {
//   try {
//     const response = await axios.get(
//       `http://localhost:3001/api/products/search?query=${query}`
//     );

//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };

import React, { useState, useEffect, useCallback } from "react"; // Use useCallback to ensure function stability
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Header() {
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2620&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2672&q=80",
    },
  ];

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000); // Change slide every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [nextSlide]); // Include nextSlide in the dependency array

  const slideVariants = {
    initial: { opacity: 0.7, scale: 1 },
    animate: { opacity: 1, scale: 1.05 },
    exit: { opacity: 0.5, scale: 0.95 },
  };

  return (
    <div className="max-w-full mt-10 h-[480px] w-full items-center mb-20 py-4 relative group">
      <motion.div
        key={currentIndex}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideVariants}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(255,255,255,0.2)), url(${slides[currentIndex].url})`,
        }}
        className="w-full flex flex-col justify-center items-center text-center h-full bg-center bg-cover"
      >
        <TypeAnimation
          sequence={["this is my blog \n app", 1500, "explore  \n now", 1500]}
          wrapper="h2"
          speed={50}
          style={{ whiteSpace: "pre-line", height: "195px", display: "block" }}
          className="font-bold text-white sm:text-[48px] text-[40px] leading-[56.8px] font-poppins"
          repeat={2}
        />

        <div className="relative">
          <Link to={`/?query=${query}`} className="link">
            <div className="absolute top-0  mt-3 text-2xl bottom-0 w-6 h-6 my-auto text-gray-400  left-3">
              <FaSearch />
            </div>
          </Link>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blogs..."
            className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          />
        </div>
      </motion.div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 border-radius text-2xl rounded-full  bg-gray-100 opacity-30 text-gray-100  cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>

      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full  bg-gray-100 opacity-30 text-gray-100 cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>

      {/* Navigation Dots */}
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-4xl hover:text-6xl text-slate-300 cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
