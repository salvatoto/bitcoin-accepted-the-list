import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GridProvider } from "../components/providers-grid";
import { fetchProvider, fetchProviderImageUrl } from "../lib/api/api";
import Icon, { IconType } from "@/components/icons/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { icon, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import {
  faEnvelope,
  faMap,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";

// TODO:
// 0. Add whatsapp icon
// 1. Contact is phone first, then WhatsApp, then email, then disabled
// 2. Loading spinner
// 5. Hook up remaining fields

// TODO:  later
// 6. Add image carousel

const ProviderDetail: React.FC = () => {
  const router = useRouter();
  const [provider, setProvider] = useState<GridProvider | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (router.query.id) {
        try {
          const fetchedProvider = await fetchProvider(router.query.id);
          const imageUrl = await fetchProviderImageUrl(
            router.query.id.toString()
          );
          setProvider({ ...fetchedProvider, imageUrl });
        } catch (error) {
          console.error("Error fetching provider:", error);
        }
      }
    };

    fetchData();
  }, [router.query.id]);

  if (!provider) {
    return <div>Loading...</div>;
  }

  const {
    id,
    name,
    location,
    services,
    description,
    email,
    phone,
    twitter,
    instagram,
    website,
    nostr,
    imageUrl,
  } = provider;

  return (
    <div className="mx-auto my-32 flex h-auto max-w-full flex-wrap items-start lg:my-16 lg:h-screen">
      {/* Main Col */}
      <div
        id="profile"
        className="mx-6 w-full rounded-lg bg-white shadow-2xl lg:mx-0 lg:w-1/2 lg:rounded-lg"
      >
        <div className="p-4 text-center md:p-12 lg:text-left">
          {/* Image for mobile view */}
          <div className="mx-auto -mt-16 block h-48 w-48 rounded-full bg-cover bg-center shadow-xl lg:hidden">
            <Image
              src={imageUrl || "/bitcoin_logo_00.png"}
              alt="Image"
              width={200}
              height={200}
              className="rounded-full shadow-xl"
            />
          </div>

          {/* Details */}
          <h1 className="pt-8 text-3xl font-bold lg:pt-0">{name}</h1>
          <div className="mx-auto w-4/5 border-b-2 border-green-500 pt-3 opacity-25 lg:mx-0"></div>
          <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
            <FontAwesomeIcon
              icon={faUserNinja}
              className="text-md h-4 fill-current pr-4 text-green-700"
              style={{ minWidth: "2.5em" }}
            />
            {services.join(", ")}
          </p>
          <p className="flex items-center justify-center pt-2 text-sm text-gray-600 lg:justify-start lg:text-base">
            <FontAwesomeIcon
              icon={faMap}
              className="text-md h-4 fill-current pr-4 text-green-700"
              style={{ minWidth: "2.5em" }}
            />
            {location}
          </p>
          <p className="pt-8 text-sm">{description}</p>

          <div className="pb-8 pt-12">
            <a
              href={`whatsapp://send?phone=${phone}`}
              className="inline-block rounded-full bg-green-700 px-4 py-2 text-center font-bold text-white hover:bg-green-900"
            >
              Get In Touch
            </a>
          </div>

          <div className="mx-auto mt-6 flex w-4/5 flex-wrap items-center justify-between pb-16 lg:w-full lg:pb-0">
            <a
              className="link"
              href={email ? `mailto:${email}` : ""}
              data-tippy-content={`@${email}`}
              onClick={email ? undefined : (e) => e.preventDefault()}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className={
                  email ? `contact-icon-style` : `contact-icon-inactive-style`
                }
              />
            </a>
            <a
              className="link"
              href={website ? `${website}` : ""}
              data-tippy-content={`@${website}`}
              onClick={website ? undefined : (e) => e.preventDefault()}
            >
              <Icon
                type={IconType.WEBSITE}
                className={
                  website ? `contact-icon-style` : `contact-icon-inactive-style`
                }
              />
            </a>
            <a
              className="link"
              href={twitter ? `https://twitter.com/${twitter}` : ""}
              data-tippy-content={`@${twitter}`}
              onClick={twitter ? undefined : (e) => e.preventDefault()}
            >
              <Icon
                type={IconType.TWITTER}
                className={
                  twitter ? `contact-icon-style` : `contact-icon-inactive-style`
                }
              />
            </a>
            <a
              className="link"
              href={instagram ? `https://instagram.com/${instagram}` : ""}
              data-tippy-content={`@${instagram}`}
              onClick={instagram ? undefined : (e) => e.preventDefault()}
            >
              <Icon
                type={IconType.INSTAGRAM}
                className={
                  instagram
                    ? `contact-icon-style`
                    : `contact-icon-inactive-style`
                }
              />
            </a>
            <a
              className="link"
              href={nostr ? `https://nostr.com/${nostr}` : ""}
              data-tippy-content={`@${nostr}`}
              onClick={nostr ? undefined : (e) => e.preventDefault()}
            >
              <Icon
                type={IconType.NOSTR}
                className={
                  nostr ? `contact-icon-style` : `contact-icon-inactive-style`
                }
              />
            </a>
          </div>
        </div>
      </div>

      {/* Img Col */}
      <div className="w-full lg:mx-8 lg:w-2/5">
        {/* Big profile image for side bar (desktop) */}
        <img
          src={imageUrl || "/bitcoin_logo_00.png"}
          className="hidden rounded-none shadow-2xl lg:block lg:rounded-lg "
          style={{ width: "400px", height: "400px" }}
        />

        {/* Bitcoin accepted logo - Placeholder for image carousel */}
        <img
          className="mt-8 hidden w-full rounded-lg bg-gray-200 p-4 shadow-lg lg:block"
          src="/bitcoin_accepted_black.png"
          style={{ maxWidth: "400px" }}
          alt="Bitcoin Accepted Here"
        />
      </div>
    </div>
  );
};

export default ProviderDetail;
