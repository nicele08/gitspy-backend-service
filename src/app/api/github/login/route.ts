import Keys from "@/utils/keys";
import { NextResponse } from "next/server";

export async function GET() {
    const allScopes = [
        'repo',
        'admin:org',
        'admin:public_key',
        'admin:repo_hook',
        'admin:org_hook',
        'gist',
        'notifications',
        'user',
        'delete_repo',
        'write:discussion',
        'read:discussion',
        'write:packages',
        'read:packages',
        'delete:packages',
        'admin:gpg_key',
        'workflow',
      ];
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${
        Keys.GITHUB_CLIENT_ID
      }&scope=${allScopes.join(' ')}`;
  return NextResponse.redirect(authUrl);
}
