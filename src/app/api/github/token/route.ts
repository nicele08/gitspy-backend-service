import axios from "axios";
import Keys from "@/utils/keys";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: Keys.GITHUB_CLIENT_ID,
        client_secret: Keys.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.status === 200) {
      return NextResponse.json(response.data, { status: 200 });
    }
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
