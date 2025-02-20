import React, { useRef, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

const TimeCard = ({ time, status, date, onBook }) => {
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState({ name: "", phone: "" });

  const handleClick = () => setVisible(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    const { name, phone } = userData;

    // Basic validation
    if (!name || !phone) {
      toast.current.show({
        severity: "warn",
        summary: "Missing Info",
        detail: "Please fill in both Name and Phone Number.",
        life: 3000,
      });
      return;
    }

    onBook(date, time, name, phone);
    setVisible(false);
    setUserData({ name: "", phone: "" });
  };

  const handleCancel = () => {
    toast.current.show({
      severity: "info",
      summary: "Cancelled",
      detail: "Booking was cancelled.",
      life: 3000,
    });
    setVisible(false);
  };

  const statusColor =
    status === "Available" ? "text-green-500" : "text-red-500";

  return (
    <div className="card flex justify-content-center dark:bg-gray-700 p-3">
      <Toast ref={toast} />
      <Dialog
        header={`Book Slot`}
        visible={visible}
        style={{ width: "25vw" }}
        onHide={handleCancel}
        footer={
          <div>
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={handleCancel}
              className="p-button-text"
            />
            <Button
              label="Book"
              icon="pi pi-check"
              onClick={handleConfirm}
              autoFocus
            />
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          <div className="text-lg font-medium">
            📅 <strong>{date}</strong> <br />⏰ <strong>{time}</strong>
          </div>

          <span className="p-float-label mt-4">
            <InputText
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
            <label htmlFor="name">Full Name</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              keyfilter="int"
            />
            <label htmlFor="phone">Phone Number</label>
          </span>
        </div>
      </Dialog>

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
