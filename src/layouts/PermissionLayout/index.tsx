import { PermissionLayoutProps } from '@/types/layouts'
import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import classes from './permissionLayout.module.scss'
import { useRecoilValue } from 'recoil'
import { userStore } from '@/store/userStore'
import { useRouter } from 'next/router'
import { ADMIN_ROUTES, APP_ROUTES } from '@/utils/routers'

const PermissionLayout = ({children} :PermissionLayoutProps) => {
    const { Content } = Layout
    const router = useRouter()
    const userState = useRecoilValue(userStore)
    const [isSSR, setIsSSR] = useState(false)

    useEffect(() =>{
      if(userState.id && userState.account_type =='master'){
          router.push(ADMIN_ROUTES.DASHBOARD)
      } else if (userState.id && userState.account_type =='normal'){
        router.push(APP_ROUTES.BLOGS)
      }
      setIsSSR(true)
    },[userState])
  return isSSR && !userState.id ? (
    <Layout className={classes.layout} id="layout">
    <Content id="siteLayoutContent">{children}</Content>
</Layout>
  ) : null
}

export default PermissionLayout