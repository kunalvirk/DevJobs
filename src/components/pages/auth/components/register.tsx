import React, { useState } from "react";
import {
  RegisterPageProps,
  useTranslate,
  useRouterContext,
  useLink,
  useRouterType,
  useRegister,
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

type RegisterProps = RegisterPageProps<
  DivPropsType,
  DivPropsType,
  FormPropsType
>;

export const RegisterPage: React.FC<RegisterProps> = ({
  providers,
  loginLink,
  wrapperProps,
  contentProps,
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

  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: register, isLoading } = useRegister({
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
              register({
                providerName: provider.name,
              })
            }
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {provider?.icon}
            {provider.label ?? <label>{provider.label}</label>}
          </button>
        </div>
      ));
    }
    return null;
  };

  const content = (
    <div {...contentProps}>
      {renderProviders()}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register({ email, password });
        }}
        {...formProps}
        className="mt-4 space-y-4 md:space-y-6"
      >
        
        <div>
          <label htmlFor="email-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {translate("pages.register.fields.email", "Email")}
          </label>
          <input
            id="email-input"
            name="email"
            type="email"
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
          <label htmlFor="password-input">
            {translate("pages.register.fields.password", "Password")}
          </label>
          <input
            id="password-input"
            name="password"
            type="password"
            required
            size={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>


          <input
            type="submit"
            value={translate("pages.register.buttons.submit", "Sign up")}
            disabled={isLoading}
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          />

          {loginLink ?? (
            <>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {translate(
                  "pages.login.buttons.haveAccount",
                  "Have an account?"
                )}{" "}
                {renderLink(
                  "/login",
                  translate("pages.login.signin", "Sign in")
                )}
              </p>
            </>
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
