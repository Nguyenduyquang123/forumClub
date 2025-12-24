import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

/* =======================
        TYPES
======================= */
interface GalleryImage {
  id: number;
  title: string;
  image_url: string;
  description?: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface Honor {
  id: number;
  name: string;
  role: string;
  avatar: string;
  description?: string;
}

function Traditional() {
  const { id: clubId } = useParams<{ id: string }>();

  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [honors, setHonors] = useState<Honor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /* =======================
        FETCH ALL
  ======================= */
  useEffect(() => {
    if (!clubId) return;
    fetchAll();
  }, [clubId]);

  const fetchAll = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchGallery(), fetchAchievements(), fetchHonors()]);
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
        API CALLS
  ======================= */
  const fetchGallery = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/clubs/${clubId}/gallery`
    );
    setGallery(res.data.gallery ?? []);
  };

  const fetchAchievements = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/clubs/${clubId}/achievements`
    );
    setAchievements(res.data.achievements ?? []);
  };

  const fetchHonors = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/clubs/${clubId}/honors`
    );
    setHonors(res.data.honors ?? []);
  };
  console.log("gallery", gallery);
  console.log("achievements", achievements);
  console.log("honors", honors);

  /* =======================
          UI
  ======================= */
  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-14 py-10 w-[80%] mx-auto">
      {/* HEADER */}
      <header>
        <h1 className="text-4xl font-black mb-2">
          Phòng Truyền Thống Câu lạc bộ
        </h1>
        <p className="text-slate-500">
          Hành trình lịch sử và những dấu ấn đáng nhớ.
        </p>
      </header>

      {/* ================== GALLERY (NEW UI) ================== */}
      <section className="flex flex-col gap-8" id="thu-vien-anh">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-bold mb-1">Thư viện ảnh</h2>
            <p className="text-slate-500">
              Khám phá các bộ sưu tập hình ảnh theo chủ đề.
            </p>
          </div>

          {/* NÚT THÊM ALBUM */}
          <button
            className="text-sm font-semibold text-white bg-primary px-4 py-2 rounded-lg hover:opacity-90"
            onClick={() => {
              // TODO: mở modal / navigate trang tạo album
              console.log("Thêm album");
            }}
          >
            + Thêm album
          </button>
        </div>

        {gallery.length === 0 ? (
          <p className="text-slate-500">Chưa có album.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((album) => (
              <div key={album.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] border shadow-sm">
                  <img
                    src={
                      album.cover_image ||
                      "https://via.placeholder.com/600x400?text=Album"
                    }
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      photo_library
                    </span>
                    <span>{album.images_count} ảnh</span>
                  </div>
                </div>

                <h3 className="mt-3 font-bold group-hover:text-primary transition-colors">
                  {album.title}
                </h3>

                {album.description && (
                  <p className="text-sm text-slate-500 mt-1">
                    {album.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================== ACHIEVEMENTS ================== */}
      <section id="thanh-tich">
        <h2 className="text-2xl font-bold mb-6">Thành tựu</h2>

        {achievements.length === 0 ? (
          <p className="text-slate-500">Chưa có thành tựu.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((a) => (
              <div
                key={a.id}
                className="p-6 rounded-xl border bg-slate-50 text-center"
              >
                <span className="material-symbols-outlined text-4xl text-primary">
                  {a.icon}
                </span>
                <h3 className="font-bold mt-3">{a.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{a.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================== HONORS ================== */}
      <section id="vinh-danh">
        <h2 className="text-2xl font-bold mb-6">Vinh danh Cá nhân</h2>

        {honors.length === 0 ? (
          <p className="text-slate-500">Chưa có vinh danh.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {honors.map((h) => (
              <div key={h.id} className="p-6 rounded-xl border text-center">
                <img
                  src={h.avatar}
                  alt={h.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover mb-3"
                />
                <h3 className="font-bold">{h.name}</h3>
                <p className="text-primary text-sm font-medium">{h.role}</p>
                {h.description && (
                  <p className="text-sm text-slate-500 mt-2">{h.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Traditional;
