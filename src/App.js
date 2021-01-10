import { createContext, useEffect, useReducer,useState } from "react";
import CourseCard from "./components/CourseCard";
import CourseForm from "./components/CourseForm";

export const CardContext = createContext({});



function App() {
  const initialState = {myTable: []}
  const [GPA, setGPA] = useState(0.00);

  function reducer(state, action) {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          myTable: [...state.myTable, action.payload],
        };
      case "SET":
        return {
          ...state,
          myTable: action.payload,
        };
      case "DELETE":
        return {
          ...state,
          myTable: state.myTable.filter((objj) => objj.time !== action.payload),
        };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchTodos() {
    const localTodos = localStorage.getItem("myTable");
    if (localTodos) {
      dispatch({
        type: "SET",
        payload: JSON.parse(localTodos),
      });
    }
    cal_GPA(localTodos)
  }

  function cal_GPA(cc){
    var cal_gpa = 0
    var cal_cre = 0
    if (cc.length != 0 && cc) {
      cc.forEach((obj) => {
      cal_gpa += obj.gpa_num * obj.credit
      cal_cre += obj.credit
      })
      setGPA(cal_gpa/cal_cre)
    }
    else {
      setGPA(0.00)
    }
    
  }

  useEffect(fetchTodos, []);

  useEffect(() => {
    localStorage.setItem("myTable", JSON.stringify(state.myTable));
  }, [state.myTable]); 



  return (
    <CardContext.Provider value={{ state, dispatch }}>
      <div className="container mx-auto h-screen">
        <h1 className="text-4xl py-3 text-center">Todos</h1>

        <CourseCard myTable ={state.myTable} />

        <CourseForm />
      </div>
      <div>
        <h2>{GPA.toFixed(2)}</h2>
      </div>
    </CardContext.Provider>
  
  );
}

export default App;
