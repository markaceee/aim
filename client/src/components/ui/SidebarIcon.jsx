import dashboard from "../../assets/svg/dashboard.svg";
import studentManagement from "../../assets/svg/student-management.svg";
import gear from "../../assets/svg/gear.svg";
import analysisChart from "../../assets/svg/analysis-chart.svg";
import bookshelf from "../../assets/svg/bookshelf.svg";
import calendarLight from "../../assets/svg/calendar-light.svg";
import check from "../../assets/svg/check.svg";
import checklist from "../../assets/svg/checklist.svg";
import document from "../../assets/svg/document.svg";
import feedback from "../../assets/svg/feedback.svg";
import invoiceCheck from "../../assets/svg/invoice-check-outline.svg";
import invoiceLight from "../../assets/svg/invoice-light.svg";
import paymentMethod from "../../assets/svg/payment-method.svg";
import teacher from "../../assets/svg/teacher.svg";

const icons = {
  dashboard,
  studentManagement,
  gear,
  analysisChart,
  bookshelf,
  calendarLight,
  check,
  checklist,
  document,
  feedback,
  invoiceCheck,
  invoiceLight,
  paymentMethod,
  teacher,
};

const SidebarIcon = ({ iconName }) => {
  let icon = icons[iconName] || null; // Or you can use a placeholder icon here

  return <img className=" h-6 max-w-none" src={icon} alt={iconName} />;
};

export default SidebarIcon;

// import { BeakerIcon, BellIcon } from "@heroicons/react/24/solid";

// const icons = {
//   beaker: <BeakerIcon />,
//   Bell: <BellIcon />,
// };

// const SidebarIcon = ({ iconName }) => {
//   const IconComponent = icons[iconName];
//   return IconComponent ? IconComponent : null;
// };

// export default SidebarIcon;
