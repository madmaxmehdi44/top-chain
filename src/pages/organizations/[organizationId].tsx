import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getOrganization from "src/organizations/queries/getOrganization";
import deleteOrganization from "src/organizations/mutations/deleteOrganization";

export const Organization = () => {
  const router = useRouter();
  const organizationId = useParam("organizationId", "number");
  const [deleteOrganizationMutation] = useMutation(deleteOrganization);
  const [organization] = useQuery(getOrganization, { id: organizationId });

  return <>
    <Head>
      <title>Organization {organization.id}</title>
    </Head>

    <div>
      <h1>Organization {organization.id}</h1>
      <pre>{JSON.stringify(organization, null, 2)}</pre>

      <Link
        href={Routes.EditOrganizationPage({
          organizationId: organization.id,
        })}
      >
        Edit
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteOrganizationMutation({ id: organization.id });
            await router.push(Routes.OrganizationsPage());
          }
        }}
        style={{ marginLeft: "0.5rem" }}
      >
        Delete
      </button>
    </div>
  </>;
};

const ShowOrganizationPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.OrganizationsPage()}>
          Organizations
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Organization />
      </Suspense>
    </div>
  );
};

ShowOrganizationPage.authenticate = true;
ShowOrganizationPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowOrganizationPage;
