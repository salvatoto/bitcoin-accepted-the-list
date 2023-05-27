import React from "react";
import { GridProvider } from "./providers-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faUserNinja } from "@fortawesome/free-solid-svg-icons";

type ProviderCardProps = {
  provider: GridProvider;
  onLocationClick: (location: string) => void;
  onServiceClick: (service: string) => void;
};

const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onLocationClick,
  onServiceClick,
}) => {
  const { id, name, location, services, description } = provider;
  const handleLocationClick = (loc: string) => {
    onLocationClick(loc);
  };
  const handleServiceClick = (service: string) => {
    onServiceClick(service);
  };

  return (
    <div className="flex h-full flex-col rounded-lg border bg-white p-4">

      {/* Image */}
      <div className="relative h-64 w-full">
  {provider.imageUrl ? (
    <img
      src={provider.imageUrl}
      alt={name ?? ""}
      className="h-64 w-full rounded object-cover"
    />
  ) : (
    <div className="h-64 w-full rounded bg-gray-200"></div>
  )}
  <img
    src="/bitcoin_accepted_hand.png"
    alt="Watermark"
    className="absolute bottom-3 right-2 h-10 w-auto opacity-40" 
  />
</div>

      {/* {provider.imageUrl ? (
        <img
          src={provider.imageUrl}
          alt={name ?? ""}
          className="h-64 w-full rounded object-cover"
        />
      ) : (
        <div className="h-64 w-full rounded bg-gray-200"></div>
      )} */}

      {/* Name */}
      <h2 className="mb-4 mt-4 text-xl font-bold">{name}</h2>

      {/* Line Separator */}
      <div className="w-4/6 border-b-2 border-green-500 opacity-75 mx-0"></div>

      {/* Services */}
      <div className="ml-1 mt-4 flex items-center">
        <FontAwesomeIcon
          icon={faUserNinja}
          className="text-md mr-2 h-4 fill-current text-green-700"
          style={{ minWidth: "2.5em" }}
        />
        <div className="flex flex-wrap">
          {services.map((service) => (
            <button
              key={service}
              className="card-element-button font-semibold"
              onClick={() => handleServiceClick(service)}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="ml-1 mt-2 flex items-center">
          <FontAwesomeIcon
            icon={faMap}
            className="text-md mr-2 h-4 fill-current text-green-700"
            style={{ minWidth: "2.5em" }}
          />
          <div className="flex flex-wrap">
          {location.map((loc) => (
            <button
              key={loc}
              className="card-element-button"
              onClick={() => handleLocationClick(loc)}
            >
              {loc}
            </button>
          ))}
          </div>
      </div>

      {/* Description */}
      {description && (
        <div className="mt-2">
          {/* <h4 className="card-element-title-style">Description</h4> */}
          <p className="mt-4 line-clamp-3">{description}</p>
        </div>
      )}
    </div>
  );
};

export default ProviderCard;
