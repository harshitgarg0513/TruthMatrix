// // src/App.js
// import React, { useState } from 'react';
// import axios from 'axios';


// function App() {
//   const [videoFile, setVideoFile] = useState(null);
//   const [result, setResult] = useState('');

//   const handleFileChange = (e) => {
//     setVideoFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!videoFile) {
//       alert('Please upload a video file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', videoFile);

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
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Deepfake Detection</h1>
//       <form onSubmit={handleSubmit}>
//       <div className="flex flex-col items-center justify-center h-screen space-y-8">
//   <label 
//     className="flex flex-col items-center justify-center w-64 h-64 bg-blue-50 rounded-lg shadow-lg cursor-pointer 
//                hover:bg-blue-100 hover:scale-105 transition-transform duration-300 ease-in-out"
//   >
//     <svg 
//       xmlns="http://www.w3.org/2000/svg" 
//       className="w-12 h-12 text-blue-700 mb-2" 
//       viewBox="0 0 20 20" 
//       fill="currentColor"
//     >
//       <path 
//         fillRule="evenodd" 
//         d="M8 5a3 3 0 116 0v3h3a1 1 0 011 1v5a3 3 0 01-3 3H6a3 3 0 01-3-3v-5a1 1 0 011-1h3V5zm5 3V5a1 1 0 10-2 0v3h2zM7 8h6v2H7V8zm-2 5v2h10v-2H5z" 
//         clipRule="evenodd" 
//       />
//     </svg>
//     <span className="text-lg text-blue-700 font-semibold">Upload Video</span>
//     <input 
//       type="file" 
//       accept="video/mp4" 
//       className="hidden" 
//       onChange={handleFileChange} 
//     />
//   </label>

//   <button 
//     type="submit" 
//     className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold 
//                rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 
//                transition-all duration-300 ease-in-out"
//   >
//     Upload and Analyze
//   </button>
// </div>

//       </form>
//       {result && <h2>The video is {result}</h2>}
//     </div>
//   );
// }

// export default App;




//Version 2

// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [videoFile, setVideoFile] = useState(null);  // Holds the video file
//   const [result, setResult] = useState('');          // Stores the result
//   const [videoSrc, setVideoSrc] = useState('');      // Holds the video preview source
//   const [loading, setLoading] = useState(false);     // Loading state

//   // Handle video file change and set preview
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       setVideoSrc(URL.createObjectURL(file));  // Create a preview URL for the video
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!videoFile) {
//       alert('Please upload a video file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', videoFile);
//     setLoading(true);  // Show loading indicator

//     try {
//       const response = await axios.post('/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setResult(response.data.result);  // Show result
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred while processing the video.');
//     } finally {
//       setLoading(false);  // Hide loading indicator
//     }
//   };

//   return (
//     <div className="App min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 space-y-8">
//       <h1 className="text-4xl font-bold text-blue-700 mb-4">Deepfake Detection</h1>

//       <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
//         {/* File Upload Section */}
//         <div className="flex flex-col items-center">
//           <label 
//             className="flex flex-col items-center justify-center w-64 h-64 bg-blue-50 rounded-lg shadow-lg cursor-pointer 
//                       hover:bg-blue-100 hover:scale-105 transition-transform duration-300 ease-in-out"
//           >
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="w-12 h-12 text-blue-700 mb-2" 
//               viewBox="0 0 20 20" 
//               fill="currentColor"
//             >
//               <path 
//                 fillRule="evenodd" 
//                 d="M8 5a3 3 0 116 0v3h3a1 1 0 011 1v5a3 3 0 01-3 3H6a3 3 0 01-3-3v-5a1 1 0 011-1h3V5zm5 3V5a1 1 0 10-2 0v3h2zM7 8h6v2H7V8zm-2 5v2h10v-2H5z" 
//                 clipRule="evenodd" 
//               />
//             </svg>
//             <span className="text-lg text-blue-700 font-semibold">
//               {videoFile ? videoFile.name : "Upload Video"}
//             </span>
//             <input 
//               type="file" 
//               accept="video/mp4" 
//               className="hidden" 
//               onChange={handleFileChange} 
//             />
//           </label>

//           {/* Video Preview */}
//           {videoSrc && (
//             <div className="mt-6">
//               <video src={videoSrc} controls className="w-64 h-36 rounded-lg shadow-lg" />
//             </div>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button 
//           type="submit" 
//           className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold 
//                      rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 
//                      transition-all duration-300 ease-in-out"
//         >
//           Upload and Analyze
//         </button>
//       </form>

//       {/* Loading Spinner */}
//       {loading && (
//         <div className="flex items-center justify-center mt-6">
//           <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
//         </div>
//       )}

//       {/* Result Display */}
//       {result && !loading && (
//         <h2 className="text-2xl font-semibold text-green-600 mt-4">
//           The video is {result}
//         </h2>
//       )}
//     </div>
//   );
// }

// export default App;





//version 3

// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [videoFile, setVideoFile] = useState(null);  // Holds the video file
//   const [result, setResult] = useState('');          // Stores the result
//   const [videoSrc, setVideoSrc] = useState('');      // Holds the video preview source
//   const [loading, setLoading] = useState(false);     // Loading state

//   // Handle video file change and set preview
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       setVideoSrc(URL.createObjectURL(file));  // Create a preview URL for the video
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!videoFile) {
//       alert('Please upload a video file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', videoFile);
//     setLoading(true);  // Show loading indicator

//     try {
//       const response = await axios.post('/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setResult(response.data.result);  // Show result
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred while processing the video.');
//     } finally {
//       setLoading(false);  // Hide loading indicator
//     }
//   };

//   return (
//     <div className="App min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 space-y-12">
//       {/* Animated Heading */}
//       <h1 className="text-5xl font-extrabold text-white tracking-wider drop-shadow-md">
//         <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600">
//           Deepfake Detection
//         </span>
//         <span className="block text-sm text-gray-100 italic mt-2 tracking-wide">
//           Secure your content. Detect fake media.
//         </span>
//       </h1>

//       {/* Upload Form */}
//       <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
//         {/* File Upload Section */}
//         <div className="flex flex-col items-center">
//           <label 
//             className="flex flex-col items-center justify-center w-64 h-64 bg-white bg-opacity-20 rounded-lg shadow-lg cursor-pointer 
//                       hover:bg-opacity-30 hover:scale-105 transition-transform duration-300 ease-in-out"
//           >
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="w-12 h-12 text-white mb-2" 
//               viewBox="0 0 20 20" 
//               fill="currentColor"
//             >
//               <path 
//                 fillRule="evenodd" 
//                 d="M8 5a3 3 0 116 0v3h3a1 1 0 011 1v5a3 3 0 01-3 3H6a3 3 0 01-3-3v-5a1 1 0 011-1h3V5zm5 3V5a1 1 0 10-2 0v3h2zM7 8h6v2H7V8zm-2 5v2h10v-2H5z" 
//                 clipRule="evenodd" 
//               />
//             </svg>
//             <span className="text-lg text-white font-semibold">
//               {videoFile ? videoFile.name : "Upload Video"}
//             </span>
//             <input 
//               type="file" 
//               accept="video/mp4" 
//               className="hidden" 
//               onChange={handleFileChange} 
//             />
//           </label>

//           {/* Video Preview */}
//           {videoSrc && (
//             <div className="mt-6">
//               <video src={videoSrc} controls className="w-64 h-36 rounded-lg shadow-lg" />
//             </div>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button 
//           type="submit" 
//           className="w-full px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold 
//                      rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 hover:scale-105 
//                      transition-all duration-300 ease-in-out"
//         >
//           Upload and Analyze
//         </button>
//       </form>

//       {/* Loading Animation */}
//       {loading && (
//         <div className="flex flex-col items-center justify-center mt-6">
//           <div className="w-full bg-gray-200 rounded-full h-4">
//             <div className="bg-blue-600 h-4 rounded-full animate-pulse" style={{ width: '75%' }}></div>
//           </div>
//           <p className="text-white mt-2 font-semibold">Processing Video...</p>
//         </div>
//       )}

//       {/* Result Display */}
//       {result && !loading && (
//         <h2 className="text-2xl font-semibold text-yellow-300 mt-4 animate-pulse">
//           The video is {result}
//         </h2>
//       )}
//     </div>
//   );
// }

// export default App;




//version4

// import React from 'react';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import DeepfakeDetection from './Deeofakedetection';

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-gray-50">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <main className="flex-grow flex items-center justify-center">
//         <DeepfakeDetection />
//       </main>

//       {/* Footer */}
//       <Footer/>
//     </div>
//   );
// }

// export default App;




import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './index.css'
import { SignupForm } from "./signup";
import { TypewriterEffectSmoothDemo } from "./homepage";
import { Dashboard } from "./dashboard";

function App() {
  return(<>
  <BrowserRouter>
   <Routes>
     <Route path="/signup" element={<SignupForm/>} />
     {/* <Route path="/signin" element={<Signin />} /> */}
     <Route path="/dashboard" element={<Dashboard/>}/>
     <Route path="/" element={<TypewriterEffectSmoothDemo/>}/>
   </Routes>
 </BrowserRouter>



</>
  )
}

export default App