import React from 'react'
import { Link } from 'dva/router'
import styles from './index.less'

const NotFound = () => <div className={styles['page-404']}>
  <section>
    <h1>404</h1>
    <p>Page Not Found <Link to='/'>Return to Home</Link></p>
  </section>
</div>

export default NotFound
