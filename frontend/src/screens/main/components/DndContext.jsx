import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import CardList from './CardList'
import addCardList from '../helpers/addCardList'
import deleteList from '../helpers/deleteList'


const DndContext = (props) => {
  return (
    <DragDropContext
      onDragEnd={props.onDragEnd}>
      {Object.entries(props.columns).map(([columnId, column], index) => {
        return (
          <div
          className='container-2'
            key={columnId}
          >
            <h2>{column.name}</h2>
            <div className='container-3'>
              <CardList 
              droppableId={columnId} 
              key={columnId}
              columnId={columnId}
              column={column}
              columns={props.columns}
              setColumns={props.setColumns}
              totalCost={props.totalCost}
              setTotalCost={props.setTotalCost}
              />
            </div>
            {columnId!=='list'? <button className='delete-list' onClick={()=>deleteList(columnId, props.columns, props.setColumns)}>delete</button>:""}
          </div>
        );
      })}
      <button className='add-list' onClick={(()=>{addCardList(props.columns, props.setColumns)})} >+</button>
   </DragDropContext>
  );
};

export default DndContext;