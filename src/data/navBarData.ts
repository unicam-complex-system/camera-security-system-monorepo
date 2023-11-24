import type { NavBarItem } from "@/types";
import {
  UserOutlined,
  VideoCameraOutlined,
  HistoryOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
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
    route: "/authorized-entites",
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
    key: "setting",
    label: "Setting",
    route: "/setting",
    icon: SettingOutlined,
  },
  {
    key: "logout",
    label: "Log out",
    route: "/",
    icon: LogoutOutlined,
  },
];
