import axios from "axios";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { serverUrl } from "../App";
import { toast } from "react-toastify";

function Upload() {
  const [resource, setResource] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("")
  const [topic, setTopic] = useState("")
  const [pin,setPin]=useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pin || pin==undefined || !file || !subjectName || !resource) {
      toast.warn("Please fill all fields");
      return;
    }
    if((resource==="notes"||resource==="books")&&!(topic?.trim())){
      toast.warn("Please enter topic or type 'All' for complete notes/books")
      return;
    }
        if(resource==="pyq"&&!(year?.toString().trim())){
      toast.warn("Please enter year of question paper!")
      return;
    }
    setLoading(true);
    const formattedSubject =subjectName.trim().charAt(0).toUpperCase() + subjectName.trim().slice(1).toLowerCase();

    
    const formdata=new FormData()
    formdata.append("pdf",file)
    formdata.append("subject",formattedSubject)
    formdata.append("resource",resource)
    if(topic){
      const formattedTopic =topic.trim().charAt(0).toUpperCase() + topic.trim().slice(1).toLowerCase();
      formdata.append("topic",formattedTopic)
    }
    else if(year){
      formdata.append("year",year)
    }

    try {

      const result=await axios.post(`${serverUrl}/api/resources/upload`,formdata, {headers:{pin}, withCredentials:true})

      toast.success("Uploaded successfully ✅")

      setFile(null);
      setResource("");
      setSubjectName("");
      setTopic("")
      setYear("")
      setPin("")
    } catch (err) {
      if(err.status===403){
        toast.error("Unauthorized! Only admins can upload!")
      }else
      toast.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-gray-100 px-4">
      
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-2xl">
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Upload Study Material
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm md:text-base">
          Share notes, books & PYQs with your friends 📚
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Admin Pin
            </label>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              type="text"
              placeholder="Enter admin pin to upload"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Subject Name
            </label>
            <input
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              type="text"
              placeholder="e.g. DBMS, OS..."
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Resource Type
            </label>
            <select
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Resource</option>
              <option value="pyq">PYQ Paper</option>
              <option value="books">Books</option>
              <option value="notes">Notes</option>
            </select>
          </div>
{(resource === "notes" || resource === "books") && (
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      Topic
      <span className="text-sm text-gray-400"> (Type 'All' for complete notes/books)</span>
    </label>
    <input
      type="text"
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
      placeholder="e.g. Normalization, Integration..."
      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
)}

{(resource === "pyq" ) && (
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      Year
    </label>
    <input
      type="number"
      value={year}
      onChange={(e) => setYear(e.target.value)}
      placeholder="e.g. 2021, 2025..."
      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
)}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload PDF
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full"
              />

              {file && (
                <p className="mt-2 text-sm text-green-600">
                  📄 {file.name}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`py-3 rounded-lg cursor-pointer font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? <ClipLoader/> : "Upload File"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;