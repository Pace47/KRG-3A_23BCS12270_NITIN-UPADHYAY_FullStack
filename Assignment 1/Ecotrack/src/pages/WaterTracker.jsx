import { useState, useEffect, useCallback } from "react";
import CounterDisplay from "../components/CounterDisplay";

function WaterTracker() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(8);
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ==============================
     LOAD DATA FROM LOCAL STORAGE
  =============================== */
  useEffect(() => {
    const savedData = localStorage.getItem("waterData");

    if (savedData) {
      const parsed = JSON.parse(savedData);
      setCount(parsed.count ?? 0);
      setGoal(parsed.goal ?? 8);
    }
  }, []);

  /* ==============================
     SAVE DATA TO LOCAL STORAGE
  =============================== */
  useEffect(() => {
    localStorage.setItem(
      "waterData",
      JSON.stringify({ count, goal })
    );
  }, [count, goal]);

  /* ==============================
     FETCH HEALTH TIP
  =============================== */
  useEffect(() => {
    const fetchTip = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://api.adviceslip.com/advice");

        if (!res.ok) {
          throw new Error("Network error");
        }

        const data = await res.json();
        setTip(data.slip.advice);
      } catch (err) {
        setError("Failed to fetch tip");
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, []);

  /* ==============================
     MEMOIZED FUNCTIONS
  =============================== */
  const addWater = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const removeWater = useCallback(() => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const handleGoalChange = (e) => {
    const newGoal = Number(e.target.value);
    if (newGoal > 0) {
      setGoal(newGoal);
    }
  };

  /* ==============================
     UI
  =============================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-6">

      <h2 className="text-3xl font-bold text-center text-emerald-700">
        💧 Daily Water Tracker
      </h2>

      {/* Counter Component */}
      <CounterDisplay count={count} goal={goal} />

      {/* Goal Input */}
      <div className="flex justify-center mt-6">
        <input
          type="number"
          value={goal}
          onChange={handleGoalChange}
          className="border rounded-lg px-3 py-2 w-32 text-center shadow-sm"
          min="1"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={addWater}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
        >
          + Add
        </button>

        <button
          onClick={removeWater}
          className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition transform hover:scale-105"
        >
          - Remove
        </button>

        <button
          onClick={reset}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
        >
          Reset
        </button>
      </div>

      {/* Goal Message */}
      {count >= goal && (
        <p className="text-center mt-4 text-green-600 font-bold animate-pulse">
          🎉 Goal Reached!
        </p>
      )}

      {/* Health Tip Section */}
      <div className="mt-10 text-center max-w-xl mx-auto">
        <h4 className="text-xl font-semibold text-gray-700">
          🌿 Today's Health Tip
        </h4>

        {loading && (
          <p className="mt-3 text-gray-500 animate-pulse">
            Loading tip...
          </p>
        )}

        {error && (
          <p className="mt-3 text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-4 bg-white p-5 rounded-xl shadow-md">
            {tip}
          </div>
        )}
      </div>
    </div>
  );
}

export default WaterTracker;