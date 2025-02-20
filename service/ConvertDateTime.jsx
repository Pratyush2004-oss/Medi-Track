import moment from "moment"

export const FormatDateTime = (timestamp) => {
    return new Date(timestamp)
}

export const formatDateForText = (date) => {
    return moment(date).format('LL');
}

export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    })

    return timeString;
}

export const getDatesRange = (startDate, endDate) => {
    const start = moment(startDate, "DD-MM-YYYY");
    const end = moment(endDate, "DD-MM-YYYY");
    const dates = [];

    while (start.isSameOrBefore(end)) {
        dates.push(start.format("DD-MM-YYYY"));
        start.add(1, "days");
    }

    return dates;
}

export const getDateRangeToDisplay = () => {
    const dateList = [];
    for (let i = 0; i < 7; i++) {
        dateList.push({
            date: moment().add(i, 'days').format('DD'),
            day: moment().add(i, 'days').format('ddd'),
            formattedDate: moment().add(i, 'days').format('DD-MM-YYYY'),
        });
    }
    return dateList;
}

export const getPreviousDateRange = () => {
    const dateList = [];
    for (let i = 0; i < 7; i++) {
        const date = moment().subtract(i, 'days');
        dateList.push({
            date: moment().subtract(i, 'days').format('DD'),
            day: moment().subtract(i, 'days').format('ddd'),
            formattedDate: moment().subtract(i, 'days').format('DD-MM-YYYY'),
        });
    }
    return dateList;
}