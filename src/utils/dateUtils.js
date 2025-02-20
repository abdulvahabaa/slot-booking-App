export const generateDates = (days = 7) => {
    const dates = [];
    const today = new Date();
  
    for (let i = 0; i < days; i++) {
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + i);
      const formattedDate = futureDate.toLocaleDateString("en-GB"); // Format: DD-MM-YYYY
      dates.push(formattedDate);
    }
  
    return dates;
  };
  