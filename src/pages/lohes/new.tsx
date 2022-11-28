import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "src/core/layouts/Layout";
import createLohe from "src/lohes/mutations/createLohe";
import { LoheForm, FORM_ERROR } from "src/lohes/components/LoheForm";

const NewLohePage = () => {
  const router = useRouter();
  const [createLoheMutation] = useMutation(createLohe);

  return (
    <Layout title={"Create New Lohe"}>
      <h1>Create New Lohe</h1>

      <LoheForm
        submitText="Create Lohe"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateLohe}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const lohe = await createLoheMutation(values);
            await router.push(Routes.ShowLohePage({ loheId: lohe.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.LohesPage()}>
          Lohes
        </Link>
      </p>
    </Layout>
  );
};

NewLohePage.authenticate = true;

export default NewLohePage;
