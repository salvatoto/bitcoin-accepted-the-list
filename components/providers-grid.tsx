import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchProviders, fetchProviderImageUrl } from "../lib/api/api";
import { Provider as PrismaProvider } from "@prisma/client";
import ProviderCard from "./provider-card";
import Lottie from "lottie-react";
import bitcoinLoadingAnimation from "./lottie/bitcoin-animated-00.json";

export type GridProvider = PrismaProvider & {
  imageUrl?: string;
};

const ProvidersGrid = () => {
  const [providers, setProviders] = useState<GridProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceFilter, setServiceFilter] = useState<string | undefined>(undefined);
  const [locationFilter, setLocationFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        // Fetch providers
        const data = await fetchProviders(serviceFilter, locationFilter);
  
        // Fetch images
        const updatedProviders = await Promise.all(
          data.map(async (provider: GridProvider) => {
            const imageUrl = await fetchProviderImageUrl(
              provider.id.toString()
            );
  
            return { ...provider, imageUrl };
          })
        );
  
        setProviders(updatedProviders);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching providers:", error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [serviceFilter, locationFilter]);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Lottie
            animationData={bitcoinLoadingAnimation}
            style={{ width: 400, height: 400 }}
          />
        </div>
      ) : (
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
                    setLocationFilter(location);
                  }}
                  onServiceClick={function (service: string): void {
                    setServiceFilter(service);
                  }}
                />
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProvidersGrid;
