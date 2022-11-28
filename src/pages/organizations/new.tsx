import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "src/core/layouts/Layout";
import createOrganization from "src/organizations/mutations/createOrganization";
import {
  OrganizationForm,
  FORM_ERROR,
} from "src/organizations/components/OrganizationForm";

const NewOrganizationPage = () => {
  const router = useRouter();
  const [createOrganizationMutation] = useMutation(createOrganization);

  return (
    <Layout title={"Create New Organization"}>
      <h1>Create New Organization</h1>

      <OrganizationForm
        submitText="Create Organization"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateOrganization}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const organization = await createOrganizationMutation(values);
            await router.push(
              Routes.ShowOrganizationPage({ organizationId: organization.id })
            );
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.OrganizationsPage()}>
          Organizations
        </Link>
      </p>
    </Layout>
  );
};

NewOrganizationPage.authenticate = true;

export default NewOrganizationPage;
