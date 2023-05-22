import Container from "./container";
import cn from "classnames";
import { EXAMPLE_PATH } from "../lib/constants";

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn("border-b", {
        "border-neutral-800 bg-neutral-800 text-white": preview,
        "border-neutral-200 bg-neutral-50": !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This page is a preview.{" "}
              <a
                href="/api/exit-preview"
                className="underline transition-colors duration-200 hover:text-teal-300"
              >
                Click here
              </a>{" "}
              to exit preview mode.
            </>
          ) : (
            <>
              <a
                href={``}
                className="underline transition-colors duration-200 hover:text-blue-600"
              ></a>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Alert;
