import AdminLoginForm from '@/components/form/AdminLoginForm'
import HomePageLayout from '@/layout/HomepageLayout'
import React from 'react'

function index() {
  return (
    <HomePageLayout>
        <AdminLoginForm/>
    </HomePageLayout>
  )
}

export default index