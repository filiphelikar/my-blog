export async function getBlogs() {
    const res = await fetch("/api/blogs");
    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
    }
    return res.json();
}

export async function getServersideBlogs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`, {
        cache: 'no-store' 
    });

    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
    }

    return res.json();
}

