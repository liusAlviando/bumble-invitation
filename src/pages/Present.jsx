import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import logo_bca from '../assets/logo-bca.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

const Present = () => {
  const { setPageTitle } = useOutletContext();
  const parentRef = useRef(null);
  const [copied, setCopied] = useState(null);
  useEffect(() => {
    // setPageTitle('Gift');
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500); // reset after 1.5s
  };

  return (
    <div className="">
    <div className="relative px-4 py-8 bg-primary rounded-2xl overflow-hidden shadow-lg">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply opacity-30 -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply opacity-30 translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Your love and laughter are the <span className="font-semibold">best gifts</span> we could ever receive.
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Should you wish to honor us with a token of affection, you may do so through:
      </p>

      <div className="flex cursor-pointer items-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300" onClick={() => handleCopy('8161101753')}>
        <img className="w-11 h-11 rounded-full" src={logo_bca} alt="BCA Logo" />
        <div className="ml-4">
          <div className="text-sm font-semibold text-gray-800">Lius Alviando</div>
          <p className="text-sm tracking-wider text-gray-500" style={{ letterSpacing: '2px' }}>8161101753 {copied == '8161101753' ? <FontAwesomeIcon icon={faCheck} ></FontAwesomeIcon> : <FontAwesomeIcon icon={faCopy} ></FontAwesomeIcon>} </p>
        </div>
      </div>
      <div className="flex items-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 mt-5 cursor-pointer" onClick={() => handleCopy('8162665757')}>
        <img className="w-11 h-11 rounded-full" src={logo_bca} alt="BCA Logo" />
        <div className="ml-4">
          <div className="text-sm font-semibold text-gray-800">Yohana Merina</div>
          <p className="text-sm tracking-wider text-gray-500" style={{ letterSpacing: '2px' }}>8162665757 {copied == '8162665757' ? <FontAwesomeIcon icon={faCheck} ></FontAwesomeIcon> : <FontAwesomeIcon icon={faCopy} ></FontAwesomeIcon>} </p>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Present;
