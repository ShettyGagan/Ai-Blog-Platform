"use client";

import React from "react";
import { ArrowRight, Loader2, User } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import PostEditor from "@/components/post-editor";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreatePostPage() {
  // Get existing draft
  const { data: existingDraft, isLoading: isDraftLoading } = useConvexQuery(
    api.posts.getUserDraft
  );

  const { data: currentUser, isLoading: userLoading } = useConvexQuery(
    api.users.getCurrentUser
  );

  if (isDraftLoading || userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
          <span className="text-slate-200 text-lg">Loading editor...</span>
        </div>
      </div>
    );
  }

  if (!currentUser?.username) {
    return (
      <div className="h-80 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center space-y-6 backdrop-blur-sm bg-slate-900/30 p-10 rounded-2xl border border-cyan-500/20">
          <div className="p-4 bg-cyan-500/10 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <User className="h-10 w-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold text-white gradient-text-primary">Username Required</h1>
          <p className="text-slate-300 text-lg">
            Set up a username to create and share your posts
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/dashboard/settings">
              <Button variant="primary" size="lg" className="shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30">
                Set Up Username
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <PostEditor initialData={existingDraft} mode="create" />;
}
