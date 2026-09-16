"use client";
import { useLayoutEffect } from "react";
import { cn } from "../utils/cn.ts";

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
      className={cn("text-black  bg-yellow-300 outline-0", props.className)}
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
