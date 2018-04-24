import React from 'react'
import styles from './layout.less'
import Menus from './menus'

class Sider extends React.Component {
  render() {
    const { sidebarFold, routes } = this.props

    const menuProps = {
      routes,
      sidebarFold,
      onMenuClick() { }
    }
    return (
      <div>
        <div className={styles.logo}>
          <img alt={'logo'} src={'logo.png'} />
          {sidebarFold ? <span /> : <span>Dionysus</span>}
        </div>
        <Menus {...menuProps} />
      </div>
    )
  }
}

export default Sider
