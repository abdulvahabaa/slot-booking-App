import { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { generateDates } from "../../utils/dateUtils";
import TimeCard from "../TimeCard/TimeCard";
import { generateTimeSlots } from "../../utils/generateTimeSlots";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const TabViewer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [availableSlots, setAvailableSlots] = useState([]);
  const toast = useRef(null);

  const dateTabs = generateDates(7);
  const generatedTimeSlots = generateTimeSlots();

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await fetch(
        `http://localhost:9002/api/appointments/available-slots?date=${date}`
      );
      const data = await response.json();
      setAvailableSlots(data.availableSlots);
      console.log("Fetched available slots:", data.availableSlots);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  useEffect(() => {
    const selectedDate = dateTabs[activeIndex].split("/").reverse().join("-");
    fetchAvailableSlots(selectedDate);
  }, [activeIndex]);

  const handleBookSlot = async (date, timeSlot) => {
    // Convert Date: DD/MM/YYYY -> YYYY-MM-DD
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;

    const formattedTime = timeSlot.replace(/\s?(AM|PM)/i, "");

    const bookingData = {
      name: "Abdul Vahab",
      phone: "1234567890",
      date: formattedDate,
      timeSlot: formattedTime,
    };

    try {
      const response = await fetch(
        "http://localhost:9002/api/appointments/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `Slot booked for ${formattedDate} at ${formattedTime}`,
          life: 3000,
        });

        setAvailableSlots((prevSlots) =>
          prevSlots.filter((slot) => slot !== timeSlot)
        );

        fetchAvailableSlots(formattedDate);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "Booking failed. Try again!",
          life: 3000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Server error. Please try later.",
        life: 3000,
      });
    }
  };

  return (
    <div className="card mt-5">
      <Toast ref={toast} />
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        {dateTabs.map((date, index) => (
          <TabPanel
            key={index}
            header={date}
            className="flex flex-wrap justify-center"
          >
            <div className="grid grid-cols-6 gap-1 flex-wrap">
              {generatedTimeSlots.map((time, idx) => (
                <TimeCard
                  key={idx}
                  time={time}
                  status={
                    availableSlots.includes(time)
                      ? "Available"
                      : "Not Available"
                  }
                  date={date}
                  onBook={handleBookSlot}
                />
              ))}
            </div>
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
};

export default TabViewer;
