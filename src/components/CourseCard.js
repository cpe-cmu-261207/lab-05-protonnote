import { useContext , useState } from "react";
import { CardContext } from "../App";

const CourseCard = (props) => {
    const { dispatch } = useContext(CardContext);
    return ( props.myTable.map (objj => {
      return (
        <div className="bg-blue-300 p-5 rounded-3xl m-3">
          <td className="w-full">
            <div>
              <h3 className="text-2xl">วิชา : {objj.name}</h3>
              <h3 className="text-2xl">รหัสวิชา : {objj.code}</h3>
              <h3 className="text-2xl">หน่วยกิจ : {objj.credit}</h3>
              <h3 className="text-2xl">เกรด : {objj.gpa}</h3>
            </div>
          </td>
        <td>
          <button className="bg-blue-500 hover:bg-blue-700 object-right-top p-2 rounded-3xl "  onClick = {() => {
            dispatch({
              type: "DELETE",
              payload: objj.time,
            });
          }}>{'\u2716'}</button>
        </td>
      </div>
      )}));
};

export default CourseCard;
