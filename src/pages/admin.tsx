import type { ContactFormSubmission } from "@prisma/client";
import { LoadingSpinner } from "components/loadingSpinner";
import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "server/auth";
import { api } from "utils/api";
import DataTableBase from "components/dataTable";

const cols: {
  name: string;
  selector: (r: ContactFormSubmission) => number | string;
}[] = [
  {
    name: "Name",
    selector: (r) => r.name,
  },
  {
    name: "Email",
    selector: (r) => r.email || "none",
  },
  {
    name: "Phone",
    selector: (r) => r.phone || "none",
  },
  {
    name: "Created At",
    selector: (r) => r.createdAt.toLocaleString(),
  },
];

export default function Admin() {
  const { data, error, ...q } = api.contact.list.useQuery();

  if (q.isError) return error?.message;
  if (q.isLoading || !data) return <LoadingSpinner />;

  return data ? (
    <>
      <h1 className="font-bold">Contact Form Submissions</h1>
      <DataTableBase columns={cols} data={data} />
    </>
  ) : null;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);
  if (!session?.user?.isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
