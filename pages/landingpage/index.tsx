import React from "react";
import Masthead from "@components/layout/masthead/Masthead";
import Header from "@components/layout/header/header";
import Job from "@components/job/Job";
import Footer from "@components/layout/footer/Footer";
import { SEO } from "@components/seo/SEO";

const LandingPage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Masthead />

        {/* Latest Jobs */}
        <Job />
      </main>
      <Footer />
      <SEO />
    </>
  );
};

export default LandingPage;
