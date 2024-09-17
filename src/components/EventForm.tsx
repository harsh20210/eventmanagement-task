import { useForm } from "react-hook-form";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
};

interface JsonData {
  id:string;
  capacity: number;
  date: string;
  description: string;
  eventName: string;
  location: string;
}

interface PropsData {
  open:boolean
  handleClose: () => void
  addItem: (data:JsonData) => void 
  defaultValues?:JsonData | null
}

const EventForm = ({ open, handleClose , addItem , defaultValues } : PropsData) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<JsonData>({
    defaultValues: defaultValues || { eventName: '', date: '', location: '', description: '', capacity: 0 },
  });
  


  const handleInputChnage = (data:JsonData) => {
    const addData = {
      ...data,
      id:uuidv4()
    }
    addItem(addData)
    reset();
    handleClose()
  }
  
  

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);  // Reset the form with new default values
    }
  }, [defaultValues, reset]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div
            style={{
              background: "#64748b",
              fontWeight: "600",
              fontSize: "14px",
              color: "#fff",
              padding: "8px",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h6">
              Create or Edit Event
            </Typography>
          </div>
          <form
            onSubmit={handleSubmit(handleInputChnage)}
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
              padding: "8px",
              gap: "20px",
            }}
          >
            <input
              style={{ height: "40px", padding: "10px 0px 10px 10px" , outline:"none" , border:"1px solid #64748b"  , borderRadius:"8px" }}
              {...register("eventName", { required: true })}
              placeholder="Event Name"
            />
            {errors.eventName && (
              <span className="text-red-500">Event Name is required</span>
            )}

            <input
              {...register("date", { required: true })}
              style={{ height: "40px", padding: "10px 0px 10px 10px" , outline:"none" , border:"1px solid #64748b"  , borderRadius:"8px" }}
             
              type="datetime-local"
              className="input"
            />
            {errors.date && (
              <span className="text-red-500">Date and Time are required</span>
            )}

            <input
              {...register("location", { required: true })}
              placeholder="Location"
              style={{ height: "40px", padding: "10px 0px 10px 10px" , outline:"none" , border:"1px solid #64748b"  , borderRadius:"8px" }}
             
              className="input"
            />
            {errors.location && (
              <span className="text-red-500">Location is required</span>
            )}

            <textarea
              {...register("description")}
              placeholder="Description"
              rows={80}
              cols={50}
              style={{ height: "70px", padding: "10px 0px 10px 10px" , outline:"none" , border:"1px solid #64748b"  , borderRadius:"8px" }}
             
       
            />

            <input
              {...register("capacity", { required: true, valueAsNumber: true })}
              type="number"
              placeholder="Capacity"
              style={{ height: "40px", padding: "10px 0px 10px 10px" , outline:"none" , border:"1px solid #64748b"  , borderRadius:"8px" }}
          
            />
            {errors.capacity && (
              <span className="text-red-500">Capacity is required</span>
            )}

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <Button size="small" type="submit" variant="contained">
                Submit
              </Button>
              <Button
                onClick={handleClose}
                size="small"
                variant="outlined"
                color="error"
              >
                Close
              </Button>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};


export default EventForm;