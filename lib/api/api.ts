export async function fetchProviders() {
  const response = await fetch("/api/getProviders");
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data.providers;
}

export async function fetchProviderImageUrl(
  providerId: string
): Promise<string | undefined> {
  const response = await fetch(`/api/getProfilePhoto?userId=${providerId}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { imageUrl } = await response.json();
  return imageUrl;
}
