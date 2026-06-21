export const DateToTimestamp = ({ date }: { date: Date }) => {
  return date?.getTime();
};

export const TimestampToDate = ({ timestamp }: { timestamp: number }): Date => {
  // Verifica se o timestamp é um número válido
  return timestamp && !isNaN(timestamp) ? new Date(timestamp) : new Date();
};

export const TimestampToFormatDate = (timestamp: number): string => {
  if (!timestamp || isNaN(timestamp)) return "-";

  return new Date(timestamp).toLocaleDateString("pt-BR");
};

export const formatDateForInput = (timestamp?: number) => {
  if (!timestamp) return "";

  return new Date(timestamp).toISOString().split("T")[0];
};
