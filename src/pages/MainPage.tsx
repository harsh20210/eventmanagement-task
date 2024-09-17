import { Button } from '@mui/material';
import React, { useState } from 'react';
import EventForm from '../components/EventForm';
import Cards from './Cards';

interface JsonData {
  id:string;
  capacity: number;
  date: string ;
  description: string;
  eventName: string;
  location: string;
}

export default function MainPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [allData, setAllData] = useState<JsonData[]>([]);
  const [editData , setEditData ] = useState< JsonData |  null >(null)

  const addInList = (data: JsonData) => {
    if (editData) {
      setAllData((prevEvents) => prevEvents.map((event) => (event.id === editData.id ? { ...event, ...data } : event)));
      setEditData(null);
    } else {
      setAllData([...allData, { ...data, id: Date.now().toString() }]);
    }
  };

  const handleDeleteItem = (id:string) => {
    const deleteItem = allData.filter( v => v.id !== id )
    setAllData(deleteItem)
  }

  const editForm = (data:JsonData) => {
    setEditData(data)
    handleOpen()
    console.log(data);
    
  }

  return (
    <>
      <div className="flex justify-end mr-5">
        <Button variant="contained" size='small' style={{ background: "#64748b" }} onClick={handleOpen}>
          Add Event
        </Button>
      </div>

      <EventForm open={open} handleClose={handleClose} addItem={addInList} defaultValues={editData} />

      <h1 className="text-4xl text-gray-800">All Event</h1>
      <div className='handleCardsSize'>
        {allData.length > 0 &&
          allData.map((item) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={item?.id}>
              <Cards allData={item} deleteItem={handleDeleteItem} editForm={editForm} />
            </div>
          ))}
      </div>
      {allData.length === 0 && <div className="text-red-500">No Data Found</div>}
    </>
  );
}