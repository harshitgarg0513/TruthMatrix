//version4


// import React, { useState } from 'react';
// import axios from 'axios';

// function DeepfakeDetection() {
//   const [videoFile, setVideoFile] = useState(null);
//   const [result, setResult] = useState('');
//   const [videoSrc, setVideoSrc] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       setVideoSrc(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!videoFile) {
//       alert('Please upload a video file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', videoFile);
//     setLoading(true);

//     try {
//       const response = await axios.post('/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setResult(response.data.result);
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred while processing the video.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-lg">
//       <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
//         Deepfake Detection
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex flex-col items-center">
//           <label className="flex flex-col items-center justify-center w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-200 transition duration-300 rounded-lg">
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16v4M7 12l5-5m0 0l5 5m-5-5v12M5 12h14" />
//             </svg>
//             <span className="text-sm text-gray-500">{videoFile ? videoFile.name : "Upload Video"}</span>
//             <input type="file" accept="video/mp4" className="hidden" onChange={handleFileChange} />
//           </label>

//           {videoSrc && (
//             <div className="mt-4">
//               <video src={videoSrc} controls className="w-48 h-28 rounded-md shadow-sm" />
//             </div>
//           )}
//         </div>

//         <button type="submit" className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition duration-300">
//           Upload and Analyze
//         </button>
//       </form>

//       {loading && (
//         <div className="mt-6 flex items-center justify-center">
//           <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"></div>
//           <p className="text-gray-600 ml-4">Analyzing video...</p>
//         </div>
//       )}

//       {result && !loading && (
//         <div className="mt-6 text-center">
//           <h2 className="text-xl font-medium text-gray-800">The video is {result}</h2>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DeepfakeDetection;





//version5
import React, { useState } from 'react';
import axios from 'axios';

function DeepfakeDetection() {
  const [videoFile, setVideoFile] = useState(null);
  const [result, setResult] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoSrc(URL.createObjectURL(file));  // Generate video preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert('Please upload a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    setLoading(true);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.result);
    } catch (error) {
      console.error(error);
      alert('An error occurred while processing the video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg flex justify-between space-x-8">
      {/* Upload Box */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Deepfake Detection
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="flex flex-col items-center justify-center w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-200 transition duration-300 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16v4M7 12l5-5m0 0l5 5m-5-5v12M5 12h14" />
              </svg>
              <span className="text-sm text-gray-500">{videoFile ? videoFile.name : "Upload Video"}</span>
              <input type="file" accept="video/mp4" className="hidden" onChange={handleFileChange} />
            </label>

            <button type="submit" className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition duration-300 mt-4">
              Upload and Analyze
            </button>
          </div>
        </form>

        {loading && (
          <div className="mt-6 flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"></div>
            <p className="text-gray-600 ml-4">Analyzing video...</p>
          </div>
        )}
      </div>

      {/* Video Preview Box */}
      {videoSrc && (
        <div className="w-64 h-40 rounded-lg shadow-md flex justify-center items-center bg-gray-50 p-4">
          <video src={videoSrc} controls className="rounded-md shadow-sm w-full h-full" />
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="absolute bottom-4 right-4">
          <h2 className="text-xl font-medium text-gray-800">The video is {result}</h2>
        </div>
      )}
    </div>
  );
}

export default DeepfakeDetection;
