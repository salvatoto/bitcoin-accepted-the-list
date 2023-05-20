import React from "react";
import Image from "next/image";

type ProviderCardProps = {
  id: string;
  name: string;
  location: string;
  services: string;
  imageUrl: string;
};

const ProviderCard: React.FC<ProviderCardProps> = ({
  id,
  name,
  location,
  services,
  imageUrl,
}) => {
  return (
    <div className="rounded-lg p-4 border border-gray-200">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          className="w-full h-64 object-cover rounded"
          width={500}
          height={500}
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded"></div>
      )}
      <h2 className="text-xl mt-4">{name}</h2>
      <p>{location}</p>
      <p>{services}</p>
    </div>
  );
};

export default ProviderCard;
