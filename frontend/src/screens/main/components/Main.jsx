import React, {useEffect, useState} from 'react'
import manageStates from '../helpers/manageStates'
import columnsFromBackend from '../helpers/columnsFromBackend'
import onDragEnd from '../helpers/onDragEnd'
import './main.css';
import DndContext from './DndContext'


function Main(props) {
  const [activities, setActivities] = useState([])
  // console.log("acts",activities)

  const [columns, setColumns] = useState(columnsFromBackend(activities));
  const [days,setDays] =useState(0)

  // console.log('columns',columns)
  
  const city = props.match.params.city
  let mybudget = props.match.params.budget
  
  const [totalCost, setTotalCost] = useState(0);
  const [budget, setBudget] = useState(mybudget-totalCost);

  useEffect(()=>{
    manageStates(city, setActivities, setColumns, columnsFromBackend, budget, setDays)
  },[city])

  // useEffect(()=>{
  //   let newState = {...columns};
  //   newState['list'].items = activities
  //   const delay = setTimeout(()=>{
  //     setColumns(newState)
  //   },500)
  //   return () => {                                                               // 
  //     clearTimeout(delay);
  //   };
  // },[columns['list'].items])

  useEffect(()=>{
    let total = 0;
    for (let column in columns) {
      if (column !== 'list')
      total += columns[column].total
    }
    setTotalCost(total)
 
  },[columns])

  useEffect(()=>{
    setBudget(mybudget-totalCost)
  },[totalCost])

  console.log('totalCost state: ', totalCost)

  return (
  <>
    <h1>Destination: {city}</h1>
    {!isNaN(budget)?
      <div> 
      <h1>My Budget: ${budget}</h1>
      <h1>Numbe of Days: {days}</h1>
      </div>:
      ""}
    
    <div className='container-1'>
      <DndContext
        className='container-6'
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
        columns={columns} setColumns={setColumns}
        totalCost={totalCost}
        setTotalCost={setTotalCost}
      />
    </div>
  </>
  );
}

export default Main;