import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import getOrganizations from "src/organizations/queries/getOrganizations";

const ITEMS_PER_PAGE = 100;

export const OrganizationsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ organizations, hasMore }] = usePaginatedQuery(getOrganizations, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {organizations.map((organization) => (
          <li key={organization.id}>
            <Link
              href={Routes.ShowOrganizationPage({
                organizationId: organization.id,
              })}
            >
              {organization.name}
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const OrganizationsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Organizations</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewOrganizationPage()}>
            Create Organization
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <OrganizationsList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default OrganizationsPage;
