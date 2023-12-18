"use client";

import Link from "next/link";
import { useEdgeStore } from "@/lib/edgestore";
import { useState, useEffect, ReactNode } from "react";
import axios from "axios";

export default function Page() {

  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();
  const [progress, setProgress] = useState(0);

  //rest api post
  const [loadingText, setLoadingText] = useState("Please upload ISR (Izin Stasiun Radio) file to continue (png, jpg)");
  const [ISRdata, setISRData] = useState(null);

  useEffect(() => {
    const postData = async () => {
      // console.log("Mulai");
      setLoadingText("Loading...");
      try {
          const apiUrl = 'https://prod-43.southeastasia.logic.azure.com:443/workflows/6c749de62a844d3dbf2f99e71f45f2fb/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=W7V9OK1t036yvXZcFnbG0VSH9ETgeY8t4i9DDqlNcT8'; // Replace with your API endpoint
          const data = {
          // Your JSON data here
          url: urls?.url,
          };

          const response = await axios.post(apiUrl, data);
          // console.log('Response:', response.data);

          setISRData(response.data);
          // Handle the response or update the state as needed
      } catch (error) {
          console.error('Error posting data:', error);
          // Handle the error
      }
    };

    if (urls && urls.url) {
      postData();
    }

  }, [urls?.url]);

  useEffect(() => {

    const setISRdataUseState =async () => {
      // console.log("ISRdata");
      if (ISRdata) {
        // console.log((ISRdata as any)?.Nomor as string);
      }
    }

    if (ISRdata) {
      setISRdataUseState();
    }
  }, [ISRdata]);


  return (
    <div className="flex flex-col items-center m-6 gap-2">
      <input type="file" onChange={(e) => {
        setFile(e.target.files?.[0]);
      }} />

      <div className="h-[6px] w-44 border rounded overflow-hidden">
        <div
        className="h-full bg-black transition-all duration-150"
        style={{
          width: `${progress}%`
        }}/>
      </div>

      <button 
        className=" bg-black Dtext-black rounded px-2 hover:opacity-80 text-white"
        onClick={async () => {
          if (file) {
            const res = await edgestore.myISRImages.upload({ 
              file,
              onProgressChange: (progress) => {
                setProgress(progress);
              }
            });

            setUrls({
              url: res.url,
              thumbnailUrl: res.thumbnailUrl,
            });
          }
        }}>
        Upload
      </button>
      {urls?.url && <img src={urls.url} alt="Image" />}
      {urls?.url && < Link href={urls.url} target="_blank">Inspect</Link>} 
      {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target="_blank"></Link>}


      {ISRdata ? (
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Field</th>
              <th className="border border-gray-300 p-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(ISRdata).map(([field, value]) => (
              <tr key={field}>
                <td className="border border-gray-300 p-2">{field}</td>
                <td className="border border-gray-300 p-2">{value as ReactNode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{loadingText}</p>
      )}
    </div>

    

  );
}