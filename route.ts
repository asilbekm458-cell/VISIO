import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const body = await request.json().catch(() => null);

  return NextResponse.json({
    success: true,
    status: "completed",
    message: "Virtual staging muvaffaqiyatli yakunlandi",
    data: {
      id: `staging-${Date.now()}`,
      roomId: body?.roomId || "room-001",
      style: body?.style || "modern",
      furnitureCount: 12,
      accessories: 8,
      createdAt: new Date().toISOString(),
      thumbnailUrl: "/placeholder-staging.jpg",
      downloadUrl: "/placeholder-staging-full.jpg",
      beforeAfter: {
        before: "/placeholder-empty.jpg",
        after: "/placeholder-staged.jpg",
      },
    },
    meta: {
      processingTime: "8m 42s",
      aiModel: "visio-staging-v1.3",
      furnitureLibrary: "2026-Q2",
    },
  });
}
