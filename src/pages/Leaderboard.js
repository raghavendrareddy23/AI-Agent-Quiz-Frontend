import { useEffect, useState } from "react";
import { getLeaderBoard } from "../services/aiService";
import { Crown } from "lucide-react";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderBoard()
      .then((res) => {
        if (res.data?.success) {
          setLeaders(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error("Failed to load leaderboard", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return "text-yellow-500 font-bold";
      case 2:
        return "text-gray-500 font-semibold";
      case 3:
        return "text-amber-700 font-semibold";
      default:
        return "text-indigo-700";
    }
  };

  return (
    <div className="p-6 mt-16 max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Crown className="text-yellow-500" size={28} />
        <h1 className="text-3xl font-bold text-indigo-700">Leaderboard</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      ) : leaders.length === 0 ? (
        <p className="text-center text-gray-500">
          No leaderboard data available.
        </p>
      ) : (
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="w-full text-left">
            <thead className="bg-indigo-100 text-indigo-700">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((user, index) => (
                <tr
                  key={index}
                  className={`border-t hover:bg-indigo-50 transition duration-150 ${
                    index < 3 ? "bg-indigo-50" : ""
                  }`}
                >
                  <td className={`px-4 py-3 ${getRankStyle(user.rank)}`}>
                    #{user.rank}
                  </td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">{user.total_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
