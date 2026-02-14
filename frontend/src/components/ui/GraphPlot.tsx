import { useState, useEffect, useCallback, useRef } from "react";
import DynamicDropdownForm from "./Dropdown";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { useTheme } from "@/lib/themeContext";

interface BranchData {
  name: string;
  years: number[];
  marks: number[];
}

interface GraphResponse {
  branches: BranchData[];
}

interface Trace {
  x: number[];
  y: number[];
  name: string;
  type: "scatter";
  mode: "lines+markers";
  line?: { color?: string; width?: number };
  marker?: { size?: number; line?: { width?: number; color?: string } };
  visible?: boolean;
}

const Plot = createPlotlyComponent(Plotly);

const PILANI = 0,
  GOA = 1,
  HYDERABAD = 2;

// Phoenix branch keywords (flexible matching)
const PHOENIX_KEYWORDS = [
  "computer science",
  "electrical",
  "electronics",
  "math",
];

// Check if a branch is phoenix (electrical/cse related)
function isPhoenixBranch(branchName: string): boolean {
  const lower = branchName.toLowerCase();
  return PHOENIX_KEYWORDS.some((keyword) => lower.includes(keyword));
}

// Check branch type
function getBranchType(branchName: string): "be" | "msc" | "other" {
  const lower = branchName.toLowerCase();

  // M.Sc branches
  if (
    lower.includes("m.sc") ||
    lower.includes("biology") ||
    lower.includes("chemistry") ||
    lower.includes("economics") ||
    lower.includes("mathematics") ||
    lower.includes("physics") ||
    lower.includes("general studies")
  ) {
    return "msc";
  }

  // B.E. branches
  if (
    lower.includes("engineering") ||
    lower.includes("b.e") ||
    lower.includes("computer science")
  ) {
    return "be";
  }

  return "other";
}

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
] as const;

function GraphPlot() {
  const { theme } = useTheme();
  const [allBranches, setAllBranches] = useState<BranchData[]>([]);
  const [visibleTraces, setVisibleTraces] = useState<Map<string, Trace>>(
    new Map(),
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [formData, setForm] = useState<{ campus: number; [key: string]: any }>({
    campus: PILANI,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Queues for adding and removing branches progressively
  const [renderQueue, setRenderQueue] = useState<string[]>([]);
  const [removeQueue, setRemoveQueue] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filters
  const [showBE, setShowBE] = useState(true);
  const [showMSc, setShowMSc] = useState(true);
  const [showPhoenixOnly, setShowPhoenixOnly] = useState(false);

  // Refs for tracking state - used to avoid dependency cycles
  const visibleTracesRef = useRef<Map<string, Trace>>(new Map());
  const allBranchesRef = useRef<BranchData[]>([]);

  // Keep ref in sync with state
  useEffect(() => {
    visibleTracesRef.current = visibleTraces;
  }, [visibleTraces]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Determine if a branch should be visible based on current filters
  const shouldShowBranch = useCallback(
    (branch: BranchData): boolean => {
      const type = getBranchType(branch.name);
      const isPhoenix = isPhoenixBranch(branch.name);

      // Phoenix only filter takes precedence - if enabled, only show phoenix branches
      if (showPhoenixOnly) {
        return (
          isPhoenix &&
          ((type === "be" && showBE) ||
            (type === "msc" && showMSc) ||
            type === "other")
        );
      }

      // Otherwise apply BE/MSc filters
      if (type === "be" && !showBE) return false;
      if (type === "msc" && !showMSc) return false;

      return true;
    },
    [showBE, showMSc, showPhoenixOnly],
  );

  // Get all branches that should be visible
  const getVisibleBranches = useCallback(
    (branches: BranchData[]): BranchData[] => {
      return branches.filter(shouldShowBranch);
    },
    [shouldShowBranch],
  );

  // Progressive processing effect - handles both adding and removing branches
  useEffect(() => {
    // Stop processing if both queues are empty
    if (
      (renderQueue.length === 0 && removeQueue.length === 0) ||
      !isProcessing
    ) {
      setIsProcessing(false);
      return;
    }

    const timer = setTimeout(() => {
      // Process remove queue first (remove one branch)
      if (removeQueue.length > 0) {
        const branchName = removeQueue[0];
        setVisibleTraces((prev) => {
          const next = new Map(prev);
          next.delete(branchName);
          return next;
        });
        setRemoveQueue((prev) => prev.slice(1));
      }
      // Then process render queue (add one branch)
      else if (renderQueue.length > 0) {
        const branchName = renderQueue[0];
        const branch = allBranchesRef.current.find(
          (b) => b.name === branchName,
        );

        if (branch) {
          const newTrace: Trace = {
            x: branch.years,
            y: branch.marks,
            name: branch.name,
            type: "scatter",
            mode: "lines+markers",
          };

          setVisibleTraces((prev) => {
            const next = new Map(prev);
            next.set(branch.name, newTrace);
            return next;
          });
        }
        setRenderQueue((prev) => prev.slice(1));
      }
    }, 0); // 0ms delay - render instantly

    return () => clearTimeout(timer);
  }, [renderQueue, removeQueue, isProcessing]);

  // Smart filter change handler - only adds/removes what changed
  // This effect runs when filters change, using refs to avoid dependency on visibleTraces
  useEffect(() => {
    if (!isLoaded || allBranches.length === 0) return;

    // Use setTimeout to access the latest ref values without adding dependencies
    const timeoutId = setTimeout(() => {
      // Calculate which branches should be visible now
      const shouldBeVisible = new Set(
        getVisibleBranches(allBranches).map((b) => b.name),
      );

      // Calculate which branches are currently visible (from ref to avoid dependency)
      const currentlyVisible = new Set(visibleTracesRef.current.keys());

      // Branches to add (should be visible but aren't)
      const toAdd: string[] = [];
      shouldBeVisible.forEach((name) => {
        if (!currentlyVisible.has(name)) {
          toAdd.push(name);
        }
      });

      // Branches to remove (are visible but shouldn't be)
      const toRemove: string[] = [];
      currentlyVisible.forEach((name) => {
        if (!shouldBeVisible.has(name)) {
          toRemove.push(name);
        }
      });

      // Set up queues and start processing
      allBranchesRef.current = allBranches;

      if (toRemove.length > 0) {
        setRemoveQueue(toRemove);
      }

      if (toAdd.length > 0) {
        setRenderQueue(toAdd);
      }

      if (toRemove.length > 0 || toAdd.length > 0) {
        setIsProcessing(true);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [
    showBE,
    showMSc,
    showPhoenixOnly,
    allBranches,
    isLoaded,
    getVisibleBranches,
  ]);

  async function loadData() {
    setLoading(true);
    setError(null);
    setIsLoaded(false);
    setAllBranches([]);
    setVisibleTraces(new Map());
    setRenderQueue([]);
    setRemoveQueue([]);
    setIsProcessing(false);

    const url = `${import.meta.env.VITE_API_URL}/graph?campus=${formData.campus}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const response: GraphResponse = await res.json();

      if (!response.branches || !Array.isArray(response.branches)) {
        throw new Error("Invalid response: branches data missing");
      }

      setAllBranches(response.branches);
      allBranchesRef.current = response.branches;

      // Calculate initial visible branches
      const visible = getVisibleBranches(response.branches);

      // Start progressive rendering
      setRenderQueue(visible.map((b) => b.name));
      setIsProcessing(true);
      setIsLoaded(true);
    } catch (err) {
      console.error("Failed to load Plot. Error: ", err);
      setError("Failed to load graph data.");
    } finally {
      setLoading(false);
    }
  }

  const bgColor = theme === "dark" ? "#09090b" : "#ffffff";
  const textColor = theme === "dark" ? "#ffffff" : "#000000";
  const gridColor = theme === "dark" ? "#27272a" : "#e0e0e0";

  const legendConfig = isMobile
    ? {
        orientation: "h" as const,
        yanchor: "top" as const,
        y: -0.3,
        xanchor: "center" as const,
        x: 0.5,
        font: { family: '"Iosevka", monospace', color: textColor, size: 10 },
        bgcolor: "transparent",
        borderwidth: 0,
      }
    : {
        font: { family: '"Iosevka", monospace', color: textColor },
        bgcolor: bgColor,
        bordercolor: textColor,
        borderwidth: 1,
      };

  const margins = isMobile
    ? { l: 40, r: 8, t: 20, b: 80 }
    : { l: 50, r: 10, t: 30, b: 50 };

  const tracesArray = Array.from(visibleTraces.values());

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* SELECTION PANEL */}
      <div className="bg-[var(--brutal-bg-secondary)]/60 backdrop-blur-xl border border-[var(--brutal-border)] rounded-[10px] p-6 mb-8 w-full text-center">
        <h2 className="brutal-heading-md mb-6">PLOT TRENDS</h2>
        <div className="flex flex-col items-center gap-4">
          <p className="font-bold uppercase">Select Campus To Visualize:</p>
          <div className="w-full max-w-md">
            <DynamicDropdownForm
              configs={formConfig}
              formData={formData}
              setForm={setForm}
              handleSubmit={loadData}
            />
          </div>
        </div>

        {/* FILTERS */}
        {isLoaded && (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setShowBE(!showBE)}
              className={`px-4 py-2 font-bold text-sm uppercase border-2 transition-all ${
                showBE
                  ? "bg-[var(--brutal-accent)] text-white border-[var(--brutal-accent)]"
                  : "bg-transparent text-[var(--brutal-text)] border-[var(--brutal-border)] hover:border-[var(--brutal-accent)]"
              }`}
            >
              B.E.
            </button>
            <button
              onClick={() => setShowMSc(!showMSc)}
              className={`px-4 py-2 font-bold text-sm uppercase border-2 transition-all ${
                showMSc
                  ? "bg-[var(--brutal-accent)] text-white border-[var(--brutal-accent)]"
                  : "bg-transparent text-[var(--brutal-text)] border-[var(--brutal-border)] hover:border-[var(--brutal-accent)]"
              }`}
            >
              M.Sc
            </button>
            <button
              onClick={() => setShowPhoenixOnly(!showPhoenixOnly)}
              className={`px-4 py-2 font-bold text-sm uppercase border-2 transition-all ${
                showPhoenixOnly
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-transparent text-[var(--brutal-text)] border-[var(--brutal-border)] hover:border-orange-500"
              }`}
            >
              Phoenix Only
            </button>
          </div>
        )}

        {loading && (
          <p className="mt-4 font-bold animate-pulse">GENERATING PLOT...</p>
        )}
        {error && (
          <p className="mt-4 text-[var(--brutal-accent)] font-bold">{error}</p>
        )}
      </div>

      {/* PLOT CONTAINER - Always visible once loaded */}
      {isLoaded && (
        <div className="brutal-box p-2 sm:p-4 bg-[var(--brutal-bg)] overflow-hidden">
          <div className="w-full h-[350px] sm:h-[400px] md:h-[500px] relative">
            <Plot
              data={tracesArray.map((trace: any) => ({
                ...trace,
                line: { ...trace.line, width: isMobile ? 2 : 3 },
                marker: {
                  ...trace.marker,
                  size: isMobile ? 5 : 8,
                  line: { width: 1, color: textColor },
                },
              }))}
              layout={{
                title: {
                  text: "Cutoff Trends",
                  font: {
                    family: '"JetBrains Mono", monospace',
                    size: isMobile ? 14 : 18,
                  },
                },
                dragmode: false,
                plot_bgcolor: bgColor,
                paper_bgcolor: bgColor,
                font: {
                  family: '"Iosevka", monospace',
                  color: textColor,
                  size: isMobile ? 10 : 12,
                },
                xaxis: {
                  gridcolor: gridColor,
                  zerolinecolor: gridColor,
                  tickfont: {
                    family: '"Iosevka", monospace',
                    color: textColor,
                    size: isMobile ? 9 : 12,
                  },
                  title: {
                    text: "Year",
                    font: {
                      family: '"JetBrains Mono", monospace',
                      size: isMobile ? 11 : 14,
                      color: textColor,
                    },
                  },
                },
                yaxis: {
                  gridcolor: gridColor,
                  zerolinecolor: gridColor,
                  tickfont: {
                    family: '"Iosevka", monospace',
                    color: textColor,
                    size: isMobile ? 9 : 12,
                  },
                  title: {
                    text: "Cutoff Score",
                    font: {
                      family: '"JetBrains Mono", monospace',
                      size: isMobile ? 11 : 14,
                      color: textColor,
                    },
                  },
                },
                legend: {
                  ...legendConfig,
                },
                margin: margins,
                autosize: true,
                showlegend: tracesArray.length > 0,
              }}
              config={{
                responsive: true,
                displayModeBar: false,
                scrollZoom: false,
              }}
              style={{ width: "100%", height: "100%" }}
              useResizeHandler={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default GraphPlot;
