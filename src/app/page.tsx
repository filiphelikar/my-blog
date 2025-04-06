import Blogs from "@/components/Blogs";
import { Blog } from "@/db/schema";
import { getServersideBlogs } from "@/utils/functions";
import Link from "next/link";

const Homepage = async () => {
 const blogs: Blog[] = await getServersideBlogs("/api/blogs")
    return (
        <div className="transition">
            <h1 className="p-3 text-4xl md:text-5xl xl:text-6xl sm:leading-20 leading-15 text-center mt-40 xl:mt-100 text-gradient font-(family-name:--font-boldonse)">Aeternum Scriptum, Franz Perditum</h1>
            <p className="text-1xl xl:text-2xl text-center mt-10 md:mt-70">Hey you! You can <Link className="text-violet-600 text-gradient" href="/create">write your own blog</Link>, powered by Next.js for a seamless user experience and enhanced SEO.</p>
            <p className="text-1xl xl:text-2xl text-center mb-20 xl:mb-60 ">And yes, we’re ahead of <a className="underline" target="blank" href="https://blog.franzhirt.com">{'"blog.franzhirt.com"'}</a></p>
            <h2 className="text-1xl xl:text-2xl mb-0 xl:mb-10">Latest posts:</h2>
            <Blogs blogs={blogs}/>
        </div>
    );
}
export default Homepage