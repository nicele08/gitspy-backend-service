import axios from "axios";
import Keys from "@/utils/keys";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const newHeaders = new Headers(req.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.set("Access-Control-Allow-Methods", "GET");
  newHeaders.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.json(
      { error: "No code provided" },
      { status: 400, headers: newHeaders }
    );
  }
  try {
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
      return NextResponse.json(response.data, {
        status: 200,
        headers: newHeaders,
      });
    }
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401, headers: newHeaders }
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: newHeaders }
    );
  }
}
