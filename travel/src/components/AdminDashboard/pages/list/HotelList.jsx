import "./list.scss";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import HotelDatatable from "../../hotel/Hotel"; // Import the HotelDatatable component

const HotelList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <HotelDatatable /> 
      </div>
    </div>
  );
};

export default HotelList;