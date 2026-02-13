import { useState, useEffect } from "react";
import DynamicDropdownForm from "./Dropdown";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { useTheme } from "@/lib/themeContext";

interface PlotParams {
  data?: any[];
  layout?: any;
}

const Plot = createPlotlyComponent(Plotly);

const PILANI = 0,
  GOA = 1,
  HYDERABAD = 2;

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
  const [graph, setGraph] = useState<PlotParams>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [formData, setForm] = useState<{ campus: number;[key: string]: any }>({
    campus: PILANI,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  async function loadData() {
    setLoading(true);
    setError(null);
    setIsLoaded(false);

    const url = `${import.meta.env.VITE_API_URL}/graph?campus=${formData.campus}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setGraph(data);
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
        {loading && (
          <p className="mt-4 font-bold animate-pulse">GENERATING PLOT...</p>
        )}
        {error && (
          <p className="mt-4 text-[var(--brutal-accent)] font-bold">{error}</p>
        )}
      </div>

      {/* PLOT CONTAINER */}
      {isLoaded && graph.data && (
        <div className="brutal-box p-2 sm:p-4 bg-[var(--brutal-bg)] overflow-hidden">
          <div className="w-full h-[350px] sm:h-[400px] md:h-[500px] relative">
            <Plot
              data={graph.data.map((trace: any) => ({
                ...trace,
                line: { ...trace.line, width: isMobile ? 2 : 3 },
                marker: {
                  ...trace.marker,
                  size: isMobile ? 5 : 8,
                  line: { width: 1, color: textColor },
                },
              }))}
              layout={{
                ...graph.layout,
                dragmode: false,
                plot_bgcolor: bgColor,
                paper_bgcolor: bgColor,
                font: {
                  family: '"Iosevka", monospace',
                  color: textColor,
                  size: isMobile ? 10 : 12,
                },
                xaxis: {
                  ...graph.layout?.xaxis,
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
                  ...graph.layout?.yaxis,
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
                  ...graph.layout?.legend,
                  ...legendConfig,
                },
                margin: margins,
                autosize: true,
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
