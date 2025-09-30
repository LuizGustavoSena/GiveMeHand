import moment from "moment";

moment.locale("pt-br");
export const formatDateNow = (decrementMonth: number) => moment().subtract(decrementMonth, 'month').format('MMMM[/]YYYY').toUpperCase();