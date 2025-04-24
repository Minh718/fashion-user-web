import moment from "moment";

// Hàm chuyển đổi thời gian linh hoạt
function convertDateTimeFlexibly(pastTimeStr) {
  const pastTime = moment(pastTimeStr);
  const now = moment();
  const diffInYears = now.diff(pastTime, "years");
  const diffInMonths = now.diff(pastTime, "months");
  const diffInDays = now.diff(pastTime, "days");
  const diffInHours = now.diff(pastTime, "hours");
  const diffInMinutes = now.diff(pastTime, "minutes");

  if (diffInYears > 0) {
    return `${diffInYears} year ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour ago`;
  } else if (diffInMinutes > 30) {
    return "nữa tiếng trước";
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute ago`;
  } else {
    return "Now";
  }
}

export { convertDateTimeFlexibly };
// Test các mốc thời giant quả: 7 tháng trước
