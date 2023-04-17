export const fetchData = async () => {
  const response = await fetch("/data/mock-data.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const jsonData = await response.json();

  return jsonData;
};
