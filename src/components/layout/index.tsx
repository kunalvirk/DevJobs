import { PropsWithChildren } from "react";

import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";
import Header from "./header/header";
import Footer from "./footer/Footer";
import { SEO } from "@components/seo/SEO";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="layout flex flex-col font-inter">
        {/* <Breadcrumb /> */}
          <div>{children}</div>
        {/* <Menu /> */}
      </div>

      <Footer />
    </>
  );
};
