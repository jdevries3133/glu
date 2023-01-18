import { LoadingSpinner } from "components/loadingSpinner";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getServerAuthSession } from "server/auth";
import { api } from "utils/api";

export default function Admin() {
  const { data, error, ...q } = api.contact.list.useQuery();

  if (q.isError) return error?.message;
  if (q.isLoading || !data) return <LoadingSpinner />;

  return data.map(({ id, name, email, phone, createdAt }) => (
    <p key={id}>
      name: {name} email: {email} phone: {phone} createdAt:{" "}
      {createdAt.toLocaleString()}
    </p>
  ));
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
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
