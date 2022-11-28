import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getLohe from "src/lohes/queries/getLohe";
import deleteLohe from "src/lohes/mutations/deleteLohe";

export const Lohe = () => {
  const router = useRouter();
  const loheId = useParam("loheId", "number");
  const [deleteLoheMutation] = useMutation(deleteLohe);
  const [lohe] = useQuery(getLohe, { id: loheId });

  return <>
    <Head>
      <title>Lohe {lohe.id}</title>
    </Head>

    <div>
      <h1>Lohe {lohe.id}</h1>
      <pre>{JSON.stringify(lohe, null, 2)}</pre>

      <Link href={Routes.EditLohePage({ loheId: lohe.id })}>
        Edit
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteLoheMutation({ id: lohe.id });
            await router.push(Routes.LohesPage());
          }
        }}
        style={{ marginLeft: "0.5rem" }}
      >
        Delete
      </button>
    </div>
  </>;
};

const ShowLohePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.LohesPage()}>
          Lohes
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Lohe />
      </Suspense>
    </div>
  );
};

ShowLohePage.authenticate = true;
ShowLohePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowLohePage;
