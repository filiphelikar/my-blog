
import Blogs from "@/components/Blogs";
import Link from "next/link";


const Homepage = () => {


    return (
        <div className="transition">
            <h1 className="p-3 text-4xl md:text-5xl xl:text-6xl sm:leading-20 leading-15 text-center mt-40 xl:mt-100 xl:mt-80 text-gradient font-(family-name:--font-boldonse)">Aeternum Scriptum, Franz Perditum</h1>
            <p className="text-1xl xl:text-2xl text-center mt-10 md:mt-70">Hey you! You can <Link className="text-violet-800 text-gradient" href="/#">write your own blog</Link>, powered by Next.js for a seamless user experience and enhanced SEO.</p>
            <p className="text-1xl xl:text-2xl text-center ">And yes, we’re ahead of <a className="underline" href="https://blog.franzhirt.com">{'"blog.franzhirt.com"'}</a></p>
            <Blogs />
        </div>
    );
}
export default Homepage