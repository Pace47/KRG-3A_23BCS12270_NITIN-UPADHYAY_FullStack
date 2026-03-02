import React from "react";

const CounterDisplay = React.memo(({ count, goal }) => {
  console.log("CounterDisplay Rendered");

  const percentage = Math.min((count / goal) * 100, 100);
  const goalReached = count >= goal;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-80 mx-auto mt-6 transition-all duration-300 hover:shadow-2xl">
      
      <h3 className="text-lg font-semibold text-gray-700 text-center">
        {count} / {goal} glasses completed
      </h3>

      {/* Progress Bar Background */}
      <div className="w-full bg-gray-200 h-4 rounded-full mt-4 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            goalReached
              ? "bg-gradient-to-r from-green-500 to-emerald-400"
              : "bg-gradient-to-r from-blue-500 to-cyan-400"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Percentage Text */}
      <p
        className={`text-center mt-3 font-medium ${
          goalReached ? "text-green-600" : "text-gray-600"
        }`}
      >
        {percentage.toFixed(0)}% Completed
      </p>

      {/* Goal Message */}
      {goalReached && (
        <p className="text-center mt-2 text-green-600 font-bold animate-pulse">
          🎉 Goal Reached!
        </p>
      )}
    </div>
  );
});

export default CounterDisplay;