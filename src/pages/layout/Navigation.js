import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => {
        setCollapsed(!collapsed);
      }}
    >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/" />
          Home Page
        </Menu.Item>
        <Menu.Item key="2" icon={<CustomerServiceOutlined />}>
          <Link to="/customer" />
          Customer Page
        </Menu.Item>
        <Menu.Item key="3" icon={<DesktopOutlined />}>
          <Link to="/days" />
          Days Page
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="4">Tom</Menu.Item>
          <Menu.Item key="5">Bill</Menu.Item>
          <Menu.Item key="6">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="7">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
export default Navigation;
