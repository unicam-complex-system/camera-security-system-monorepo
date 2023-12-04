import type { NavBarItem } from "@/types";
import {
  UserOutlined,
  VideoCameraOutlined,
  HistoryOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  BarChartOutlined,
  LoginOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

export const loggedInNavBarItems: NavBarItem[] = [
  {
    key: "video-stream",
    label: "Video stream",
    route: "/video-stream",
    icon: VideoCameraOutlined,
  },
  {
    key: "authorized-entites",
    label: "Authorized Entities",
    route: "/authorized-entities",
    icon: UserOutlined,
  },
  {
    key: "recent-activities",
    label: "Recent Activities",
    route: "/recent-activities",
    icon: HistoryOutlined,
  },
  {
    key: "playback",
    label: "Playback",
    route: "/playback",
    icon: PlayCircleOutlined,
  },
  {
    key: "analytics",
    label: "Analytics",
    route: "/analytics",
    icon: BarChartOutlined,
  },
  {
    key: "setting",
    label: "Setting",
    route: "/setting",
    icon: SettingOutlined,
  },
  {
    key: "about-us",
    label: "About us",
    route: "/about-us",
    icon: InfoCircleOutlined,
  },
  {
    key: "contact-us",
    label: "Contact us",
    route: "/contact-us",
    icon: PhoneOutlined,
  },
  {
    key: "logout",
    label: "Log out",
    route: "",
    icon: LogoutOutlined,
  },
];

export const guestNavBarItems: NavBarItem[] = [
  {
    key: "login",
    label: "Login",
    route: "/login",
    icon: LoginOutlined,
  },
  {
    key: "about-us",
    label: "About us",
    route: "/about-us",
    icon: InfoCircleOutlined,
  },
  {
    key: "contact-us",
    label: "Contact us",
    route: "/contact-us",
    icon: PhoneOutlined,
  },
];
