import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const TimeCard = ({ time, status, date, onBook }) => {
  const handleClick = () => {
    onBook(date, time);
  };

  const statusColor =
    status === "Available" ? "text-green-500" : "text-red-500";

  return (
    <div className="card flex justify-content-center dark:bg-gray-700 p-3">
      <Card
        title={time}
        subTitle={<span className={statusColor}>{status}</span>}
        className="md:w-15rem transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      >
        <Button
          label={status === "Not Available" ? "Booked" : "Book Slot"}
          severity={status === "Not Available" ? "secondary" : "success"}
          outlined
          onClick={handleClick}
          className="w-full"
          disabled={status === "Not Available"}
        />
      </Card>
    </div>
  );
};

export default TimeCard;
