import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("❌ VITE_GEMINI_API_KEY is missing");
}

// Khởi tạo AI client
const ai = new GoogleGenAI({ apiKey });

// ==========================
// 1️⃣ GỢI Ý TIÊU ĐỀ + NỘI DUNG THẢO LUẬN
// ==========================
export const generateContentFromTitle = async (
  title: string
): Promise<string> => {
  if (!title.trim()) {
    return "";
  }

  const prompt = `
Bạn là trợ lý hỗ trợ sinh viên viết bài thảo luận CLB.

Yêu cầu:
- Viết bằng tiếng Việt
- Văn phong lịch sự, phù hợp sinh viên
- Không markdown, không emoji
- Nội dung rõ ràng, có mở đầu, nội dung chính, kết luận, phù hợp với tiêu đề

Tiêu đề: ${title}

Hãy viết nội dung thảo luận chi tiết.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  return (
    response.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Không tạo được nội dung."
  );
};
export const generateEventDescription = async (title: string) => {
  const prompt = `
Bạn là trợ lý hỗ trợ sinh viên viết mô tả sự kiện CLB.

Yêu cầu:
- Viết tiếng Việt
- Văn phong trang trọng, phù hợp sinh viên
- Không markdown, không emoji
- Có: - nội dung chính 

Tên sự kiện: ${title}

Hãy viết mô tả sự kiện chi tiết.
`;

  const res = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  return (
    res.candidates?.[0]?.content?.parts?.[0]?.text || ""
  );
};

export const sendMessage = async (message: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [{ text: message }],
      },
    ],
  });

  return (
    response.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Không nhận được phản hồi từ AI"
  );
};
