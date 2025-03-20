export const DateToTimestamp = ({ date }: { date: Date }) => {
    return date?.getTime();
};

export const TimestampToDate = ({ timestamp }: { timestamp: number }): Date => {
    // Verifica se o timestamp é um número válido
    return timestamp && !isNaN(timestamp) ? new Date(timestamp) : new Date();
};
