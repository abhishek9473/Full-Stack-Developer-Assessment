import HomePageLayout from "@/layout/HomepageLayout";
import LoginForm from "@/components/form/LoginForm";

export default function Home() {
  return (
    <>
      <HomePageLayout>
        <LoginForm />
      </HomePageLayout>
    </>
  );
}
