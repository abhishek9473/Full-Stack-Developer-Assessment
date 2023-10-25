import React from "react";
import SignupForm from "@/components/form/SignupForm";
import HomePageLayout from "@/layout/HomepageLayout";

function signup() {
  return (
    <HomePageLayout>
      <SignupForm />
    </HomePageLayout>
  );
}

export default signup;
