import Link from "next/link";

export const Card = ({
  bgColor,
  children,
}: {
  children: React.ReactNode;
  bgColor?: string;
}) => (
  <div className={`${bgColor || "bg-gray-100"} prose m-4 rounded p-4`}>
    {children}
  </div>
);

export const LinkCard = ({
  bgColor,
  children,
  linkTo,
}: {
  children: React.ReactNode;
  bgColor?: string;
  linkTo: string;
}) => (
  <Link href={linkTo}>
    <Card bgColor={bgColor}>{children}</Card>
  </Link>
);
