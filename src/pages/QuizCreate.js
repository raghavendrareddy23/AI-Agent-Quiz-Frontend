import { useState } from "react";
import { generateQuiz, createQuizManual } from "../services/quizService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function QuizCreate() {
  const [mode, setMode] = useState("ai");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    technology: "",
    difficulty: "medium",
    num_questions: 10,
    is_public: true,
    questions: [],
  });

  const navigate = useNavigate();
  const difficulties = ["easy", "medium", "hard"];

  const handleBack = () => navigate(-1);

  const handleAIQuiz = async () => {
    if (!form.technology) {
      toast.error("Please provide technology name.");
      return;
    }
    setLoading(true);
    try {
      const res = await generateQuiz(
        form.technology,
        form.difficulty,
        form.num_questions,
        form.is_public
      );
      toast.success("Quiz generated successfully!");
      navigate(`/quiz/${res.data.id}`);
    } catch (err) {
      toast.error("Failed to generate quiz. Try after sometime");
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    setForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question_text: "",
          explanation: "",
          options: [
            { option_text: "", is_correct: false },
            { option_text: "", is_correct: false },
            { option_text: "", is_correct: false },
            { option_text: "", is_correct: false },
          ],
        },
      ],
    }));
  };

  const handleManualSubmit = async () => {
    if (form.questions.length !== form.num_questions) {
      toast.error("Questions count must match number of questions.");
      return;
    }
    setLoading(true);
    try {
      const res = await createQuizManual(form);
      toast.success("Quiz created successfully!");
      navigate(`/quiz/${res.data.id}`);
    } catch (err) {
      toast.error("Failed to create quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto mt-16">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-indigo-700">Create Quiz</h1>

      {/* Mode Toggle */}
      <div className="mb-6 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            mode === "ai"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setMode("ai")}
        >
          Generate with AI
        </button>
        <button
          className={`px-4 py-2 rounded ${
            mode === "manual"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setMode("manual")}
        >
          Create Manually
        </button>
      </div>

      {/* Shared Fields */}
      <div className="space-y-4 mb-6">
        {mode === "manual" && (
          <>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            ></textarea>
          </>
        )}

        <input
          type="text"
          placeholder="Technology"
          className="w-full p-2 border rounded"
          value={form.technology}
          onChange={(e) => setForm({ ...form, technology: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded"
          value={form.difficulty}
          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
        >
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="10"
          max="25"
          placeholder="Number of Questions"
          className="w-full p-2 border rounded"
          value={form.num_questions}
          onChange={(e) =>
            setForm({ ...form, num_questions: Number(e.target.value) })
          }
        />
      </div>

      {/* AI Mode */}
      {mode === "ai" && (
        <button
          onClick={handleAIQuiz}
          className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              Generating...
            </div>
          ) : (
            "Generate Quiz"
          )}
        </button>
      )}

      {/* Manual Mode */}
      {mode === "manual" && (
        <>
          {form.questions.map((q, qi) => (
            <div
              key={qi}
              className="border p-4 rounded mb-4 bg-white shadow-sm"
            >
              <input
                type="text"
                placeholder={`Q${qi + 1} Question`}
                className="w-full p-2 mb-2 border rounded"
                value={q.question_text}
                onChange={(e) => {
                  const updated = [...form.questions];
                  updated[qi].question_text = e.target.value;
                  setForm({ ...form, questions: updated });
                }}
              />
              <textarea
                placeholder="Explanation (optional)"
                className="w-full p-2 mb-2 border rounded"
                value={q.explanation}
                onChange={(e) => {
                  const updated = [...form.questions];
                  updated[qi].explanation = e.target.value;
                  setForm({ ...form, questions: updated });
                }}
              ></textarea>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${qi}`}
                      checked={opt.is_correct}
                      onChange={() => {
                        const updated = [...form.questions];
                        updated[qi].options = updated[qi].options.map(
                          (o, i) => ({
                            ...o,
                            is_correct: i === oi,
                          })
                        );
                        setForm({ ...form, questions: updated });
                      }}
                    />
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder={`Option ${oi + 1}`}
                      value={opt.option_text}
                      onChange={(e) => {
                        const updated = [...form.questions];
                        updated[qi].options[oi].option_text = e.target.value;
                        setForm({ ...form, questions: updated });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={addQuestion}
            className="text-indigo-600 underline mb-4"
          >
            + Add Question
          </button>
          <br />
          <button
            onClick={handleManualSubmit}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                Submitting...
              </div>
            ) : (
              "Submit Quiz"
            )}
          </button>
        </>
      )}
    </div>
  );
}

export default QuizCreate;
