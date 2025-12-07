interface storageProps {
  key: string;
  value: string;
  ttl: number;
}

export const setItemWitExpiry = (params: storageProps) => {
  const currentDate = new Date();
  const item = {
    value: params.value,
    expiry: currentDate.getTime() + params.ttl,
  };

  localStorage.setItem(params.key, JSON.stringify(item));
};

export const getItemWithExpiry = (key: string) => {
  const itemString = localStorage.getItem(key);
  if (!itemString) return null;

  try {
    const item = JSON.parse(itemString);
    const currentDate = new Date();

    if (currentDate.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
  return null;
};
