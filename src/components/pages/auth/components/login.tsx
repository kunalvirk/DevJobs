import React, { useState } from "react";
import {
  LoginPageProps,
  LoginFormTypes,
  useRouterContext,
  useLink,
  useRouterType,
  useLogin,
  useTranslate,
  useActiveAuthProvider,
} from "@refinedev/core";

type DivPropsType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type FormPropsType = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type LoginProps = LoginPageProps<DivPropsType, DivPropsType, FormPropsType>;

export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: login } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const renderLink = (link: string, text?: string) => {
    return <ActiveLink to={link} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">{text}</ActiveLink>;
  };

  const renderProviders = () => {
    if (providers) {
      return providers.map((provider) => (
        <div
          key={provider.name}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={() =>
              login({
                providerName: provider.name,
              })
            }
            className="flex justify-center items-center px-8 bg-gray-800 border-blue-400 border-solid h-11 rounded-full py-1 text-white  hover:text-blue-400 cursor-pointer transition duration-200 hover:animate-pulse"
          >
            <span className="mr-2">{provider?.icon}</span>
            {provider.label ?? <label>{provider.label}</label>}
          </button>
        </div>
      ));
    }
    return null;
  };

  const content = (
    <div {...contentProps}>
      {/* <h1 style={{ textAlign: "center" }}>
        {translate("pages.login.title", "Sign in to your account")}
      </h1> */}
      
      {renderProviders()}
      
      <hr />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit")
          login({ email, password, remember });
        }}
        {...formProps}
        className="mt-4 space-y-4 md:space-y-6"
      >
          <div>
            <label htmlFor="email-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {translate("pages.login.fields.email", "Email")}
            </label>
            <input
              id="email-input"
              name="email"
              type="text"
              size={20}
              autoCorrect="off"
              spellCheck={false}
              autoCapitalize="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {translate("pages.login.fields.password", "Password")}
            </label>
            <input
              id="password-input"
              type="password"
              name="password"
              required
              size={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          
          {rememberMe ?? (
            <>
              <div className="flex items-center justify-between">
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember-me-input"
                          name="remember"
                          type="checkbox"
                          size={20}
                          checked={remember}
                          value={remember.toString()}
                          onChange={() => {
                            setRemember(!remember);
                          }}
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember-me-input" className="text-gray-500 dark:text-gray-300">{translate("pages.login.buttons.rememberMe", "Remember me")}</label>
                      </div>
                  </div>

                  {forgotPasswordLink ??
                  renderLink(
                    "/forgot-password",
                    translate(
                      "pages.login.buttons.forgotPassword",
                      "Forgot password?"
                    )
                  )}
              </div>
            </>
          )}
          
          <input
            type="submit"
            value={translate("pages.login.signin", "Sign in")}
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          />

          {registerLink ?? (
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {translate(
                "pages.login.buttons.noAccount",
                "Don’t have an account?"
              )}{" "}
              {renderLink(
                "/register",
                translate("pages.login.register", "Sign up")
              )}
            </p>
          )}
      </form>
    </div>
  );

  return (
    <div {...wrapperProps}>
      {renderContent ? renderContent(content, title) : content}
    </div>
  );
};
