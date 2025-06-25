import ChurchInfo from "@/pages/client/applications/support/components/church-info";
import OtherInfo from "@/pages/client/applications/support/components/other-info";
import ReviewSubmit from "@/pages/client/applications/support/components/review-submit";
import SupportInfo from "@/pages/client/applications/support/components/support-info";
import SupportingDocs from "@/pages/client/applications/support/components/supporting-docs";
import { BsExclamationDiamond } from "react-icons/bs";
import { GrPowerCycle } from "react-icons/gr";
import { VscTarget } from "react-icons/vsc";

export const applicationTypes = [
  {
    icon: VscTarget,
    title: "Aid Application",
    description: "Financial support/aid for church building projects.",
    link: "/aid-application",
  },
  {
    icon: GrPowerCycle,
    title: "Revolving Fund",
    description: "Short-term loans to support church building projects.",
    link: "/revolving-fund",
  },
  {
    icon: BsExclamationDiamond,
    title: "Emergency Support",
    description:
      "Urgent funding (aid or revolving fund) for disasters or critical issues.",
    link: "/emergency-support",
  },
];

export const churchStatus = [
  {
    label: "Location Church",
    value: "Location Church",
  },
  {
    label: "District Church",
    value: "District Church",
  },
  {
    label: "Group of District Headquarters",
    value: "Group of District Headquarters",
  },
  {
    label: "Divisional Headquarters",
    value: "Divisional Headquarters",
  },
  {
    label: "Regional Headquarters",
    value: "Regional Headquarters",
  },
];

export const supportApplicationSteps = [
  { id: 0, title: "Church Information", content: ChurchInfo },
  { id: 1, title: "Support Information", content: SupportInfo },
  { id: 2, title: "Other Information", content: OtherInfo },
  { id: 3, title: "Supporting Documents", content: SupportingDocs },
  { id: 4, title: "Review & Submit", content: ReviewSubmit },
];

export const supportTypes = [
  { label: "Aid", value: "AID" },
  { label: "Revolving fund", value: "REVOLVING_FUND" },
];

export const bankNames = [
  { label: "Fidelity Bank", value: "fidelity" },
  { label: "Cal Bank", value: "calbank" },
  { label: "Zenith Bank", value: "zenith" },
  { label: "Standard Chartered Bank", value: "stanchart" },
  { label: "Other", value: "other" },
];

export const projectPhase = [
  {
    label: 'Land acquisition',
    value: 'Land acquisition'
  },
  {
    label: 'Foundation',
    value: 'Foundation'
  },
  {
    label: 'Superstructure (columns, beams, blockwork etc.)',
    value: 'Superstructure'
  },
  {
    label: 'Roofing',
    value: 'Roofing'
  },
  {
    label: 'General finishes',
    value: 'General finishes'
  },
 
]

export const churchProjectTypes = [
  {
    label: " Regional headquarters church",
    value: "REGIONAL HEADQUARTERS CHURCH",
  },
  {
    label: "Divisional headquarters church",
    value: "DIVISIONAL HEADQUARTERS CHURCH",
  },
  {
    label: "Group of districts headquarters church",
    value: "GROUP OF DISTRICTS HEADQUARTERS CHURCH",
  },
  { label: "District church", value: "DISTRICT CHURCH" },
  { label: "Location church", value: "LOCATION CHURCH" },
];

export const tooltipStyle = {
  fontSize: "12px",
  fontWeight: "300",
  backgroundColor: "#101828",
  color: "#fff",
  borderRadius: "8px",
  marginTop: "10px",
};

export const statuses = [
  // { label: "DRAFT", value: "DRAFT" },
  { label: "PENDING REVIEW", value: "PENDING REVIEW" },
  { label: "APPROVED", value: "APPROVED" },
  { label: "REJECTED", value: "REJECTED" },
  { label: "UNDER REVIEW", value: "UNDER REVIEW" },
  { label: "WAITING NO'S APPROVAL", value: "WAITING NO'S APPROVAL" },
];

export const ghanaRegions = [
  { label: "Greater Accra", value: "greater_accra" },
  { label: "Ashanti", value: "ashanti" },
  { label: "Western", value: "western" },
  { label: "Eastern", value: "eastern" },
  { label: "Central", value: "central" },
  { label: "Volta", value: "volta" },
  { label: "Northern", value: "northern" },
  { label: "Upper East", value: "upper_east" },
  { label: "Upper West", value: "upper_west" },
  { label: "Bono", value: "bono" },
  { label: "Bono East", value: "bono_east" },
  { label: "Ahafo", value: "ahafo" },
  { label: "Western North", value: "western_north" },
  { label: "Oti", value: "oti" },
  { label: "North East", value: "north_east" },
  { label: "Savannah", value: "savannah" },
];
