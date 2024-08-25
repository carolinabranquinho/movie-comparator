import { useQuery } from "@tanstack/react-query";
import {
  ConfigurationResponse,
  getConfigurationData,
} from "@/api/configuration";

export type Configuration = {
  secureBaseUrl: string;
  posterSizes: string[];
};

function parseGetConfigurationData(
  configurationResponse: ConfigurationResponse,
): Configuration {
  return {
    secureBaseUrl: configurationResponse.images.secure_base_url,
    posterSizes: configurationResponse.images.poster_sizes,
  };
}

const queryConfiguration = async () => {
  const configurationData = await getConfigurationData();
  return parseGetConfigurationData(configurationData);
};

export function useConfiguration() {
  return useQuery({
    queryKey: ["configuration"],
    queryFn: queryConfiguration,
  });
}
