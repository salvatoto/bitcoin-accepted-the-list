import Link from "next/link";
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
        // Fetch providers
        const data = await fetchProviders();
        setProviders(data);

        // Fetch images
        await Promise.all(
          data.map(async (provider: GridProvider, index: number) => {
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
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-16 md:grid-cols-3 lg:grid-cols-4">
      {providers.map((provider) => (
        <Link
          key={provider.id.toString()}
          href={{
            pathname: "/provider-detail",
            query: { id: provider.id.toString() }, // pass provider id as query parameter
          }}
          legacyBehavior
        >
          <a>
            <ProviderCard
              provider={provider}
              onLocationClick={function (location: string): void {
                // TODO: Filter by Location
              }}
              onServiceClick={function (service: string): void {
                // TODO: Filter by Service
              }}
            />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default ProvidersGrid;
