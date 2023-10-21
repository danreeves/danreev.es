import { Suspense } from "react";
import About from "./pages/about.tsx";
import Writing from "./pages/writing.tsx";
import { Footer } from "./common/footer.tsx";
import { Header } from "./common/header.tsx";
import { Route } from "./common/router.tsx";

export default function App({ path, lang }: { path: string; lang: string }) {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>loading...</div>}>
          <Route currentPath={path} path="/">
            <About />
          </Route>
          <Route currentPath={path} path="/writing">
            <Writing />
          </Route>
          <Route currentPath={path} path="/writing/:slug">
            <div>beep</div>
          </Route>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
