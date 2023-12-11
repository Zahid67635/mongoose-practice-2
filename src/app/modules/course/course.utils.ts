export const calculateDurationInWeeks = (startDate: string, endDate: string): number => {
    const perDay = 1000 * 60 * 60 * 24;
    const perWeek = perDay * 7;

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const difference = end - start
    const durationInWeeks = Math.ceil(difference / perWeek);

    return durationInWeeks;
}


