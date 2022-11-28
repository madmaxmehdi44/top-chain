import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getLohe from "src/lohes/queries/getLohe";
import updateLohe from "src/lohes/mutations/updateLohe";
import { LoheForm, FORM_ERROR } from "src/lohes/components/LoheForm";

export const EditLohe = () => {
  const router = useRouter();
  const loheId = useParam("loheId", "number");
  const [lohe, { setQueryData }] = useQuery(
    getLohe,
    { id: loheId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateLoheMutation] = useMutation(updateLohe);

  return (
    <>
      <Head>
        <title>Edit Lohe {lohe.id}</title>
      </Head>

      <div>
        <h1>Edit Lohe {lohe.id}</h1>
        <pre>{JSON.stringify(lohe, null, 2)}</pre>

        <LoheForm
          submitText="Update Lohe"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateLohe}
          initialValues={lohe}
          onSubmit={async (values) => {
            try {
              const updated = await updateLoheMutation({
                id: lohe.id,
                ...values,
              });
              await setQueryData(updated);
              await router.push(Routes.ShowLohePage({ loheId: updated.id }));
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditLohePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditLohe />
      </Suspense>

      <p>
        <Link href={Routes.LohesPage()}>
          Lohes
        </Link>
      </p>
    </div>
  );
};

EditLohePage.authenticate = true;
EditLohePage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditLohePage;
