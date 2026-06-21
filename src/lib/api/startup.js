export const getAllStartups = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/startups`);
    return res.json();
};