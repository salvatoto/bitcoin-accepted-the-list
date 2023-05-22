import React from "react";

type ProviderCardProps = {
  id: string;
  name: string;
  location: string[];
  services: string[];
  description: string;
  imageUrl: string;
  onLocationClick: (location: string) => void;
  onServiceClick: (service: string) => void;
};

const ProviderCard: React.FC<ProviderCardProps> = ({
  id,
  name,
  location,
  services,
  description,
  imageUrl,
  onLocationClick,
  onServiceClick,
}) => {
  const handleLocationClick = (loc: string) => {
    onLocationClick(loc);
  };

  const handleServiceClick = (service: string) => {
    onServiceClick(service);
  };

  return (
    <div className="rounded-lg border bg-white p-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-64 w-full rounded object-cover"
        />
      ) : (
        <div className="h-64 w-full rounded bg-gray-200"></div>
      )}
      <h2 className="mb-4 mt-4 text-xl font-bold">{name}</h2>
      <div>
        <h4 className="card-element-title-style">Location</h4>
        <p className="font-semibold">
          {location.map((loc) => (
            <button
              key={loc}
              className="card-element-button"
              onClick={() => handleLocationClick(loc)}
            >
              {loc}
            </button>
          ))}
        </p>
      </div>
      <div>
        <h4 className="card-element-title-style">Services</h4>
        <div className="flex flex-wrap">
          {services.map((service) => (
            <button
              key={service}
              className="card-element-button"
              onClick={() => handleServiceClick(service)}
            >
              {service}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <h4 className="card-element-title-style">Description</h4>
        <p className="mt-1">{description}</p>
      </div>
    </div>
  );
};

export default ProviderCard;
