import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import logo_bca from '../assets/logo-bca.png';

const Present = () => {
  const { setPageTitle } = useOutletContext();
  const parentRef = useRef(null);

  useEffect(() => {
    // setPageTitle('Gift');
  }, []);

  return (
    <div className="">
    <div className="relative px-4 py-8 bg-primary rounded-2xl overflow-hidden shadow-lg">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply opacity-30 -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply opacity-30 translate-x-1/4 translate-y-1/4"></div>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Your love and laughter are the <span className="font-semibold">best gifts</span> we could ever receive.
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Should you wish to honor us with a token of affection, you may do so through:
      </p>

      <div className="flex items-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
        <img className="w-21 h-21 rounded-full" src={logo_bca} alt="BCA Logo" />
        <div className="ml-4">
          <div className="text-md font-semibold text-gray-800">Yohana Merina</div>
          <p className="text-sm tracking-wider text-gray-500" style={{ letterSpacing: '2px' }}>1234123412</p>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Present;
