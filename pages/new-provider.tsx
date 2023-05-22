import Container from "@/components/container";
import NewProviderForm from "@/components/new-provider-form";
import { useRouter } from "next/router";

export default function NewProviderPage({}) {
  // const router = useRouter();
  // router.query.showGetOnListLink = "false";

  return (
    <>
      <Container>
        <div className="mx-auto flex w-full flex-col items-center py-8 sm:w-4/5 md:w-3/5">
          <NewProviderForm />
        </div>
      </Container>
    </>
  );
}
