export const generateTimeSlots = () => {
    const slots = [];
    let startTime = 10 * 60; // 10:00 AM in minutes
    let endTime = 17 * 60; // 5:00 PM in minutes
  
    while (startTime < endTime) {
      const hours = Math.floor(startTime / 60);
      const minutes = startTime % 60;
      const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${
        minutes === 0 ? "00" : minutes
      } ${hours >= 12 ? "PM" : "AM"}`;
  
      // Exclude break time (1:00 PM - 2:00 PM)
      if (!(hours === 13)) {
        slots.push(formattedTime);
      }
  
      startTime += 30; // Increment by 30 minutes
    }
  
    return slots;
  };
  