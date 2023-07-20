

import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { authProvider } from "src/authProvider";

import {FiGithub} from 'react-icons/fi'

import bg from '@public/images/auth_bg.jpg'
import { AuthPage } from "@components/pages/auth";
import { useGo, useIsAuthenticated } from "@refinedev/core";
import Loading from "@components/loading/Loading";

export default function Login() {

  const { isLoading, data } = useIsAuthenticated();
  const go = useGo();

  if (isLoading) {
    <Loading />
  }

  if (data?.authenticated) {
    go({to:"/", type: "replace"});
  }

  return (
    <div className="w-full h-full bg-no-repeat bg-center" style={{
      backgroundImage: `url(${bg.src})`,
      backgroundSize: '1040px'
    }}>
      <div className="flex items-center justify-center h-full flex-col">
      <h1 className="text-xl mb-4 bg-white font-bold leading-tight tracking-tight text-gray-900 lg:text-4xl md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
        <div className="auth-wrapper bg-white shadow-lg rounded-lg w-2/4 max-w-xl p-5">
          <AuthPage
            type="login"
            providers={[
              {
                name: 'github',
                icon: <FiGithub />,
                label: 'Sign in with github'
              }
            ]}
            contentProps={{
              title: "login",
              className: "auth-form-wrapper"
            }}
            renderContent={(content) => (
              <>
                {content}
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  console.log(context.req.headers.cookie);
  const { authenticated } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
