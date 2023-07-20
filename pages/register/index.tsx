import { AuthPage } from "@components/pages/auth";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import bg from '@public/images/auth_bg.jpg'
import { authProvider } from "src/authProvider";

export default function Register() {
  return (
    <>
    <div className="w-full h-full bg-no-repeat bg-center" style={{
      backgroundImage: `url(${bg.src})`,
      backgroundSize: '1040px'
    }}>
      <div className="flex items-center justify-center h-full flex-col">
      <h1 className="text-xl mb-4 font-bold leading-tight tracking-tight bg-white text-gray-900 lg:text-4xl md:text-2xl dark:text-white">
                  Create an account
              </h1>
        <div className="auth-wrapper bg-white shadow-lg rounded-lg w-2/4 max-w-xl p-5">
        <AuthPage type="register" />
      </div>
      </div>
    </div>
    </>
  );
}

Register.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
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
