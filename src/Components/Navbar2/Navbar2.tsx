import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
const Navbar2 = () => {

    const [dropDownCategory, setDropDownCategory] = useState(false);

    const handDropDown = () => {
        setDropDownCategory(!dropDownCategory);
      }; 

  return (
    <div>
        <div className=" Catagories_list flex flex-col sm:flex-row justify-start sm:justify-center items-start sm:items-center min-h-[45px] mt-[12px] border-t border-b border-gray-300 text-[13px] px-4 py-2 sm:py-0 sm:px-6 overflow-x-auto">
        {/* Categories Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer mb-2 sm:mb-0 whitespace-nowrap">
        <p className="text-sm sm:text-base font-bold">ALL CATEGORIES</p>
        <FontAwesomeIcon 
            icon={dropDownCategory ? faChevronUp : faChevronDown} 
            className="text-[#002f34] cursor-pointer text-lg sm:text-[22px]"
            onClick={handDropDown}
        />
        </div>

        {/* Categories List */}
        <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
        <ul className="cattegori_list flex gap-4 sm:gap-5 lg:gap-8 text-xs sm:text-sm font-medium whitespace-nowrap ml-0 sm:ml-6">
            <li className="cursor-pointer hover:text-[#002f34]">Cars</li>
            <li className="cursor-pointer hover:text-[#002f34]">Motorcycles</li>
            <li className="cursor-pointer hover:text-[#002f34]">Mobile Phones</li>
            <li className="hidden sm:block cursor-pointer hover:text-[#002f34]">For Sale: Houses & Apartments</li>
            <li className="cursor-pointer hover:text-[#002f34]">Scooters</li>
            <li className="hidden md:block cursor-pointer hover:text-[#002f34]">Commercial & Other Vehicles</li>
            <li className="hidden lg:block cursor-pointer hover:text-[#002f34]">For Rent: Houses & Apartments</li>
        </ul>
        </div>

        {/* Mobile View More Categories */}
        <div className="sm:hidden flex items-center justify-center w-full mt-2">
        <button 
            className="text-[#002f34] text-sm font-medium border border-[#002f34] rounded px-3 py-1"
            onClick={handDropDown}
        >
            More Categories
        </button>
        </div>
    </div>
    </div>
  )
}

export default Navbar2
