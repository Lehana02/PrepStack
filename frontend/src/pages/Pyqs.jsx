import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import PyqCard from "../components/PyqCard"; 

function Pyqs() {
  const { pyqs } = useSelector((state) => state.user); 
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredPyqs, setFilteredPyqs] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
const [animateKey, setAnimateKey] = useState(0);

  const subjectOptions = useMemo(() => {
    const uniqueSubjects = [...new Set(pyqs.map((p) => p.subject))];
    return [...uniqueSubjects];
  }, [pyqs]);

  const YearOptions = useMemo(() => {
    if (selectedSubject === "All") return [];
    const filtered = pyqs
      .filter((p) => p.subject === selectedSubject)
      .map((p) => p.year);
    return [...new Set(filtered)];
  }, [pyqs, selectedSubject]);

  const handleSearch = () => {
    let result = pyqs;

    if (selectedSubject && selectedSubject !== "All") {
      result = result.filter((p) => p.subject === selectedSubject);
    }
    if (selectedYear && selectedYear !== "All") {
      result = result.filter((p) => p.year === selectedYear);
    }

    setFilteredPyqs(result);
    setFilterApplied(true);
    setAnimateKey(Date.now());
  };

  const pyqsToRender = filterApplied ? filteredPyqs : pyqs;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-800">
          Past Year Questions (PYQs)
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Browse through past year question papers for various subjects and
          topics. Use the filters below to quickly find the questions you need.
        </p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
          <select
            className="border cursor-pointer border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSelectedYear("All");
            }}
          >
            <option value="" disabled>
              Select Subject
            </option>
            <option value="All">All</option>
            {subjectOptions.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>

          <select
            className="border cursor-pointer border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="" disabled>
              Select Year
            </option>
            <option value="All">All</option>
            {YearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button
            className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition shadow-md hover:shadow-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* PYQs Grid */}
        {pyqsToRender.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            No PYQs found for selected filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pyqsToRender.map((pyq, idx) => (
  <div
    key={`${pyq._id}-${animateKey}`}
    className="transform transition duration-500 hover:scale-105"
    style={{
      opacity: 0,
      transform: "translateY(50px)",
      animation: `fadeInUp 0.6s ease-out forwards`,
      animationDelay: `${idx * 100}ms`,
    }}
  >
    <PyqCard pyq={pyq} />
  </div>
))}
          </div>
        )}

        <div className="mt-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
            Why Use Our PYQs?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our collection of previous year question papers helps you understand
            exam patterns, important topics, and frequently asked questions.
            Practicing PYQs boosts your confidence, improves time management,
            and gives you a clear idea of what to expect in exams—making your
            preparation smarter and more focused.
          </p>
        </div>
      </div>
      <style>
  {`
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(50px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `}
</style>
    </div>
  );
}

export default Pyqs;
