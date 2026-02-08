import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //step20 add cache control to the api route to cache the response for 1 hour, you can use the same prompt to generate the code or you can use junie to generate the code, both will work just fine, we have tested both and they work just fine, you can choose either one of them to generate the code, we have also added comments to explain the code, you can read the comments to understand the code better, if you have any questions feel free to ask us, we are here to help you.
  cacheComponents: true,


  //step11 add the following to next.config.ts to allow images from cloudinary and set up cloudinary url in env file,install cloudinary package and set up cloudinary in lib/cloudinary.ts, then use cloudinary to upload images in api route and get the image url to save in database, you can use the same prompt to generate the code or you can use junie to generate the code, both will work just fine, we have tested both and they work just fine, you can choose either one of them to generate the code, we have also added comments to explain the code, you can read the comments to understand the code better, if you have any questions feel free to ask us, we are here to help you.
  images: {
   remotePatterns: [
     {
       protocol: 'https',
       hostname: 'res.cloudinary.com',
     },
   ],
  },
};

export default nextConfig;
