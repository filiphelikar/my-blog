export async function getBlogs(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
    }
    return res.json();
}

export async function getServersideBlogs(url: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        cache: 'no-store' 
    });

    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
    }

    return res.json();
}

