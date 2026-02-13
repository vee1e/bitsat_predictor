import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DynamicDropdownForm from "@/components/ui/Dropdown";

const PILANI = 0,
  GOA = 1,
  HYDERABAD = 2;
const BEST = 0,
  AVG = 1,
  WORST = 2;

const formConfig = [
  {
    key: "campus",
    placeholder: "Select Campus",
    options: [
      { label: "Pilani", value: PILANI },
      { label: "Goa", value: GOA },
      { label: "Hyderabad", value: HYDERABAD },
    ],
  },
  {
    key: "scenario",
    placeholder: "Select Scenario",
    options: [
      { label: "Best Case", value: BEST },
      { label: "Average Case", value: AVG },
      { label: "Worst Case", value: WORST },
    ],
  },
] as const;

function PredictTable() {
  const [formData, setForm] = useState<{
    campus: number;
    scenario: number;
    [key: string]: any;
  }>({ campus: PILANI, scenario: BEST });
  const [table, setTable] = useState<string[][]>([]);
  const [tableRange, setRange] = useState<number[]>([0, 4]);
  const [activePage, setActivePage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    const url = `${import.meta.env.VITE_API_URL}/table?campus=${formData.campus}&scenario=${formData.scenario}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTable(data.length === 0 ? [] : data);
      setRange([0, 4]);
      setActivePage(1);
    } catch (err) {
      console.error("Failed to load table data. Error: ", err);
      setError("Failed to fetch data. Please try again.");
      setTable([]);
    } finally {
      setLoading(false);
    }
  }

  function goNext() {
    if (tableRange[1] < table.length - 1) {
      setRange([tableRange[0] + 5, tableRange[1] + 5]);
      setActivePage(activePage + 1);
    }
  }

  function goPrev() {
    if (tableRange[0] > 0) {
      const newStart = Math.max(0, tableRange[0] - 5);
      const newEnd = newStart + 4;
      setRange([newStart, newEnd]);
      setActivePage(activePage - 1);
    }
  }

  function goToPage(pageNumber: number) {
    const newStart = (pageNumber - 1) * 5;
    const newEnd = newStart + 4;
    setRange([newStart, newEnd]);
    setActivePage(pageNumber);
  }

  const totalPages = Math.ceil(table.length / 5);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* SELECTION PANEL - NO BORDER/SHADOW per instructions */}
      <div className="bg-[var(--brutal-bg-secondary)]/60 backdrop-blur-xl border border-[var(--brutal-border)] rounded-[10px] p-6 mb-8 w-full">
        <h2 className="brutal-heading-md mb-6 text-center">
          CHECK PREDICTIONS
        </h2>
        <DynamicDropdownForm
          configs={formConfig}
          formData={formData}
          setForm={setForm}
          handleSubmit={handleSubmit}
        />
        {loading && (
          <p className="mt-4 text-center font-bold animate-pulse">
            LOADING DATA...
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-[var(--brutal-accent)] font-bold">
            {error}
          </p>
        )}
      </div>

      {/* RESULTS TABLE */}
      {table.length > 0 && (
        <div className="brutal-box p-4 md:p-6 overflow-x-auto">
          <table className="brutal-table w-full mb-6">
            <thead>
              <tr>
                <th>Campus</th>
                <th>Branch</th>
                <th style={{ textAlign: 'center' }}>Marks</th>
              </tr>
            </thead>
            <tbody>
              {table.slice(tableRange[0], tableRange[1] + 1).map((row, idx) => (
                <tr key={idx}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td style={{ textAlign: 'center' }} className="font-bold">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                disabled={activePage === 1}
                className="brutal-btn p-3 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="font-bold font-mono">
                Page {activePage} of {totalPages}
              </span>
              <button
                onClick={goNext}
                disabled={activePage === totalPages}
                className="brutal-btn p-3 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Page Numbers (Limited to avoid clutter) */}
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Logic to show relevant pages around activePage could go here
                // For now showing first 5 or logic to keep it simple
                let p = i + 1;
                if (totalPages > 5) {
                  if (activePage > 3) p = activePage - 2 + i;
                  if (p > totalPages) p = i + 1; // Fallback simplistic
                }
                return p;
              })
                .filter((p) => p <= totalPages)
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-8 h-8 flex items-center justify-center font-bold border-2 border-[var(--brutal-border)] transition-all ${p === activePage
                      ? "bg-[var(--brutal-text)] text-[var(--brutal-bg)]"
                      : "bg-[var(--brutal-bg)] hover:bg-[var(--brutal-bg-secondary)]"
                      }`}
                  >
                    {p}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictTable;
