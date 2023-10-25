import React from "react";
import LoginForm from "@/components/form/LoginForm";
import HomePageLayout from "@/layout/HomepageLayout";

function login() {
  return (
    <HomePageLayout>
      <LoginForm />
    </HomePageLayout>
  );
}

export default login;
