import { useEffect, useState } from "react";

export function useProfile() {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/profile", {}).then((res) => {
      res.json().then((data) => {
        setData(data);
        setIsLoading(false);
      });
    });
  }, []);

  return { isLoading, data };
}
