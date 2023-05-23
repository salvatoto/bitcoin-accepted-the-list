import { useEffect, useState } from "react";
import { fetchProviders, fetchProviderImageUrl } from "../lib/api/api";
import { Provider as PrismaProvider } from "@prisma/client";
import ProviderCard from "./provider-card";

export type GridProvider = PrismaProvider & {
  imageUrl?: string;
};

const ProvidersGrid = () => {
  const [providers, setProviders] = useState<GridProvider[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProviders();

        // Fetch image URLs for each provider
        const dataWithImages = await Promise.all(
          data.map(async (provider: GridProvider) => {
            return { ...provider, imageUrl: "" };
          })
        );

        setProviders(dataWithImages);

        await Promise.all(
          dataWithImages.map(async (provider: GridProvider, index: number) => {
            const imageUrl = await fetchProviderImageUrl(
              provider.id.toString()
            );

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {providers.map((provider) => (
        <ProviderCard
          provider={provider}
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
