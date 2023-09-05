import { Breadcrumb, Layout, Menu } from "antd";
import { BaseLayoutProps } from "@/types/layouts";
import classes from "./baseLayout.module.scss";
import { MenuData } from "@/utils/menu";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ADMIN_ROUTES, APP_ROUTES } from "@/utils/routers";
import { useRouter } from "next/router";
import { userStore } from "@/store/userStore";
import Link from "next/link";
const BaseLayout = ({ children }: BaseLayoutProps) => {
  const { Header, Content, Footer } = Layout;
  const router = useRouter();
  const userState = useRecoilValue(userStore);
  const [menuState, setMenuState] = useState() as any;
  const [isSSR, setIsSSR] = useState(false);
  const setUserState = useSetRecoilState(userStore);
  const renderMenu = MenuData?.filter(
    (item: any) => item.key !== "login" && item.key !== "blogs"
  );
  useEffect(() => {
    setMenuState(
      userState?.id
        ? renderMenu &&
            renderMenu.concat(
              {
                label: <Link href={APP_ROUTES.PROFILE}>Profile</Link>,
                key: "profile",
              },
              {
                label: <Link href={APP_ROUTES.BLOGS}>Blogs</Link>,
                key: "info",
              },
              {
                label: (
                  <span
                    onClick={() => {
                      setUserState({
                        id: "",
                        userName: "",
                        email: "",
                        lastName: "",
                        account_type: "",
                        password: "",
                        token: "",
                        phone: "",
                        gender: "",
                      });
                      router.push(APP_ROUTES.LOGIN);
                    }}
                  >
                    Logout
                  </span>
                ),
                key: "logout",
              }
            )
        : MenuData
    );
    setIsSSR(true);
  }, [userState]);

  useEffect(() => {
    if (userState.id && userState.account_type == "master") {
      router.push(ADMIN_ROUTES.DASHBOARD);
    }
  }, []);

  return isSSR && userState.id ? (
    <Layout className={classes.layout} id="layout">
      <Header className={classes.header}>
        

        <Menu
          className={classes.menu}
          theme="dark"
          mode="horizontal"
     
          defaultSelectedKeys={["1"]}
          items={menuState}
        />
      </Header>

      <Content id="siteLayoutContent">{children}</Content>

      <Footer className={classes.footer}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  ) : null;
};
export default BaseLayout;
