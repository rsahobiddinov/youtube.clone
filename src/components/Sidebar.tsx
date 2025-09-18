import { Button, Layout, Menu, theme } from "antd"
import { useEffect, type ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { changeShowcaseStore } from "../store/showStore"
import Icon from "./ui/Icons"
import { authStore } from "../store/authStore"

const { Sider, Content } = Layout

const MenuItems = [
  {
    key: "1",
    icon: <Icon.sidebarHome />,
    style: { padding: "10px 16px", margin: "4px 0", gap: "6px" },
    label: "Home",
  },
  {
    key: "2",
    icon: <Icon.sidebarShorts />,
    style: { padding: "10px 16px", margin: "4px 0", gap: "6px" },
    label: "Shorts",
  },
  {
    key: "3",
    icon: <Icon.sidebarSubscriptions />,
    style: { padding: "10px 16px", margin: "4px 0", gap: "6px" },
    label: "Subscriptions",
  },
  { type: "divider" as const },
  {
    key: "4",
    icon: <Icon.sidebarLibrary />,
    style: { padding: "10px 16px", margin: "4px 0", gap: "6px" },
    label: "Library",
  },
  {
    key: "5",
    icon: <Icon.sidebarHistory />,
    style: { padding: "10px 16px", margin: "4px 0", gap: "6px" },
    label: "History",
  },
  { type: "divider" as const },
]

const ExploreItems = [
  { key: "6", icon: <Icon.sidebarTrending />, style: { padding: "10px 16px", margin: "4px 0", gap: "6px" }, label: "Trending" },
  { key: "7", icon: <Icon.sidebarShopping />, style: { padding: "10px 16px", margin: "4px 0", gap: "6px" }, label: "Shopping" },
  { key: "8", icon: <Icon.sidebarMusic />, style: { padding: "10px 16px", margin: "4px 0", gap: "6px" }, label: "Music" },
  { key: "9", icon: <Icon.sidebarMovies />, style: { padding: "10px 16px", margin: "4px 0", gap: "6px" }, label: "Movies & TV" },
  { key: "10", icon: <Icon.sidebarLive />, style: { padding: "10px 16px", margin: "4px 0", gap: "6px" }, label: "Live" },
  { key: "11", icon: <Icon.sidebarGaming />, style: { padding: "10px 16px", margin: "4px 0", gap: "6px" }, label: "Gaming" },
  { key: "12", icon: <Icon.sidebarNews />, style: { padding: "10px 16px", margin: "4px 0", gap: "6px" }, label: "News" },
  { key: "13", icon: <Icon.sidebarSports />, style: { padding: "10px 16px", margin: "4px 0", gap: "6px" }, label: "Sports" },
  { key: "14", icon: <Icon.sidebarLearning />, style: { padding: "10px 16px", margin: "4px 0", gap: "6px" }, label: "Learning" },
  { key: "15", icon: <Icon.sidebarFashion />, style: { padding: "10px 16px", margin: "4px 0", gap: "6px" }, label: "Fashion & Beauty" },
  { key: "16", icon: <Icon.sidebarPodcasts />, style: { padding: "10px 16px", margin: "4px 0", gap: "6px" }, label: "Podcasts" },
]



type SidebarProps = {
  children: ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  const isOpen = changeShowcaseStore((state) => state.isOpen)
  const setIsopen = changeShowcaseStore(state => state.toggle)
  const open = authStore((state) => state.isOpen)
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const location = useLocation();
  const video = location.pathname.split('/')[1]

  useEffect(() => {
    setIsopen()
  }, [])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className={`!bg-[#fff] !overflow-y-auto ${video == "video" && isOpen == true ? "hidden" : "block"} `}

        trigger={null}
        collapsible
        collapsed={isOpen}
        width={240}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={isOpen ? MenuItems : MenuItems}
        />
        {!isOpen && (
          <>
            <div className={open ? `px-4 py-3 border-y text-sm text-gray-700` :"hidden"}>
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
              items={[
                {
                  type: "group" as const,
                  label: "Explore",
                  children: ExploreItems,
                },
              ]}
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
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}