import Head from "next/head";

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Slogan from "@/components/Slogan";
import Market from "@/components/Market";
import { FiltersProvider } from "@/context/FiltersContext";

export default function Home() {
  return (
    <>
      <Head>
        <title>Domenebi</title>
        <meta name="description" content="Domenebi.ge try it out" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="main">
        <Header />
        <NavBar />
        <Slogan />
        <FiltersProvider>
          <Market />
        </FiltersProvider>
      </div>
    </>
  );
}
