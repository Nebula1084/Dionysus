import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

const SubMenu = Menu.SubMenu

class Menus extends React.Component {

  getMenuSelectedKey = (routes) => {
    if (routes === undefined) return ''
    let gn = '';
    for (let i = routes.length - 1; i >= 0; i--) {
      const obj = routes[i];
      if ('path' in obj) {
        gn = obj.path;
        break;
      }
    }
    return gn;
  }

  render() {
    const { sidebarFold, onMenuClick, routes } = this.props
    const menukey = this.getMenuSelectedKey(routes);

    return (
      <Menu mode={sidebarFold ? 'vertical' : 'inline'} theme='light' onClick={onMenuClick} selectedKeys={Array.of(menukey)}>
        <Menu.Item key='Business'>
          <Link to='/business'>
            <Icon type='bars' /> Business
          </Link>
        </Menu.Item>

        <Menu.Item key='Introduction'>
          <Link to='/review'>
            <Icon type='bars' /> Review
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Menus
