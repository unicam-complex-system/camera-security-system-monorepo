"use client";
import { ConfigProvider, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { loggedInNavBarItems, guestNavBarItems } from "@/data";
import { antTheme } from "../../theme";
import type { NavBarItem } from "@/types";
import { getCurrentNav } from "@/utils";
import { BellOutlined } from "@ant-design/icons";
import { useSessionSlice, useCameraSlice } from "@/hooks";
import { ProtectionContainer } from "./protection-container";
import { NotificationContainer } from "./notification-container";
const { Header, Content, Footer, Sider } = Layout;

export const LayoutContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /* state to check if ant design styled loaded */
  const { session, logOut } = useSessionSlice();
  const { isFullScreenGrid } = useCameraSlice();
  const [antStyleLoaded, setAntStyleLoaded] = useState<boolean>(false);
  const [currentNavMenu, setCurrentNavMenu] = useState<NavBarItem[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  /* event handler */
  const onMenuClick = (info: any) => {
    const selectedItem = currentNavMenu.find((item) => item.key === info.key);
    if (selectedItem && selectedItem.key !== "logout") {
      router.push(selectedItem.route);
    } else {
      router.push("/login");
      logOut();
    }
  };

  /* useEffect */
  useEffect(() => {
    setAntStyleLoaded(true);
  }, []);

  useEffect(() => {
    /* navbar menu */
    if (session) {
      setCurrentNavMenu(loggedInNavBarItems);
    } else {
      setCurrentNavMenu(guestNavBarItems);
    }
  }, [session, pathname]);

  return (
    <ConfigProvider theme={antTheme}>
      <NotificationContainer>
        {antStyleLoaded && (
          <ProtectionContainer>
            <Layout className="min-h-screen">
              <Sider className="bg-primary" breakpoint="xl" collapsedWidth="0">
                <div className="flex justify-center p-2">
                  <img
                    src="/images/logo-without-text.svg"
                    alt="logo"
                    className="max-w-[90px]"
                  />
                </div>

                <Menu
                  mode="inline"
                  defaultSelectedKeys={getCurrentNav(currentNavMenu, pathname)}
                  items={currentNavMenu.map(
                    (item: NavBarItem, index: number) => ({
                      key: item.key,
                      icon: React.createElement(item.icon),
                      label: item.label,
                    })
                  )}
                  onClick={onMenuClick}
                />
              </Sider>
              <Layout>
                <Header className="bg-primary flex justify-end" />
                <Content
                  className={`${
                    isFullScreenGrid
                      ? "fixed top-0 left-0 w-screen h-screen"
                      : "pt-6 px-4 p-0"
                  }`}
                >
                  <div className="p-2 bg-white min-h-[360px]">{children}</div>
                </Content>
                <Footer className="text-center">
                  CSS ©2023 Created by CSS team
                </Footer>
              </Layout>
            </Layout>
          </ProtectionContainer>
        )}
      </NotificationContainer>
    </ConfigProvider>
  );
};
