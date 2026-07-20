import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  const limit = searchParams.get("limit") || "10";

  if (!keyword) {
    return NextResponse.json({ error: "Missing keyword" }, { status: 400 });
  }

  try {
    // Search users via Roblox API
    const searchRes = await fetch(
      `https://users.roblox.com/v1/users/search?keyword=${encodeURIComponent(keyword)}&limit=${limit}`,
      { headers: { "Content-Type": "application/json" } }
    );

    if (!searchRes.ok) {
      return NextResponse.json(
        { error: "Roblox API error" },
        { status: searchRes.status }
      );
    }

    const searchData = await searchRes.json();
    const users = searchData.data || [];

    if (users.length === 0) {
      return NextResponse.json({ data: [] });
    }

    // Fetch avatars for found users
    const userIds = users.map((u: any) => u.id);
    const avatarRes = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds.join(",")}&size=150x150&format=Png`,
      { headers: { "Content-Type": "application/json" } }
    );

    let avatars: any[] = [];
    if (avatarRes.ok) {
      const avatarData = await avatarRes.json();
      avatars = avatarData.data || [];
    }

    // Merge avatar URLs into user data
    const merged = users.map((user: any) => {
      const avatar = avatars.find((a: any) => a.targetId === user.id);
      return {
        ...user,
        avatarUrl: avatar?.imageUrl || null,
      };
    });

    return NextResponse.json({ data: merged });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
