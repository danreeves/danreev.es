import { createContext, ReactElement, useContext } from "react";

const LangContext = createContext<string | null>(null);

export function useLang() {
  const lang = useContext(LangContext);

  if (!lang) {
    throw new Error("Used outide LangContext");
  }
  return lang;
}

export function LangProvider({
  lang,
  children,
}: {
  lang: string;
  children: ReactElement;
}) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}
