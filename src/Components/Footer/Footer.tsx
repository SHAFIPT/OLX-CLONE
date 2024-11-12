import faceBook from '../../assets/facebook_icon.png'
import instagram from '../../assets/instagram_icon.png'
import twitter from '../../assets/twitter_icon.png'
import youTube from '../../assets/youtube_icon.png'
import playstore from '../../assets/playstore.webp'
import appstore from '../../assets/appstore.webp'
import './Footer.css'
import Cartview from '../../assets/cartrade_tech.svg'
import Olx from '../../assets/olx.svg'
import carWale from '../../assets/carwale.svg'
import bikeWale from '../../assets/bikewale.svg'
import carTrade from '../../assets/cartrade.svg'
import mobility from '../../assets/mobility.svg'


const Footer = () => {
  return (
    <div>
      <div className="footer bg-gray-200 p-4 md:p-6">
        {/* Popular Locations Section */}
        <div className="footer_P mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          <p className="font-semibold text-sm md:text-base">POPULAR LOCATIONS</p>
          <p className="font-semibold text-sm md:text-base">TRENDING LOCATIONS</p>
          <p className="font-semibold text-sm md:text-base">ABOUT US</p>
          <p className="font-semibold text-sm md:text-base">OLX</p>
          <p className="font-semibold text-sm md:text-base">FOLLOW US</p>
        </div>

        {/* Footer Links Section */}
        <div className="footer_li grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          <div>
            <ul className="space-y-2 text-xs md:text-sm text-[#557477]">
              <li className="hover:text-gray-800">Kolkata</li>
              <li className="hover:text-gray-800">Mumbai</li>
              <li className="hover:text-gray-800">Chennai</li>
              <li className="hover:text-gray-800">Pune</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-xs md:text-sm text-[#557477]">
              <li className="hover:text-gray-800">Bhubaneshwar</li>
              <li className="hover:text-gray-800">Hyderabad</li>
              <li className="hover:text-gray-800">Chandigarh</li>
              <li className="hover:text-gray-800">Nashik</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-xs md:text-sm text-[#557477]">
              <li className="hover:text-gray-800">Tech@OLX</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-xs md:text-sm text-[#557477]">
              <li className="hover:text-gray-800">Blog</li>
              <li className="hover:text-gray-800">Help</li>
              <li className="hover:text-gray-800">SiteMap</li>
              <li className="hover:text-gray-800">Legal & Privacy information</li>
              <li className="hover:text-gray-800">Vulnerability Disclosure Program</li>
            </ul>
          </div>
          
          {/* Social Media and App Store Links */}
          <div className="col-span-2 md:col-span-1">
            <ul className="flex gap-3 md:gap-4">
              <li><img src={faceBook} alt="Facebook" className="w-6 h-6 md:w-8 md:h-8" /></li>
              <li><img src={instagram} alt="Instagram" className="w-6 h-6 md:w-8 md:h-8" /></li>
              <li><img src={twitter} alt="Twitter" className="w-6 h-6 md:w-8 md:h-8" /></li>
              <li><img src={youTube} alt="LinkedIn" className="w-6 h-6 md:w-8 md:h-8" /></li>
            </ul>
            <div className="mt-6 md:mt-12">
              <ul className="flex gap-2 md:gap-4">
                <li>
                  <img src={playstore} alt="Play Store" className="w-32 md:w-36 h-auto" />
                </li>
                <li>
                  <img src={appstore} alt="App Store" className="w-32 md:w-36 h-auto" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Logos */}
      <div className="last_footebar bg-[#002f34] w-full p-3 md:p-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-6">
          <img src={Cartview} alt="" className="w-[100px] md:w-[150px]" />
          <div className="hidden md:block border-[1px] border-white h-16 md:h-20" />
          <img src={Olx} alt="" className="w-[40px] md:w-[60px]" />
          <img src={carWale} alt="" className="w-[100px] md:w-[130px]" />
          <img src={bikeWale} alt="" className="w-[100px] md:w-[130px]" />
          <img src={carTrade} alt="" className="w-[100px] md:w-[130px]" />
          <img src={mobility} alt="" className="w-[100px] md:w-[130px]" />
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="last_text bg-[#002f34] text-white p-3 md:p-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[12px] space-y-2 md:space-y-0">
          <h1>help-Sitemap</h1>
          <h1>All rights reserved © 2006-2024 OLX</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
