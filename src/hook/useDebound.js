import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  const [debounceSearch, setDebounceSearch] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceSearch(value);
    }, delay);

    // xoa ham
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounceSearch;
}