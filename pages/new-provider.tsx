import { useState, useEffect, SetStateAction } from "react";
import Container from "@/components/container";
import NewProviderForm from "@/components/new-provider-form";
import Alert from "@/components/alert";
import { useRouter } from "next/router";

export default function NewProviderPage({}) {
  const [alertMessage, setAlertMessage] = useState("");
  const updateAlertMessage = (message: string) => {
    setAlertMessage(message);
  };

  return (
    <>
      <Container>
        <div className="mx-auto flex w-full flex-col items-center py-8 sm:w-4/5 md:w-3/5">
          {alertMessage && <Alert alertMessage={alertMessage} />}
          <NewProviderForm updateAlertMessage={updateAlertMessage} />
        </div>
      </Container>
    </>
  );
}
