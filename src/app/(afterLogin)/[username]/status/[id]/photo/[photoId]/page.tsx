import Home from "@/app/(afterLogin)/home/page";

interface Props {
  params: { username: string; id: string; photoId: string };
}

const Page = ({ params }: Props) => {
  params.username; // elonmusk
  params.id; // 1
  params.photoId; // 1
  return <Home />;
};

export default Page;
