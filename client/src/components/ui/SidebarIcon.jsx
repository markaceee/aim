import { FcCollaboration, FcComboChart, FcCurrencyExchange, FcDebt, FcGrid, FcInspection, FcKindle, FcOnlineSupport, FcPlanner, FcPrint, FcReading, FcSettings, FcViewDetails } from "react-icons/fc";

// const icons = {
//   dashboard,
//   studentManagement,
//   gear,
//   analysisChart,
//   bookshelf,
//   calendarLight,
//   check,
//   checklist,
//   document,
//   feedback,
//   invoiceCheck,
//   invoiceLight,
//   paymentMethod,
//   teacher,
// };

const icons = [
  {
    name: "dashboard",
    icons: <FcGrid size='30' />
  },
  {
    name: "studentManagement",
    icons: <FcCollaboration size='30' />
  },
  {
    name: "gear",
    icons: <FcSettings size='30' />
  },
  {
    name: "calendarLight",
    icons: <FcPlanner size='30' />
  },
  {
    name: "teacher",
    icons: <FcOnlineSupport size='30' />
  },
  {
    name: "checklist",
    icons: <FcInspection size='30' />
  },
  {
    name: "analysisChart",
    icons: <FcComboChart size='30' />
  },
  {
    name: "document",
    icons: <FcKindle size='30' />
  },
  {
    name: "feedback",
    icons: <FcReading size='30' />
  },
  {
    name: "paymentMethod",
    icons: <FcDebt size='30' />
  },
  {
    name: "bookshelf",
    icons: <FcPrint size='30' />
  },
  {
    name: "invoiceLight",
    icons: <FcViewDetails size='30' />
  },
  {
    name: "invoiceCheck",
    icons: <FcCurrencyExchange size='30' />
  },
];

const SidebarIcon = ({ iconName }) => {
  // let icon = icons[iconName] || null; // Or you can use a placeholder icon here
  let icon = icons.filter(i => i.name === iconName)
  return icon[0]?.icons;
  // return <img className=" h-6 max-w-none" src={icon} alt={iconName} />;
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
