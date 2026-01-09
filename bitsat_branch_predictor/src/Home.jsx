import { useState, useEffect } from "react";

function Home() {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);

    useEffect(() => {
        fetch("/most_likely_case.csv")
        .then((res) => res.text())
        .then((text) => {
            const rows = text.trim().split("\n").slice(1);

            const parsed = rows.map((row) => {
            const [campus, branch, marks, year] = row.split(",");

            return {
                campus: campus.trim(),
                branch: branch.trim(),
                marks: parseInt(marks.trim()),
                year: parseInt(year.trim()),
                };
            });

            parsed.sort((a, b) => a.score - b.score);
            setData(parsed);
      })
  } , []);

    const handlePredict = () => {
        const score = Number(input);

        if (isNaN(score) || score < 0) {    
            setResult(["INVALID"]);
            return;
        }

        if(score > 426){
            setResult(["TOO_HIGH"]);
            return;
        }

        const matches = data.filter((row) => score >= row.marks);

        if (matches.length === 0) {
            setResult(["TOO_LOW"]);
        } 
        else {
            setResult(matches);
        }
    };

    return (
    <main className="min-h-screen flex items-start justify-center px-8 pt-24">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl text-blue-100 mb-6 font-mono font-semibold text-center">
                    Enter Score
                </h2>

                <input 
                    type="number" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg text-black mb-4" 
                    placeholder="Score"
                />

                <button 
                    onClick={handlePredict} 
                    className="w-full px-4 py-2 bg-violet-700 text-white rounded-lg hover:bg-violet-600 transition font-bold"
                >
                    Predict
                </button>
                
                <div className="mt-6 text-blue-200 text-lg space-y-2 text-center overflow-y-auto max-h-[400px]">
                    {result[0] === "INVALID" && (
                        <p>Enter a valid positive score.</p>
                    )}

                    {result[0] === "TOO_LOW" && (
                        <p>Score too low for any branch :(</p>
                    )}

                    {result[0] === "TOO_HIGH" && (
                        <p>Max Score attainable is 426.</p>
                    )}

                    {typeof result[0] === "object" &&
                    result.map((item, index) => (
                        <p key={index} className="py-1">
                            {item.branch} - {item.campus}
                        </p>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Home;