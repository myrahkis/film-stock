import { useEffect, useState } from "react";

export function useLocalStorage(key, initList) {
  const [list, setList] = useState(function () {
    const storedVals = localStorage.getItem(key);

    return storedVals ? JSON.parse(storedVals) : initList;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(list));
    },
    [key, list]
  );

  return [list, setList];
}
