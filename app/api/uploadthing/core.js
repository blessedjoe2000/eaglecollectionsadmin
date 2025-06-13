import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

// const handleAuth = async () => {
//   const isAdmin = await isAdminRequest();

//   if (!isAdmin) throw new Error("Unauthorized");
//   return { isAdmin };
// };

export const ourFileRouter = {
  courseImage: f({
    image: { maxFileSize: "6MB", maxFileCount: 1 },
  })
    // .middleware(handleAuth)
    .onUploadComplete(async ({ file }) => {
      const extension = file.name?.split(".").pop();
      const fullUrl = `${file.ufsUrl}.${extension}`;
      return { fileUrl: fullUrl, fileType: file.type };
    }),

  courseVideo: f({
    video: { maxFileSize: "25GB", maxFileCount: 1 },
  })
    // .middleware(handleAuth)
    .onUploadComplete(async ({ file }) => {
      const extension = file.name?.split(".").pop();
      const fullUrl = `${file.ufsUrl}.${extension}`;
      return { fileUrl: fullUrl, fileType: file.type };
    }),
};

export default ourFileRouter;
