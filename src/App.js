import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {v4 as uuid} from "uuid";
import img1 from './img1.jpeg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import "./app.css"
const itemsFromBackend = [
  { id: uuid(), content: <img className="photo" src="https://overcomingms.org/sites/default/files/styles/916x648/public/2018-08/Chapatis.jpg?itok=z4jO3xeJ" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://www.telegraph.co.uk/content/dam/news/2018/10/01/happy-meal-and-toy-mcdonalds-38805086-650-366_trans_NvBQzQNjv4BqRp36Ti1MFCYr8PMuS2fHb42zSCk40V0xZdii7Iff1tY.jpg?imwidth=900" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://curlytales.com/wp-content/uploads/2018/08/WhatsApp-Image-2018-08-07-at-19.14.14.jpeg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tata-Nano/1735/1563258193189/front-left-side-47.jpg?tr=h-140" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://static.cablo.cab/uploads//cabImage/cabImage_20180925_1d874956469.jpg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://cdn-ds.com/blogs-media/sites/178/2018/11/12085959/2019-MB-AMG-GT-exterior-front-fascia-going-fast-on-blurred-road_o-1038x375.jpg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzWOw9TsRhG3U3qtkkqPG8WGTHqADE3Td5y_1NqtNdR2TRodiF&usqp=CAU" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://cdn.images.express.co.uk/img/dynamic/143/590x/PS4-console-update-cross-play-1186023.webp?r=1570273145734" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://static.acer.com/up/Resource/Acer/Predator/Thronos/ThronosImage/20181227/Immersion_large.jpg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://static.hub.91mobiles.com/wp-content/uploads/2017/08/JioPhone-leak-FB-new.jpg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://st1.bgr.in/wp-content/uploads/2015/07/samsung-galaxy-s5-price-drop1.jpg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src="https://i.ytimg.com/vi/HjDU5gd8pvc/maxresdefault.jpg" alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src={img1} alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src={img2} alt="smileyface"/> },
  { id: uuid(), content: <img className="photo" src={img3} alt="smileyface"/> },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "List",
    items: itemsFromBackend
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
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
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
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "darkgrey"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
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
                                        : "black",
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