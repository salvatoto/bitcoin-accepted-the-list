import { useEffect, useState } from "react";
import { fetchProviders, fetchProviderImageUrl } from "../lib/api/api";
import ProviderCard from "./provider-card";

type Provider = {
  id: string;
  name: string;
  location: string[];
  services: string[];
  description?: string;
  imageUrl?: string;
};

const ProvidersGrid = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProviders();

        // Fetch image URLs for each provider
        const dataWithImages = await Promise.all(
          data.map(async (provider: Provider) => {
            return { ...provider, imageUrl: "" };
          })
        );

        setProviders(dataWithImages);

        await Promise.all(
          dataWithImages.map(async (provider: Provider, index: number) => {
            const imageUrl = await fetchProviderImageUrl(provider.id);

            const updatedProvider = { ...provider, imageUrl };
            setProviders((prevProviders) => {
              const updatedProviders = [...prevProviders];
              updatedProviders[index] = updatedProvider;
              return updatedProviders;
            });
          })
        );
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {providers.map((provider) => (
        <ProviderCard
          key={provider.id}
          id={provider.id}
          name={provider.name}
          location={provider.location}
          services={provider.services}
          description={provider.description ?? ""}
          imageUrl={provider.imageUrl ?? ""}
          onLocationClick={function (location: string): void {
            // TODO: Filter by Location
          }}
          onServiceClick={function (service: string): void {
            // TODO: Filter by Service
          }}
        />
      ))}
    </div>
  );
};

export default ProvidersGrid;
