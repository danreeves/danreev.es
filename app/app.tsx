import { Suspense } from "react";
import About from "./pages/about.tsx";
import Writing from "./pages/writing.tsx";
import Article from "./pages/article.tsx";
import { Footer } from "./common/footer.tsx";
import { Header } from "./common/header.tsx";
import { Route } from "./common/router.tsx";

export default function App({ path, lang }: { path: string; lang: string }) {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>loading...</div>}>
          <Route path="/">
            <About />
          </Route>
          <Route path="/writing">
            <Writing />
          </Route>
          <Route path="/writing/:slug">
            <Article />
          </Route>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
