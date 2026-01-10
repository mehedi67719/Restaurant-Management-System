export const fetchRestaurants = async () => {
    const res = await fetch("https://restaurant-management-system-server-lime.vercel.app/restaurant");
    if (!res.ok) {
        throw new Error("Failed to fetch restaurants");
    }
    return res.json();
};


export const fetchFood = async () => {
    const res = await fetch("https://restaurant-management-system-server-lime.vercel.app/food");
    if (!res.ok) {
        throw new Error("Failed to fetch Food");
    }
    return res.json();
};



export const fetchAddToCart = async (userEmail) => {
    if (!userEmail) throw new Error("User email is required");
    const res = await fetch(`https://restaurant-management-system-server-lime.vercel.app/addtocart/${userEmail}`);
    if (!res.ok) throw new Error("Failed to fetch add to cart data");
    return res.json();


};


export const fetchfoodbyemail = async (userEmail) => {
    if (!userEmail) throw new Error("User email is required");
    const res = await fetch(`https://restaurant-management-system-server-lime.vercel.app/food/${userEmail}`);
    if (!res.ok) throw new Error("Failed to fetch food data");
    return res.json();


};


export const fetchuser = async () => {
 
    const res = await fetch(`https://restaurant-management-system-server-lime.vercel.app/user`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
};


export const fetchapproveRestaurants = async () => {
    const res = await fetch("https://restaurant-management-system-server-lime.vercel.app/approverestaurant?status=approved");
    if (!res.ok) {
        throw new Error("Failed to fetch restaurants");
    }
    return res.json();
};


export const fetchapproveFood = async () => {
    const res = await fetch("https://restaurant-management-system-server-lime.vercel.app/approvefood?status=approved");
    if (!res.ok) throw new Error("Failed to fetch Food");
    return res.json();
};


