import "./list.scss"
import Sidebar from "../../sidebar/Sidebar"
import Navbar from "../../navbar/Navbar"
import Datatable from "../../datatable/Datatable"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List