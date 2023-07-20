import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";
import toast, {toastConfig} from "react-simple-toasts";
import 'react-simple-toasts/dist/theme/dark.css';

import { Layout } from "@components/layout";
import { dataProvider } from "@refinedev/supabase";
import "@styles/global.css";
import { appWithTranslation, useTranslation } from "next-i18next";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility";



import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

toastConfig({
  theme: 'dark'
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <div className={inter.variable}>
      <RefineKbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(supabaseClient)}
          authProvider={authProvider}
          i18nProvider={i18nProvider}
          resources={[
            {
              name: "jobs",
              list: "/jobs",
              create: "/jobs/create",
              show: "/jobs/show/:id",
              meta: {
                label: "Jobs"
              }
            },
            {
              name: "profiles",
              list: "/profile"
            }
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          {renderComponent()}
          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </RefineKbarProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);
