/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/3nf3Hoi26BU
 */
import { Button } from "@/components/ui/button"
import React, { useState } from 'react';

export function ClassSearch() {
  // Sample data for Sources
  const [sources, setSources] = useState([
    { name: "Short Answer - Short Answer", id: 1 },
    { name: "Short Answer Generator", id: 2 },
    { name: "What Is a Short Answer and How Is It Used? - Co. thoughtco", id: 3 },
  ]);

  // Sample data for Related
  const [related, setRelated] = useState([
    { query: "what is a short answer" },
    { query: "how to create a short answer" },
    { query: "why short answers are effective" },
  ]);

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h1 className="text-4xl font-bold mb-6">Give me a short answer to this</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Sources</h2>
        <div className="flex flex-wrap gap-4">
          {sources.map((source, index) => (
            <div key={index} className="flex items-center space-x-2">
              <FileIcon className="text-gray-600" />
              <span className="text-sm">{source.name}</span>
              <span className="text-xs text-gray-500">. {source.id}</span>
            </div>
          ))}
          <Button className="text-sm" variant="ghost">
            View more
          </Button>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Answer</h2>
        <p className="mb-4">
          A short answer is a brief and concise response to a question or prompt, commonly used in speech, informal
          writing, and tests. It is an acceptable, quick reply for a wide variety of questions and situations, requiring
          the respondent to recall and summarize ideas in their own words
          <sup>3</sup>
          <sup>4</sup>. In testing, short answer questions have no possible answers written down, and students are
          expected to cover enough material to earn full marks <sup>4</sup>.{"\n"}
        </p>
        <div className="flex items-center space-x-4">
          <Button className="text-sm" variant="ghost">
            Share
          </Button>
          <Button className="text-sm" variant="ghost">
            Rewrite
          </Button>
          <CircleEllipsisIcon className="text-gray-600" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-3">Related</h2>
        <div className="space-y-2">
          {related.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{item.query}</span>
              <SearchIcon className="text-gray-600" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-6">
          <Button className="text-sm" variant="secondary">
            Ask follow-up...
          </Button>
        </div>
      </div>
    </div>
  )
}


function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}


function CircleEllipsisIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M17 12h.01" />
      <path d="M12 12h.01" />
      <path d="M7 12h.01" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

