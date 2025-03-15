import { BsExclamationDiamond } from "react-icons/bs";
import { GrPowerCycle } from "react-icons/gr";
import { VscTarget } from "react-icons/vsc";


export const applicationTypes = [
  {
    icon: VscTarget,
    title: "Aid Application",
    description: "Financial support for general church activities or projects.",
    link: "/aid-application",
  },
  {
    icon: GrPowerCycle,
    title: "Revolving Fund",
    description: "Short-term loans to support church initiatives.",
    link: "/revolving-fund",
  },
  {
    icon: BsExclamationDiamond,
    title: "Emergency Support",
    description: "Urgent funding for disasters or critical issues.",
    link: "/emergency-support",
  },
];