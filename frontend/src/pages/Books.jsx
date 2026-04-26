import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import BooksCard from "../components/BooksCard";

function Books() {
  const { books } = useSelector((state) => state.user);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [animateKey, setAnimateKey] = useState(0);

  const subjectOptions = useMemo(() => {
    const uniqueSubjects = [...new Set(books.map((n) => n.subject))];
    return [...uniqueSubjects];
  }, [books]);

  const topicOptions = useMemo(() => {
    if (selectedSubject === "All") return [];
    const filtered = books
      .filter((n) => n.subject === selectedSubject)
      .map((n) => n.topic);
    return [...new Set(filtered)];
  }, [books, selectedSubject]);

  const handleSearch = () => {
    let result = books;

    if (selectedSubject && selectedSubject !== "All") {
      result = result.filter((n) => n.subject === selectedSubject);
    }
    if (selectedTopic && selectedTopic !== "All") {
      result = result.filter((n) => n.topic === selectedTopic);
    }

    setFilteredBooks(result);
    setFilterApplied(true);
    setAnimateKey(Date.now());
  };

  const booksToRender = filterApplied ? filteredBooks : books;

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-800">
          Explore Our Books
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Discover a wide collection of books across various subjects and topics.
          Use the filters below to quickly find the resources you need, whether
          for study, research, or personal growth.
        </p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
          <select
            className="border cursor-pointer border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSelectedTopic("All");
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
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="" disabled>
              Select Topic
            </option>
            <option value="All">All</option>
            {topicOptions.map((top) => (
              <option key={top} value={top}>
                {top}
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

        {/* Books Grid */}
        {booksToRender.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            No books found for selected filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {booksToRender.map((book, idx) => (
              <div
                key={`${book._id}-${animateKey}`}
                className="transform transition duration-500 hover:scale-105"
                style={{
                  opacity: 0,
                  transform: "translateY(50px)",
                  animation: `fadeInUp 0.6s ease-out forwards`,
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <BooksCard book={book} />
              </div>
            ))}
          </div>
        )}

        {/* Extra Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
            Why Choose Our Collection?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            All our books are carefully curated to provide accurate and up-to-date
            information. Whether you're preparing for exams, expanding your knowledge,
            or exploring new subjects, our library is designed to help you succeed.
          </p>
        </div>
      </div>

      {/* Animation */}
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

export default Books;