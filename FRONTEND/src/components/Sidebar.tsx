import { Button, Layout, Menu, theme, type MenuProps } from "antd";
import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { changeShowcaseStore } from "../store/showStore";
import { authStore } from "../store/authStore";
import Icon from "./ui/Icons";

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
const MenuItems: MenuItem[] = [
  { key: "1", icon: <Icon.sidebarHome />, label: "Home" },
  { key: "2", icon: <Icon.sidebarShorts />, label: "Shorts" },
  { key: "3", icon: <Icon.sidebarSubscriptions />, label: "Subscriptions" },
  { type: "divider", key: "divider1" },
  { key: "4", icon: <Icon.sidebarLibrary />, label: "Library" },
  { key: "5", icon: <Icon.sidebarHistory />, label: "History" },
  { type: "divider", key: "divider2" },
];
const ExploreItems: MenuItem[] = [
  { key: "6", icon: <Icon.sidebarTrending />, label: "Trending" },
  { key: "7", icon: <Icon.sidebarShopping />, label: "Shopping" },
  { key: "8", icon: <Icon.sidebarMusic />, label: "Music" },
  { key: "9", icon: <Icon.sidebarMovies />, label: "Movies & TV" },
  { key: "10", icon: <Icon.sidebarLive />, label: "Live" },
  { key: "11", icon: <Icon.sidebarGaming />, label: "Gaming" },
  { key: "12", icon: <Icon.sidebarNews />, label: "News" },
  { key: "13", icon: <Icon.sidebarSports />, label: "Sports" },
  { key: "14", icon: <Icon.sidebarLearning />, label: "Learning" },
  { key: "15", icon: <Icon.sidebarFashion />, label: "Fashion & Beauty" },
  { key: "16", icon: <Icon.sidebarPodcasts />, label: "Podcasts" },
];
const pathMap: Record<string, string> = {
  "1": "/",
  "2": "/shorts",
  "3": "/subscriptions",
  "4": "/library",
  "5": "/history",
  "6": "/trending",
  "7": "/shopping",
  "8": "/music",
  "9": "/movies",
  "10": "/live",
  "11": "/gaming",
  "12": "/news",
  "13": "/sports",
  "14": "/learning",
  "15": "/fashion",
  "16": "/podcasts",
};

type SidebarProps = {
  children: ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  const isOpen = changeShowcaseStore((state) => state.isOpen);
  const setIsopen = changeShowcaseStore((state) => state.toggle);
  const open = authStore((state) => state.isOpen);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    setIsopen();
  }, []);

  const getSelectedKey = () => {
    const foundKey = Object.keys(pathMap).find((key) => pathMap[key] === currentPath);
    return foundKey ? [foundKey] : ["1"];
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    const path = pathMap[key];
    if (path) navigate(path);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className="!bg-[#fff] !overflow-y-auto"
        trigger={null}
        collapsible
        collapsed={isOpen}
        width={240}
      >
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={getSelectedKey()}
          onClick={handleMenuClick}
          items={MenuItems}
        />
        {!isOpen && (
          <>
            <div className={open ? "px-2 py-3 border-y text-sm text-gray-700" : "hidden"}>
              <p className="mb-2 text-[14px]">
                Sign in to like videos, comment, and subscribe.
              </p>
              <Button type="default" icon={<Icon.defaultUserLogin />}>
                Sign in
              </Button>
            </div>
            <Menu
              theme="light"
              mode="inline"
              selectable={false}
              onClick={handleMenuClick}
              items={[{ type: "group", label: "Explore", children: ExploreItems }]}
            />
          </>
        )}
      </Sider>

      <Layout>
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
