function groupLikeNotifications(list) {
  const result = [];
  const map = {};

  list.forEach((n) => {
    if (n.type !== "like") {
      // Không phải like thì giữ nguyên
      result.push({
        ...n,
        displayText: n.message || `${n.from_user.displayName} ${n.title}`,
      });
      return;
    }

    const key = `like_${n.related_post_id}`;

    if (!map[key]) map[key] = [];

    map[key].push(n);
  });

  // Xử lý các nhóm like
  Object.values(map).forEach((arr) => {
    if (arr.length === 1) {
      const n = arr[0];
      result.push({
        ...n,
        displayText: `${n.from_user.displayName} đã thích bài viết của bạn.`,
      });
    } else {
      const first = arr[0].from_user.displayName;
      const others = arr.length - 1;

      result.push({
        ...arr[0],
        displayText: `${first} và ${others} người khác đã thích bài viết của bạn.`,
      });
    }
  });

  // Sắp xếp lại theo thời gian
  return result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

