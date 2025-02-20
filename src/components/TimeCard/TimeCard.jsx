import React, { useRef, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const TimeCard = ({ time, status, date, onBook }) => {
  const toast = useRef(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setSelectedSlot({ date, time });
    setVisible(true);
  };

  const handleConfirm = () => {
    if (selectedSlot) {
      onBook(selectedSlot.date, selectedSlot.time);
      toast.current.show({
        severity: "success",
        summary: "Confirmed",
        detail: `Slot booked for ${selectedSlot.date} at ${selectedSlot.time}`,
        life: 3000,
      });
    }
    setVisible(false);
  };

  const handleReject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Cancelled",
      detail: "Booking was cancelled.",
      life: 3000,
    });
    setVisible(false);
  };

  const statusColor = status === "Available" ? "text-green-500" : "text-red-500";

  return (
    <div className="card flex justify-content-center dark:bg-gray-700 p-3">
      <Toast ref={toast} />
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message={`Do you want to book the slot for ${date} at ${time}?`}
        header="Confirm Booking"
        icon="pi pi-exclamation-triangle"
        accept={handleConfirm}
        reject={handleReject}
      />
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
