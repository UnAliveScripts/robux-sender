export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return Response.json({ error: 'Keyword required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://users.roblox.com/v1/users/search?keyword=${encodeURIComponent(keyword)}&limit=10`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      return Response.json({ error: 'Roblox API error' }, { status: res.status });
    }

    const data = await res.json();
    const users = data.data || [];

    if (users.length > 0) {
      const userIds = users.map((u: any) => u.id).join(',');
      try {
        const thumbRes = await fetch(
          `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds}&size=150x150&format=Png`,
          { next: { revalidate: 0 } }
        );
        if (thumbRes.ok) {
          const thumbData = await thumbRes.json();
          const urlMap: Record<number, string> = {};
          for (const t of thumbData.data || []) {
            if (t.imageUrl) urlMap[t.targetId] = t.imageUrl;
          }
          for (const u of users) {
            u.avatarUrl = urlMap[u.id] || '';
          }
        }
      } catch {
        // ignore thumbnail errors
      }
    }

    return Response.json({ data: users });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
