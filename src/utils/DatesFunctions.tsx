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

export const formatTimestampDateForInput = (timestamp?: number) => {
  if (!timestamp) return "";

  return new Date(timestamp).toISOString().split("T")[0];
};

export function formatDate(date: string | undefined): string {
  if (!date) return "--/--/--";
  return new Date(date).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

export const formatStringDateForInput = (dateString?: string) => {
  if (!dateString) return "";

  return new Date(dateString).toISOString().split("T")[0];
};

export const parseDate = (dateString: string) => {
  if (!dateString) return new Date();

  const [year, month, day] = dateString.split("T")[0].split("-").map(Number);

  return new Date(year, month - 1, day);
};
