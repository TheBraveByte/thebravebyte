<template>
  <div class="min-h-screen bg-bg pt-28 pb-12">
    <div class="container mx-auto max-w-6xl px-6">
      <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-text-secondary">
            Content Control
          </p>
          <h1 class="text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Admin Dashboard
          </h1>
          <p class="mt-2 max-w-2xl text-sm text-text-secondary">
            Manage articles, drafts, and publishing states from one place.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <NuxtLink
            to="/admin/editor"
            class="inline-flex items-center gap-2 rounded-full bg-text px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-bg transition-colors hover:bg-text-secondary"
          >
            <Icon name="lucide:plus" class="h-4 w-4" />
            New Article
          </NuxtLink>
          <button
            class="rounded-full border border-border px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-error hover:text-error"
            :disabled="loggingOut"
            @click="logout"
          >
            {{ loggingOut ? "Signing Out" : "Logout" }}
          </button>
        </div>
      </div>

      <div
        v-if="feedback.message"
        class="mb-6 rounded-2xl border px-4 py-3 text-sm"
        :class="feedback.type === 'error'
          ? 'border-error/30 bg-error/10 text-error'
          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'"
      >
        {{ feedback.message }}
      </div>

      <div class="mb-8 grid gap-4 md:grid-cols-3">
        <section
          v-for="card in statCards"
          :key="card.label"
          class="rounded-3xl border border-border bg-bg-secondary/70 p-6 backdrop-blur-sm"
        >
          <p class="font-mono text-xs uppercase tracking-[0.24em] text-text-secondary">
            {{ card.label }}
          </p>
          <p class="mt-3 text-3xl font-semibold tracking-tight text-text">
            {{ card.value }}
          </p>
          <p class="mt-2 text-sm text-text-secondary">
            {{ card.copy }}
          </p>
        </section>
      </div>

      <div class="mb-6 flex flex-col gap-4 rounded-3xl border border-border bg-bg-secondary/60 p-5 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-1 flex-col gap-4 md:flex-row">
          <label class="relative block flex-1">
            <Icon
              name="lucide:search"
              class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
            />
            <input
              v-model.trim="search"
              type="search"
              placeholder="Search title, slug, or excerpt"
              class="w-full rounded-2xl border border-border bg-bg px-11 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-text"
            />
          </label>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in filterOptions"
              :key="option.value"
              class="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
              :class="filter === option.value
                ? 'bg-text text-bg'
                : 'border border-border text-text-secondary hover:border-text hover:text-text'"
              @click="filter = option.value"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <button
          class="rounded-full border border-border px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-text hover:text-text"
          :disabled="pending"
          @click="refresh"
        >
          Refresh
        </button>
      </div>

      <div v-if="pending" class="rounded-3xl border border-border bg-bg-secondary/60 p-10 text-center">
        <p class="font-mono text-sm uppercase tracking-[0.24em] text-text-secondary">
          Loading Articles
        </p>
      </div>

      <div v-else-if="fetchError" class="rounded-3xl border border-error/30 bg-error/10 p-8 text-center">
        <p class="text-lg font-semibold text-error">Unable to load admin articles.</p>
        <p class="mt-2 text-sm text-error/80">
          {{ fetchError }}
        </p>
      </div>

      <div v-else-if="filteredArticles.length === 0" class="rounded-3xl border border-dashed border-border bg-bg-secondary/40 p-12 text-center">
        <p class="text-lg font-semibold text-text">No matching articles.</p>
        <p class="mt-2 text-sm text-text-secondary">
          Adjust the filters or create a fresh draft.
        </p>
      </div>

      <div v-else class="space-y-4">
        <article
          v-for="article in filteredArticles"
          :key="article._id"
          class="rounded-3xl border border-border bg-bg-secondary/70 p-5 transition-colors hover:border-text/40"
        >
          <div class="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div class="min-w-0 flex-1">
              <div class="mb-3 flex flex-wrap items-center gap-3">
                <span
                  class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                  :class="article.published
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'"
                >
                  <span
                    class="h-2 w-2 rounded-full"
                    :class="article.published ? 'bg-emerald-500' : 'bg-amber-500'"
                  />
                  {{ article.published ? "Published" : "Draft" }}
                </span>
                <span class="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
                  {{ formatDate(article.updatedAt || article.createdAt) }}
                </span>
              </div>

              <h2 class="text-xl font-semibold tracking-tight text-text md:text-2xl">
                {{ article.title || "Untitled article" }}
              </h2>

              <p class="mt-3 line-clamp-2 text-sm leading-7 text-text-secondary">
                {{ article.excerpt || "No excerpt added yet." }}
              </p>

              <div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                <span class="rounded-full border border-border px-3 py-1 font-mono">
                  /article/{{ article.slug || "missing-slug" }}
                </span>
                <span v-if="article.author" class="font-mono uppercase tracking-[0.18em]">
                  {{ article.author }}
                </span>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 xl:w-[260px] xl:justify-end">
              <NuxtLink
                :to="articleEditLink(article._id)"
                class="inline-flex min-w-[120px] items-center justify-center rounded-full border border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-text transition-colors hover:border-text hover:bg-bg"
              >
                Edit
              </NuxtLink>
              <NuxtLink
                v-if="article.published && article.slug"
                :to="`/article/${article.slug}`"
                target="_blank"
                class="inline-flex min-w-[120px] items-center justify-center rounded-full border border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-text hover:text-text"
              >
                View
              </NuxtLink>
              <button
                class="inline-flex min-w-[120px] items-center justify-center rounded-full border border-error/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-error transition-colors hover:bg-error hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="deletingId === article._id"
                @click="deleteArticle(article)"
              >
                {{ deletingId === article._id ? "Deleting" : "Delete" }}
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

type AdminArticle = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author?: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const router = useRouter();
const token = useCookie<string | null>("auth_token");

const filter = ref<"all" | "published" | "draft">("all");
const search = ref("");
const deletingId = ref<string | null>(null);
const loggingOut = ref(false);
const feedback = ref<{ type: "success" | "error"; message: string }>({
  type: "success",
  message: "",
});

const authHeaders = computed(() =>
  token.value
    ? {
        Authorization: `Bearer ${token.value}`,
      }
    : undefined,
);

const {
  data: articlesData,
  pending,
  refresh,
  error,
} = await useAsyncData("admin-articles", () =>
  apiFetch("/articles/admin", {
    headers: authHeaders.value,
    query: { limit: 100 },
  }),
);

const articles = computed<AdminArticle[]>(() =>
  Array.isArray(articlesData.value?.articles) ? articlesData.value.articles : [],
);

const statCards = computed(() => {
  const published = articles.value.filter((article) => article.published).length;
  const drafts = articles.value.length - published;

  return [
    {
      label: "Total Articles",
      value: articles.value.length,
      copy: "Everything in the admin workspace.",
    },
    {
      label: "Published",
      value: published,
      copy: "Live posts currently visible to readers.",
    },
    {
      label: "Drafts",
      value: drafts,
      copy: "Articles still being refined internally.",
    },
  ];
});

const filterOptions = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Drafts" },
] as const;

const filteredArticles = computed(() => {
  const term = search.value.trim().toLowerCase();

  return articles.value.filter((article) => {
    const matchesFilter =
      filter.value === "all" ||
      (filter.value === "published" && article.published) ||
      (filter.value === "draft" && !article.published);

    if (!matchesFilter) return false;
    if (!term) return true;

    return [article.title, article.slug, article.excerpt]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(term));
  });
});

const fetchError = computed(() => {
  if (!error.value) return "";
  return error.value.data?.error || error.value.message || "Unknown error";
});

function articleEditLink(id: string) {
  return `/admin/editor?id=${id}`;
}

function formatDate(date?: string) {
  if (!date) return "No date";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function deleteArticle(article: AdminArticle) {
  if (!confirm(`Delete "${article.title || "this article"}" permanently?`)) {
    return;
  }

  deletingId.value = article._id;
  feedback.value.message = "";

  try {
    await apiFetch(`/articles/${article._id}`, {
      method: "DELETE",
      headers: authHeaders.value,
    });

    await refresh();
    feedback.value = {
      type: "success",
      message: "Article deleted successfully.",
    };
  } catch (deleteError: any) {
    feedback.value = {
      type: "error",
      message:
        deleteError?.data?.error ||
        deleteError?.message ||
        "Failed to delete article.",
    };
  } finally {
    deletingId.value = null;
  }
}

async function logout() {
  loggingOut.value = true;

  try {
    await apiFetch("/auth/logout", { method: "POST" });
  } catch (logoutError) {
    // Logging out locally is enough to invalidate the admin session on the client.
  } finally {
    token.value = null;
    loggingOut.value = false;
    await router.push("/admin/login");
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
