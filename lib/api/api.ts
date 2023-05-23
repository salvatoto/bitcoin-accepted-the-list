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

export async function createProvider(values: any) {
  const response = await fetch("/api/createProvider", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }

  const data = await response.json();
  return data;
}

export async function uploadProfilePhoto(file: File, userId: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  const response = await fetch("/api/uploadProfilePhoto", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }

  const data = await response.json();
  return data;
}
