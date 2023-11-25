"use client";
import { ConfigProvider, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { loggedInNavBarItems, guestNavBarItems } from "@/data";
import { antTheme, theme } from "../../theme";
import type { NavBarItem } from "@/types";
import "@/app/globals.css";
import { getCurrentNav } from "@/utils";
import { BellOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/hooks";
import { selectSession } from "@/store";
const { Header, Content, Footer, Sider } = Layout;

export const LayoutContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /* state to check if ant design styled loaded */
  const session = useAppSelector(selectSession);
  const [antStyleLoaded, setAntStyleLoaded] = useState<boolean>(false);
  const [currentNavMenu, setCurrentNavMenu] = useState<NavBarItem[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  /* event handler */
  const onMenuClick = (info: any) => {
    const selectedItem = loggedInNavBarItems.find(
      (item) => item.key === info.key
    );
    if (selectedItem) {
      router.push(selectedItem.route);
    }
  };

  /* useEffect */
  useEffect(() => {
    setAntStyleLoaded(true);
  }, []);
  useEffect(() => {
    if (session) {
      setCurrentNavMenu(loggedInNavBarItems);
    } else {
      setCurrentNavMenu(guestNavBarItems);
    }
  }, [session]);

  return (
    <ConfigProvider theme={antTheme}>
      {antStyleLoaded && (
        <Layout className="min-h-screen">
          <Sider className="bg-primary" breakpoint="lg" collapsedWidth="0">
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
              items={currentNavMenu.map((item: NavBarItem, index: number) => ({
                key: item.key,
                icon: React.createElement(item.icon),
                label: item.label,
              }))}
              onClick={onMenuClick}
            />
          </Sider>
          <Layout>
            <Header className="bg-primary flex justify-end">
              {session && <BellOutlined className="cursor-pointer text-2xl text-white" />}
            </Header>
            <Content className="pt-6 px-4 p-0">
              <div className="p-6 bg-white min-h-[360px]">{children}</div>
            </Content>
            <Footer className="text-center">
              CSS ©2023 Created by CSS team
            </Footer>
          </Layout>
        </Layout>
      )}
    </ConfigProvider>
  );
};
