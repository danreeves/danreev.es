import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <title>404 - Page not found</title>
      <h1 class="text-4xl font-bold">nothing here..</h1>
      <a href="/">back home</a>
    </>
  );
}
