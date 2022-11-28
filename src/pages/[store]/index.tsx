import { Suspense } from "react"
import { useParam, BlitzPage } from "@blitzjs/next"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import Head from "next/head"
import { useRouter } from "next/router"
import Link from "next/link"

import Layout from "src/core/layouts/Layout"
import getOrganizations from "src/organizations/queries/getOrganizations"

const ITEMS_PER_PAGE = 100

export const Organizations = () => {
  const router = useRouter()
  const storePermalink = useParam("store", "string")
  const page = Number(router.query.page) || 0
  const [{ organizations, hasMore }] = usePaginatedQuery(getOrganizations, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  const orgiorgi = organizations.map((org) => {
    return (
      <>
        <div className="flex-1 gap-2 box-content">
          <h1 className="bg-red-400 animate-pulse shadow-lg">ORG Name: {org.name}</h1>
          <h2>{org.id}</h2>
          <h2 className="bg-red-100">{storePermalink}</h2>
          <pre>{JSON.stringify(org, null, 2)}</pre>
        </div>
      </>
    )
  })

  return (
    <>
      <Head>
        <title>{}</title>
      </Head>
      <div className="">
        {orgiorgi}
        <button className="" disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
      </div>
    </>
  )
}

const ShowStorePage: BlitzPage = () => {
  return (
    <div>
      <p>
      <Link href={"/stores"}>
          Stores
        </Link>

        <Link href={"/"}>
           Main
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Organizations />
      </Suspense>
    </div>
  );
}

ShowStorePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowStorePage
