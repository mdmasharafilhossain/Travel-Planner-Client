import axios from "axios";

interface ImgBBResponse {
  data: {
    url: string;
    display_url: string;
    delete_url?: string;
    thumb?: {
      url: string;
      width: number;
      height: number;
    };
    image: {
      url: string;
      width: number;
      height: number;
    };
  };
  success: boolean;
  status: number;
}

export const imageUpload = async (image: File): Promise<ImgBBResponse> => {
  const formData = new FormData();
  formData.append("image", image);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY || process.env.VITE_IMGBB_KEY;

  if (!apiKey) {
    throw new Error("IMGBB API Key is missing. Set NEXT_PUBLIC_IMGBB_KEY or VITE_IMGBB_KEY.");
  }

  const { data } = await axios.post<ImgBBResponse>(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData
  );

  console.log(data);

  return data;
};
