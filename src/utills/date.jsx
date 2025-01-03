import moment from "moment/min/moment-with-locales";

export const dateFormat = (date) => {
  return moment(date).format("D MMMM YYYY, H:mm:ss "); // รูปแบบภาษาไทย
};
