import { Suspense } from "react";
import { Avatar } from "./avatar.tsx";
import { Link } from "./router.tsx";
import { Wave } from "./wave.tsx";

export function Header() {
  return (
    <>
      <header>
        <small className="hello">
          <Wave text="hello, planet." />
          <Suspense>
            <Avatar />
          </Suspense>
        </small>
        <nav>
          <Link to="/">About</Link>
          <Link to="/writing">Writing</Link>
        </nav>
      </header>
    </>
  );
}
