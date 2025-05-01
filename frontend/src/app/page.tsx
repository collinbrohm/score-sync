import Header from "./components/Header/Header";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import RootLayout from "./layout";

export default function LandingPage() {
  return (
    <RootLayout>
      <Header />
      <HeroBanner />
    </RootLayout>
  );
}
