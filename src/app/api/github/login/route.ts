import Keys from "@/utils/keys";
import { NextResponse } from "next/server";

export async function GET() {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${
        Keys.GITHUB_CLIENT_ID
      }`;
  return NextResponse.redirect(authUrl);
}
