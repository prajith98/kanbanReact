import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {v4 as uuid} from "uuid";
import img1 from './img1.jpeg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import "./app.css"
const itemsFromBackend = [
  { id: uuid(), content: <img className="photo" src="https://overcomingms.org/sites/default/files/styles/916x648/public/2018-08/Chapatis.jpg?itok=z4jO3xeJ" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://curlytales.com/wp-content/uploads/2018/08/WhatsApp-Image-2018-08-07-at-19.14.14.jpeg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://www.telegraph.co.uk/content/dam/news/2018/10/01/happy-meal-and-toy-mcdonalds-38805086-650-366_trans_NvBQzQNjv4BqRp36Ti1MFCYr8PMuS2fHb42zSCk40V0xZdii7Iff1tY.jpg?imwidth=900" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/p90378219-highres-1575322323.jpg?crop=1.00xw:0.752xh;0,0.139xh&resize=640:*" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://img.etimg.com/thumb/width-640,height-480,imgsize-854852,resizemode-1,msid-72473282/mercedes-benz-cars-to-be-pricier-by-up-to-3-from-january-2020.jpg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://gaadiwaadi.com/wp-content/uploads/2017/09/Honda-City-Custom-1.jpg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzWOw9TsRhG3U3qtkkqPG8WGTHqADE3Td5y_1NqtNdR2TRodiF&usqp=CAU" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://static.acer.com/up/Resource/Acer/Predator/Thronos/ThronosImage/20181227/Immersion_large.jpg" alt="smileyface"/> },

];
const itemsFromBackend1 = [
  { id: uuid(), content: <img className="photo" src="https://cdn.images.express.co.uk/img/dynamic/143/590x/PS4-console-update-cross-play-1186023.webp?r=1570273145734" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://st1.bgr.in/wp-content/uploads/2015/07/samsung-galaxy-s5-price-drop1.jpg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://www.stuff.tv/sites/stuff.tv/files/brands/Apple/iPhone11handson/iphone-11-vs-iphone-x.jpg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://static.hub.91mobiles.com/wp-content/uploads/2017/08/JioPhone-leak-FB-new.jpg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src={img3} alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src={img1} alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src={img2} alt="smileyface"/> },
];
const columnsFromBackend = {
  [uuid()]: {
    name: "List ",
    items: itemsFromBackend1
  },
  [uuid()]: {
    name: "Needs",
    items: []
  },
  [uuid()]: {
    name: "Wants",
    items: []
  },
  [uuid()]: {
    name: "Luxury",
    items: []
  },
  [uuid()]: {
    name: "List",
    items: itemsFromBackend
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "300%" ,zIndex:-1,backgroundBlendMode: 'screen' ,backgroundImage:`linear-gradient(rgba(255,255,255,.8),rgba(255,255,255,.8)), url("https://st2.depositphotos.com/3102403/10890/v/950/depositphotos_108905520-stock-illustration-thin-line-finance-money-banking.jpg")`}}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 20 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightgrey"
                            : "#f9f9f9",
                          borderWidth:1,
                          padding: 4,
                          width: 230,
                          minHeight: 700
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "grey"
                                        : "#f9f9f9",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
