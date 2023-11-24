"use client";
import { ConfigProvider, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { antTheme, theme, loggedInNavBarItems } from "@/data";
import type { NavBarItem } from "@/types";
import "@/app/globals.css";
import { getCurrentNav } from "@/utils";
const { Header, Content, Footer, Sider } = Layout;

export const LayoutContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /* state to check if ant design styled loaded */
  const [antStyleLoaded, setAntStyleLoaded] = useState<boolean>(false);
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

  return (
    <ConfigProvider theme={antTheme}>
      {antStyleLoaded && (
        <Layout className="min-h-screen">
          <Sider
            style={{ backgroundColor: theme.colors.primaryColor }}
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className="flex justify-center p-2">
              <img
                src="/images/logo-without-text.svg"
                alt="logo"
                className="max-w-[90px]"
              />
            </div>

            <Menu
              mode="inline"
              defaultSelectedKeys={getCurrentNav(loggedInNavBarItems, pathname)}
              items={loggedInNavBarItems.map(
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
            <Header>
              <div>here</div>
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: "white",
                }}
              >
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              CSS ©2023 Created by CSS team
            </Footer>
          </Layout>
        </Layout>
      )}
    </ConfigProvider>
  );
};
