import { useEffect, useState } from "react";

export function useProfile(second) {
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

  return { data, isLoading };
}
