import { useState } from "react";
import { generateTopicByAI } from "../services/geminiService";

interface Props {
  onClose: () => void;
  onApply: (title: string, content: string) => void;
}

const AiSuggestTopic = ({ onClose, onApply }: Props) => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title: string; content: string } | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await generateTopicByAI(idea);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-lg p-6">
        <h3 className="text-lg font-bold mb-3">
          🤖 AI gợi ý chủ đề thảo luận
        </h3>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="VD: Thảo luận về kế hoạch sinh hoạt CLB tháng 10"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !idea.trim()}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          {loading ? "Đang tạo..." : "Tạo nội dung"}
        </button>

        {result && (
          <div className="mt-4 space-y-3">
            <input
              className="w-full border p-2 rounded font-semibold"
              value={result.title}
              readOnly
            />
            <textarea
              className="w-full border p-2 rounded h-40"
              value={result.content}
              readOnly
            />
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose}>Hủy</button>
          {result && (
            <button
              onClick={() => onApply(result.title, result.content)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Áp dụng
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiSuggestTopic;
