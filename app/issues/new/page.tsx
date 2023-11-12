// when refresh page the Markdown delay after title render because dynamic import
// how to make a loading skeleton when refresh page
// import IssueForm from "../_components/IssueForm";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
//https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading for more lazy load

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
