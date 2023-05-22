import Container from "./container";
import cn from "classnames";

type Props = {
  alertMessage?: string;
  backgroundColor?: string;
};

const Alert = ({ alertMessage, backgroundColor }: Props) => {
  if (!alertMessage) {
    return null;
  }

  const alertClassName = cn(
    "fixed top-0 left-0 w-full bg-red-400 border-b border-neutral-200 z-50",
    backgroundColor
  );

  return (
    <div className={alertClassName}>
      <Container>
        <div className="py-2 text-center text-sm">
          <p className="underline transition-colors duration-200 hover:text-blue-600">
            {alertMessage}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Alert;
