import moment from "moment";

moment.locale("pt-br");
export const formatDateNow = () => moment().subtract(1, 'month').format('MMMM[/]YYYY');