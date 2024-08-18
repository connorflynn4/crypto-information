export const generateXAxisLabels = (timePeriod: string, sparklineLength: number) => {
  switch (timePeriod) {
      case '1h':
          return Array.from({ length: sparklineLength }, (_, index) => {
              const minutesInterval = 60 / sparklineLength;
              return `${Math.round(index * minutesInterval)} min`;
          });
      case '3h':
          return Array.from({ length: sparklineLength }, (_, index) => {
              const totalMinutes = Math.round(index * (180 / sparklineLength));
              const hours = Math.floor(totalMinutes / 60);
              const minutes = totalMinutes % 60;
              return hours > 0 ? `${hours} hr${minutes > 0 ? ` ${minutes} min` : ''}` : `${minutes} min`;
          });
      case '12h':
          return Array.from({ length: sparklineLength }, (_, index) => {
              const totalMinutes = Math.round(index * (720 / sparklineLength));
              const hours = Math.floor(totalMinutes / 60);
              const minutes = totalMinutes % 60;
              return hours > 0 ? `${hours} hr${minutes > 0 ? ` ${minutes} min` : ''}` : `${minutes} min`;
          });
      case '24h':
          return Array.from({ length: sparklineLength }, (_, index) => `${index + 1} hr`);
      case '7d':
          return Array.from({ length: sparklineLength }, (_, index) => {
              const daysInterval = 7 / sparklineLength;
              return `Day ${Math.ceil((index + 1) * daysInterval)}`;
          });
      case '30d':
          return Array.from({ length: sparklineLength }, (_, index) => `Day ${index + 1}`);
      case '3m':
          return Array.from({ length: sparklineLength }, (_, index) => {
              const monthsInterval = 3 / sparklineLength;
              return `Month ${Math.ceil((index + 1) * monthsInterval)}`;
          });
      case '1y':
          return Array.from({ length: sparklineLength }, (_, index) => {
              const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              return monthNames[Math.floor(index * (12 / sparklineLength))];
          });
      case '3y':
      case '5y':
          return Array.from({ length: sparklineLength }, (_, index) => {
              const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              const year = Math.floor(index / 12) + 1;
              return `${monthNames[index % 12]} Y${year}`;
          });
      default:
          return Array.from({ length: sparklineLength }, (_, index) => `Point ${index + 1}`);
  }
};
