import Container from "@/components/container";
import NewProviderForm from "@/components/new-provider-form";
import { useRouter } from "next/router";

export default function NewProviderPage({}) {
  // const router = useRouter();
  // router.query.showGetOnListLink = "false";

  return (
    <>
      <Container>
        <div className="w-full sm:w-4/5 md:w-3/5 flex flex-col items-center py-8 mx-auto">
          <NewProviderForm />
        </div>
      </Container>
    </>
  );
}
