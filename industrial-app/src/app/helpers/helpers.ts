export function dateDiff(startDate: Date, endDate: Date, diffIn = 'm') {
  const milliseconds = endDate.getTime() - startDate.getTime(); // diferença em ms

  switch (diffIn) {
    case 'ms':
      return milliseconds;
    case 's':
      return Math.floor(Math.abs(milliseconds) / 1000);
    case 'm':
      return Math.floor(Math.abs(milliseconds) / 60000);
    case 'h':
      return Math.floor(milliseconds / 3600000);
    case 'd':
      return Math.floor(milliseconds / 86400000);
    default:
      return Math.floor(Math.abs(milliseconds) / 60000); // fallback: minutos
  }
}
