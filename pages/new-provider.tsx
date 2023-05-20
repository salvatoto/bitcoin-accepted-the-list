import Container from "@/components/container";
import NewProviderForm from "@/components/new-provider-form";

export default function NewProvider({}) {
  return (
    <>
      <Container>
        <div className="flex flex-col items-center py-8 m-16">
          <NewProviderForm />
        </div>
      </Container>
    </>
  );
}
