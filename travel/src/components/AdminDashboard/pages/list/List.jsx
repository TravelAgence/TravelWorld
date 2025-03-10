import "./list.scss";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import Datatable from "../../datatable/Datatable";

const List2 = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable/> 
      </div>
    </div>
  );
};

export default List2;