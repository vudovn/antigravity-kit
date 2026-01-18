---
name: convex-patterns
description: Convex backend patterns for real-time apps. Schema design, queries, mutations, actions, file storage, auth integration, and deployment.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Convex Patterns

> **Philosophy:** Real-time by default. Type-safe end-to-end. Serverless simplicity.

---

## 🎯 When to Use This Skill

- Designing Convex table schemas
- Writing queries, mutations, and actions
- Implementing real-time subscriptions
- Integrating authentication (Clerk, Auth.js)
- Managing file storage
- Deploying to production

---

## 1. Schema Design

### Table Definitions

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    tokenIdentifier: v.string(), // For auth
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"]),

  posts: defineTable({
    authorId: v.id("users"),
    title: v.string(),
    content: v.string(),
    publishedAt: v.optional(v.number()),
  })
    .index("by_author", ["authorId"])
    .index("by_published", ["publishedAt"]),
});
```

### Validator Patterns

```typescript
import { v } from "convex/values";

// Reusable validators
const postValidator = v.object({
  title: v.string(),
  content: v.string(),
  tags: v.optional(v.array(v.string())),
});

// Union types
const statusValidator = v.union(
  v.literal("draft"),
  v.literal("published"),
  v.literal("archived")
);
```

### Best Practices

| Practice | Do | Don't |
|----------|----|----- |
| **Indexes** | Add for all query filters | Query without indexes |
| **IDs** | Use `v.id("tableName")` | Store IDs as strings |
| **Timestamps** | Use `v.number()` (ms since epoch) | Store as ISO strings |
| **Relations** | Store ID references | Embed related documents |

---

## 2. Queries

### Basic Query

```typescript
// convex/posts.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .order("desc")
      .take(args.limit ?? 10);
  },
});
```

### Query with Relations

```typescript
export const getWithAuthor = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) return null;

    const author = await ctx.db.get(post.authorId);
    return { ...post, author };
  },
});
```

### Authenticated Queries

```typescript
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const myPosts = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("posts")
      .withIndex("by_author", (q) => q.eq("authorId", userId))
      .collect();
  },
});
```

---

## 3. Mutations

### Basic Mutation

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    return await ctx.db.insert("posts", {
      authorId: userId,
      title: args.title,
      content: args.content,
    });
  },
});
```

### Update Pattern

```typescript
export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    // Remove undefined values
    const patch = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );

    await ctx.db.patch(id, patch);
  },
});
```

---

## 4. Actions (External APIs)

```typescript
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const generateSummary = action({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    // Fetch data via query
    const post = await ctx.runQuery(api.posts.get, { id: args.postId });
    if (!post) throw new Error("Post not found");

    // Call external API
    const response = await fetch("https://api.openai.com/v1/...", {
      method: "POST",
      body: JSON.stringify({ content: post.content }),
    });

    const summary = await response.json();

    // Save via mutation
    await ctx.runMutation(api.posts.update, {
      id: args.postId,
      summary: summary.text,
    });

    return summary;
  },
});
```

---

## 5. Real-Time in React

### useQuery Hook

```tsx
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function PostList() {
  const posts = useQuery(api.posts.list, { limit: 10 });

  if (posts === undefined) return <Loading />;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### useMutation Hook

```tsx
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function CreatePost() {
  const createPost = useMutation(api.posts.create);

  const handleSubmit = async (data: FormData) => {
    await createPost({
      title: data.get("title") as string,
      content: data.get("content") as string,
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## 6. File Storage

### Upload

```typescript
// convex/files.ts
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
```

```tsx
// React component
const generateUploadUrl = useMutation(api.files.generateUploadUrl);

async function uploadFile(file: File) {
  const url = await generateUploadUrl();
  const result = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
  const { storageId } = await result.json();
  return storageId;
}
```

### Serve Files

```typescript
export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
```

---

## 7. Authentication

### Clerk Integration

```typescript
// convex/auth.config.ts
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};
```

```tsx
// app/providers.tsx
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
```

---

## 8. Deployment

### Commands

```bash
# Development (auto-sync)
npx convex dev

# Deploy to production
npx convex deploy

# Run one-off function
npx convex run posts:list

# View logs
npx convex logs
```

### Environment Variables

```bash
# Set production env vars
npx convex env set OPENAI_API_KEY sk-xxx

# List env vars
npx convex env list
```

---

## Anti-Patterns

| ❌ Don't | ✅ Do |
|---------|------|
| Store calculated values | Compute in queries |
| Query without indexes | Add indexes for filters |
| Call external APIs in mutations | Use actions for external calls |
| Store IDs as strings | Use `v.id("tableName")` |
| Ignore type errors | Trust Convex's type system |
| Manual cache invalidation | Let Convex handle reactivity |

---

## Code Review Checklist

- [ ] Schema has indexes for all query filters
- [ ] Mutations validate auth before writes
- [ ] Actions used for external API calls (not mutations)
- [ ] Queries return `undefined` during loading (handled in UI)
- [ ] File uploads use `generateUploadUrl` pattern
- [ ] Environment variables set for production
