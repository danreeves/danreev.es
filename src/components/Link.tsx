"use client";
import { useLayoutEffect } from "react";

export function Link(props: React.ComponentProps<"a">) {
  useLayoutEffect(() => {
    const firstLink = document.querySelector("a.first");
    if (firstLink) {
      firstLink.classList.remove("first");
    }
    document.querySelector("a")?.classList.add("first");
  }, []);

  return (
    <a
      {...props}
      className="text-orange-500 outline-0"
      onMouseOver={(event) => {
        const firstLink = document.querySelector("a.first");
        if (firstLink) {
          firstLink.classList.remove("first");
        }
        event.currentTarget.classList.add("first");
      }}
      onFocus={(event) => {
        const firstLink = document.querySelector("a.first");
        if (firstLink) {
          firstLink.classList.remove("first");
        }
        event.currentTarget.classList.add("first");
      }}
    />
  );
}
