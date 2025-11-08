import { useState } from "react";
import {
  ArrowLeft,
  Search,
  BookOpen,
  Filter,
} from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  medicalDictionary,
  categoryDescriptions,
} from "../utils/medicalDictionary";

interface MedicalDictionaryProps {
  onBack: () => void;
}

type Category =
  | "all"
  | "measurement"
  | "condition"
  | "device"
  | "medication"
  | "alert";

export function MedicalDictionary({
  onBack,
}: MedicalDictionaryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("all");

  // Filter dictionary entries
  const filteredEntries = Object.entries(
    medicalDictionary,
  ).filter(([term, data]) => {
    const matchesSearch =
      term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.meaning
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      data.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryConfig = {
    measurement: {
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: "",
    },
    condition: {
      color: "bg-purple-100 text-purple-700 border-purple-200",
      icon: "",
    },
    device: {
      color: "bg-green-100 text-green-700 border-green-200",
      icon: "",
    },
    medication: {
      color: "bg-pink-100 text-pink-700 border-pink-200",
      icon: "",
    },
    alert: {
      color: "bg-orange-100 text-orange-700 border-orange-200",
      icon: "",
    },
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white p-6 pb-8 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-white">Medical Dictionary</h2>
            <p className="text-white/80">
              Learn about heart health terms
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
          <Input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 h-12 bg-white border-0 shadow-md text-black placeholder-gray-400"
          />
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Category Filters */}
        <Card className="p-4 bg-white shadow-md border-0 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-[#0066CC]" />
            <p className="text-[#333]">Filter by Category</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              onClick={() => setSelectedCategory("all")}
              className={`cursor-pointer px-4 py-2 ${
                selectedCategory === "all"
                  ? "bg-[#0066CC] text-white"
                  : "bg-gray-100 text-gray-700 border-gray-200 border"
              }`}
            >
              All Terms
            </Badge>
            {Object.entries(categoryDescriptions).map(
              ([key, value]) => {
                const config =
                  categoryConfig[
                    key as keyof typeof categoryConfig
                  ];
                return (
                  <Badge
                    key={key}
                    onClick={() =>
                      setSelectedCategory(key as Category)
                    }
                    className={`cursor-pointer px-4 py-2 ${
                      selectedCategory === key
                        ? config.color
                        : "bg-gray-100 text-gray-700 border-gray-200 border"
                    }`}
                  >
                    <span className="mr-1">{value.icon}</span>
                    {value.title.split(" ")[0]}
                  </Badge>
                );
              },
            )}
          </div>
        </Card>

        {/* Category Description */}
        {selectedCategory !== "all" && (
          <Card className="p-4 bg-[#F0F7FF] border border-[#0066CC]/20 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">
                {categoryDescriptions[selectedCategory].icon}
              </span>
              <div>
                <p className="text-[#333] mb-1">
                  {categoryDescriptions[selectedCategory].title}
                </p>
                <p className="text-[#666]">
                  {
                    categoryDescriptions[selectedCategory]
                      .description
                  }
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Results Count */}
        <div className="mb-3">
          <p className="text-[#666]">
            {filteredEntries.length} term
            {filteredEntries.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Dictionary Entries */}
        {filteredEntries.length === 0 ? (
          <Card className="p-8 bg-white border-2 border-dashed border-[#E0E0E0] text-center">
            <BookOpen className="w-12 h-12 text-[#999] mx-auto mb-3" />
            <p className="text-[#666]">
              No terms found matching your search
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredEntries.map(([term, data]) => {
              const config = categoryConfig[data.category];

              return (
                <Card
                  key={term}
                  className="p-5 bg-white shadow-sm border-0"
                >
                  <div className="space-y-3">
                    {/* Term Header */}
                    <div>
                      <p className="text-[#333] mb-2">{term}</p>
                      <Badge
                        className={`${config.color} border`}
                      >
                        <span className="mr-1">
                          {config.icon}
                        </span>
                        {data.category}
                      </Badge>
                    </div>

                    {/* Meaning */}
                    <div className="p-4 bg-[#F8F9FA] rounded-lg">
                      <p className="text-[#0066CC] mb-2">
                        What it means
                      </p>
                      <p className="text-[#333]">
                        {data.meaning}
                      </p>
                    </div>

                    {/* Why It Matters */}
                    <div className="p-4 bg-[#F0F7FF] rounded-lg">
                      <p className="text-[#FF9500] mb-2">
                        Why it matters
                      </p>
                      <p className="text-[#333]">
                        {data.whyItMatters}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}