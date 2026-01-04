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
        throw new Error("Failed to fetch Food");
    }
    return res.json();
};



export const fetchAddToCart = async (userEmail) => {
    if (!userEmail) throw new Error("User email is required");
    const res = await fetch(`http://localhost:3000/addtocart/${userEmail}`);
    if (!res.ok) throw new Error("Failed to fetch add to cart data");
    return res.json();


};


export const fetchuser = async () => {
 
    const res = await fetch(`http://localhost:3000/user`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
};


export const fetchapproveRestaurants = async () => {
    const res = await fetch("http://localhost:3000/approverestaurant?status=approved");
    if (!res.ok) {
        throw new Error("Failed to fetch restaurants");
    }
    return res.json();
};


export const fetchapproveFood = async () => {
    const res = await fetch("http://localhost:3000/approvefood?status=approved");
    if (!res.ok) throw new Error("Failed to fetch Food");
    return res.json();
};


