export const fetchRestaurants = async () => {
  const res = await fetch("http://localhost:3000/restaurant"); 
  if (!res.ok) {
    throw new Error("Failed to fetch restaurants");
  }
  return res.json();
};


export const fetchFood = async () => {
  const res = await fetch("http://localhost:3000/food"); 
  if (!res.ok) {
    throw new Error("Failed to fetch restaurants");
  }
  return res.json();
};