import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useMemo, useState } from "react";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";

interface JsonDat {
  id: string;
  capacity: number;
  date: string;
  description: string;
  eventName: string;
  location: string;
}

type PropsData = {
  allData: JsonDat;
  deleteItem: (id: string) => void;
  editForm: (data: JsonDat) => void;
};

export default function Cards({ allData, deleteItem, editForm }: PropsData) {
  const [moreOrLess, setMoreOrLess] =
    useState<React.SetStateAction<boolean>>(false);

  const descriptionText = useMemo(() => {
    return allData.description.length > 150
      ? `${allData.description.substring(0, 150)}...`
      : allData.description;
  }, [allData.description]);

  return (
    <Card className="w-full max-w-xs mx-auto bg-white shadow-md rounded-lg">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="event">
            {allData.eventName.charAt(0)}
          </Avatar>
        }
        title={allData.eventName}
        subheader={moment(allData.date).format("DD MMM YYYY hh:mm a")}
      />
      <CardContent>
        <Typography variant="body2" className="text-gray-600">
          {moreOrLess ? allData.description : descriptionText}
          {allData.description.length > 150 && (
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setMoreOrLess(!moreOrLess)}
            >
              {moreOrLess ? "Less" : "More"}
            </span>
          )}
        </Typography>
      </CardContent>
      <div className="pl-4 text-xs flex flex-col items-start gap-[5px] text-gray-500">
        <div className="flex items-center">
          <LocationOnIcon className="text-base mr-1" />
          {allData.location}
        </div>
        <div className="flex items-center">
          <ReduceCapacityIcon className="text-base mr-1" />
          Capacity: {allData.capacity}
        </div>
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label="edit" onClick={() => editForm(allData)}>
          <EditIcon className="text-gray-500" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => deleteItem(allData.id)}>
          <DeleteIcon className="text-red-600" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
