export const fetchRoute = async (route : string) => {
  const response = await fetch(route);
  const data = await response.json();
  return data; 
}