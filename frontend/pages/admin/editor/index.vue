<template>
  <div class="min-h-screen bg-bg pt-28 pb-12">
    <div class="container mx-auto max-w-6xl px-6">
      <div class="mb-8 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p class="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-text-secondary">
            Editorial Workspace
          </p>
          <h1 class="text-3xl font-semibold tracking-tight text-text md:text-4xl">
            {{ pageTitle }}
          </h1>
          <p class="mt-2 text-sm text-text-secondary">
            {{ statusLine }}
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <NuxtLink
            to="/admin/dashboard"
            class="rounded-full border border-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-text hover:text-text"
          >
            Back to Dashboard
          </NuxtLink>
          <NuxtLink
            v-if="canViewArticle"
            :to="`/article/${form.slug}`"
            target="_blank"
            class="rounded-full border border-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-text hover:text-text"
          >
            View Article
          </NuxtLink>
          <button
            class="rounded-full border border-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-text transition-colors hover:border-text hover:bg-bg disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="saving || !canSaveDraft"
            @click="saveDraft(false)"
          >
            {{ secondaryActionLabel }}
          </button>
          <button
            class="rounded-full bg-text px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-bg transition-colors hover:bg-text-secondary disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="saving || !canPublish"
            @click="publish"
          >
            {{ primaryActionLabel }}
          </button>
        </div>
      </div>

      <div
        v-if="notice.message"
        class="mb-6 rounded-2xl border px-4 py-3 text-sm"
        :class="notice.type === 'error'
          ? 'border-error/30 bg-error/10 text-error'
          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'"
      >
        {{ notice.message }}
      </div>

      <div v-if="loadingArticle" class="rounded-3xl border border-border bg-bg-secondary/60 p-10 text-center">
        <p class="font-mono text-sm uppercase tracking-[0.24em] text-text-secondary">
          Loading Article
        </p>
      </div>

      <div v-else class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section class="space-y-6">
          <div class="rounded-3xl border border-border bg-bg-secondary/70 p-6 backdrop-blur-sm">
            <label class="mb-2 block font-mono text-xs uppercase tracking-[0.22em] text-text-secondary">
              Title
            </label>
            <input
              v-model="form.title"
              type="text"
              placeholder="Designing reliable systems under real constraints"
              class="w-full border-0 bg-transparent px-0 text-3xl font-semibold tracking-tight text-text outline-none placeholder:text-text-muted md:text-4xl"
            />
          </div>

          <div class="rounded-3xl border border-border bg-bg-secondary/70 p-6 backdrop-blur-sm">
            <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
              <label class="font-mono text-xs uppercase tracking-[0.22em] text-text-secondary">
                Content
              </label>

              <div class="flex flex-wrap gap-2">
                <button
                  class="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
                  :class="contentType === 'richtext'
                    ? 'bg-text text-bg'
                    : 'border border-border text-text-secondary hover:border-text hover:text-text'"
                  @click="setContentType('richtext')"
                >
                  Rich Text
                </button>
                <button
                  class="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
                  :class="contentType === 'markdown'
                    ? 'bg-text text-bg'
                    : 'border border-border text-text-secondary hover:border-text hover:text-text'"
                  @click="setContentType('markdown')"
                >
                  Markdown
                </button>
                <button
                  v-if="contentType === 'markdown'"
                  class="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-text hover:text-text"
                  @click="showPreview = !showPreview"
                >
                  {{ showPreview ? "Edit Markdown" : "Preview Markdown" }}
                </button>
              </div>
            </div>

            <ArticleEditor v-if="contentType === 'richtext'" v-model="richTextContent" />

            <div v-else>
              <textarea
                v-if="!showPreview"
                v-model="markdownContent"
                rows="20"
                placeholder="Write in markdown..."
                class="min-h-[460px] w-full rounded-2xl border border-border bg-bg px-4 py-4 font-mono text-sm leading-7 text-text outline-none transition-colors placeholder:text-text-muted focus:border-text"
              />
              <div v-else class="min-h-[460px] rounded-2xl border border-border bg-bg px-6 py-5">
                <MarkdownRenderer :content="markdownContent" />
              </div>
            </div>
          </div>
        </section>

        <aside class="space-y-6">
          <section class="rounded-3xl border border-border bg-bg-secondary/70 p-6 backdrop-blur-sm">
            <h2 class="text-lg font-semibold text-text">Publishing</h2>
            <div class="mt-4 space-y-4">
              <div>
                <label class="mb-2 block font-mono text-xs uppercase tracking-[0.22em] text-text-secondary">
                  Slug
                </label>
                <input
                  :value="form.slug"
                  type="text"
                  placeholder="article-slug"
                  class="w-full rounded-2xl border border-border bg-bg px-4 py-3 font-mono text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-text"
                  @input="updateSlug"
                />
                <p class="mt-2 break-all text-xs text-text-secondary">
                  {{ siteUrl }}/article/{{ form.slug || "your-slug" }}
                </p>
              </div>

              <div>
                <label class="mb-2 block font-mono text-xs uppercase tracking-[0.22em] text-text-secondary">
                  Excerpt
                </label>
                <textarea
                  v-model="form.excerpt"
                  rows="4"
                  placeholder="Short summary for cards, SEO, and sharing."
                  class="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm leading-7 text-text outline-none transition-colors placeholder:text-text-muted focus:border-text"
                />
              </div>

              <div>
                <label class="mb-2 block font-mono text-xs uppercase tracking-[0.22em] text-text-secondary">
                  Cover Image
                </label>
                <div class="space-y-3">
                  <input
                    v-model.trim="form.coverImage"
                    type="text"
                    placeholder="https://..."
                    class="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-text"
                  />
                  <label class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-text hover:text-text">
                    <Icon name="lucide:upload" class="h-4 w-4" />
                    Upload Image
                    <input
                      class="hidden"
                      type="file"
                      accept="image/*"
                      @change="handleImageUpload"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label class="mb-2 block font-mono text-xs uppercase tracking-[0.22em] text-text-secondary">
                  Author
                </label>
                <input
                  v-model.trim="form.author"
                  type="text"
                  placeholder="Yusuf Akinleye"
                  class="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-text"
                />
              </div>
            </div>
          </section>

          <section class="rounded-3xl border border-border bg-bg-secondary/70 p-6 backdrop-blur-sm">
            <h2 class="text-lg font-semibold text-text">Status</h2>
            <div class="mt-4 space-y-3 text-sm text-text-secondary">
              <p>
                <span class="font-semibold text-text">State:</span>
                {{ form.published ? "Published" : "Draft" }}
              </p>
              <p>
                <span class="font-semibold text-text">Autosave:</span>
                {{ autosaveLabel }}
              </p>
              <p>
                <span class="font-semibold text-text">Content mode:</span>
                {{ contentType === "richtext" ? "Rich text" : "Markdown" }}
              </p>
            </div>

            <div class="mt-6 flex flex-wrap gap-2">
              <button
                v-if="isEditing && form.published"
                class="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-amber-500 hover:text-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="saving"
                @click="unpublish"
              >
                Unpublish
              </button>
              <button
                v-if="isEditing"
                class="rounded-full border border-error/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-error transition-colors hover:bg-error hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="saving"
                @click="deleteArticle"
              >
                Delete
              </button>
            </div>
          </section>

          <div v-if="form.coverImage" class="overflow-hidden rounded-3xl border border-border bg-bg-secondary/70 backdrop-blur-sm">
            <img
              :src="form.coverImage"
              :alt="form.title || 'Cover image preview'"
              class="h-52 w-full object-cover"
            />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked";
import {
  createEmptyRichTextDoc,
  hasRichTextContent,
  parseArticleContent,
  serializeArticleContent,
  type RichTextDoc,
} from "~/utils/articleContent";

definePageMeta({
  middleware: "auth",
});

type EditableArticle = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
  publishedAt: string | null;
  author: string;
};

const route = useRoute();
const router = useRouter();
const token = useCookie<string | null>("auth_token");

const siteUrl = useRuntimeConfig().public.siteUrl || "http://localhost:3000";
const loadingArticle = ref(false);
const saving = ref(false);
const showPreview = ref(false);
const contentType = ref<"markdown" | "richtext">("richtext");
const markdownContent = ref("");
const richTextContent = ref<RichTextDoc>(createEmptyRichTextDoc());
const autosaveState = ref<"idle" | "dirty" | "saving" | "saved" | "error">("idle");
const notice = ref<{ type: "success" | "error"; message: string }>({
  type: "success",
  message: "",
});
const autosaveTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const slugManuallyEdited = ref(false);
const isHydrating = ref(true);
const loadedArticleId = ref("");
const lastSavedSnapshot = ref("");

const form = ref<EditableArticle>({
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "",
  published: false,
  publishedAt: null,
  author: "Yusuf Akinleye",
});

const articleId = computed(() => {
  const id = route.query.id;
  return typeof id === "string" ? id : "";
});

const isEditing = computed(() => Boolean(articleId.value));

const authHeaders = computed(() =>
  token.value
    ? {
        Authorization: `Bearer ${token.value}`,
      }
    : undefined,
);

const pageTitle = computed(() => (isEditing.value ? "Edit Article" : "New Article"));

const statusLine = computed(() => {
  if (saving.value) {
    return "Saving your changes...";
  }

  return autosaveLabel.value;
});

const autosaveLabel = computed(() => {
  switch (autosaveState.value) {
    case "dirty":
      return "Unsaved changes";
    case "saving":
      return "Autosaving changes";
    case "saved":
      return "All changes saved";
    case "error":
      return "Autosave failed";
    default:
      return isEditing.value ? "Editing existing article" : "Ready for a new draft";
  }
});


const contentPresent = computed(() => {
  if (contentType.value === "markdown") {
    return markdownContent.value.trim().length > 0;
  }

  return hasRichTextContent(richTextContent.value);
});

const canPublish = computed(() => {
  return (
    form.value.title.trim().length > 0 &&
    form.value.slug.trim().length > 0 &&
    form.value.excerpt.trim().length > 0 &&
    contentPresent.value
  );
});

const canSaveDraft = computed(() => {
  return Boolean(
    form.value.title.trim() ||
      form.value.slug.trim() ||
      form.value.excerpt.trim() ||
      form.value.coverImage.trim() ||
      contentPresent.value,
  );
});

const canViewArticle = computed(() => form.value.published && form.value.slug.trim().length > 0);

const secondaryActionLabel = computed(() => {
  if (saving.value) return "Saving";
  return form.value.published ? "Save Changes" : "Save Draft";
});

const primaryActionLabel = computed(() => {
  if (saving.value) return "Saving";
  return form.value.published ? "Update Article" : "Publish";
});

const autosaveSnapshot = computed(() =>
  JSON.stringify({
    form: form.value,
    contentType: contentType.value,
    markdown: markdownContent.value,
    richText: richTextContent.value,
  }),
);

watch(articleId, async () => {
  await loadArticle();
}, { immediate: true });

watch(
  () => form.value.title,
  (title) => {
    if (!title || slugManuallyEdited.value) return;
    form.value.slug = slugify(title);
  },
);

watch(
  autosaveSnapshot,
  (snapshot) => {
    if (isHydrating.value) return;
    if (snapshot === lastSavedSnapshot.value) return;
    if (!canSaveDraft.value) return;

    autosaveState.value = "dirty";
    scheduleAutosave();
  },
);

onUnmounted(() => {
  if (autosaveTimer.value) {
    clearTimeout(autosaveTimer.value);
  }
});

async function loadArticle() {
  clearNotice();
  cancelAutosave();
  isHydrating.value = true;

  if (!isEditing.value) {
    loadedArticleId.value = "";
    slugManuallyEdited.value = false;
    form.value = {
      title: "",
      slug: "",
      excerpt: "",
      coverImage: "",
      published: false,
      publishedAt: null,
      author: "Yusuf Akinleye",
    };
    contentType.value = "richtext";
    richTextContent.value = createEmptyRichTextDoc();
    markdownContent.value = "";
    showPreview.value = false;
    autosaveState.value = "idle";
    lastSavedSnapshot.value = autosaveSnapshot.value;
    isHydrating.value = false;
    return;
  }

  if (articleId.value === loadedArticleId.value) {
    isHydrating.value = false;
    return;
  }

  loadingArticle.value = true;

  try {
    const article = await (apiFetch as any)(`/articles/${articleId.value}`, {
      headers: authHeaders.value,
    });

    applyArticle(article);
    loadedArticleId.value = article._id;
    lastSavedSnapshot.value = autosaveSnapshot.value;
    autosaveState.value = "idle";
  } catch (loadError: any) {
    notice.value = {
      type: "error",
      message:
        loadError?.data?.error ||
        loadError?.message ||
        "Failed to load the article.",
    };
  } finally {
    loadingArticle.value = false;
    isHydrating.value = false;
  }
}

function applyArticle(article: any) {
  const parsedContent = parseArticleContent(article?.content);

  form.value = {
    _id: article?._id,
    title: article?.title || "",
    slug: article?.slug || "",
    excerpt: article?.excerpt || "",
    coverImage: article?.coverImage || "",
    published: Boolean(article?.published),
    publishedAt: article?.publishedAt || null,
    author: article?.author || "Yusuf Akinleye",
  };

  contentType.value = parsedContent.mode;
  markdownContent.value = parsedContent.markdown;
  richTextContent.value = parsedContent.richText;
  slugManuallyEdited.value = Boolean(article?.slug);
  showPreview.value = false;
}

function scheduleAutosave() {
  cancelAutosave();
  autosaveTimer.value = setTimeout(async () => {
    autosaveState.value = "saving";
    await saveDraft(true);
  }, 1500);
}

function cancelAutosave() {
  if (autosaveTimer.value) {
    clearTimeout(autosaveTimer.value);
    autosaveTimer.value = null;
  }
}

function clearNotice() {
  notice.value.message = "";
}

function updateSlug(event: Event) {
  const nextValue = (event.target as HTMLInputElement).value;
  slugManuallyEdited.value = true;
  form.value.slug = slugify(nextValue);
}

function setContentType(nextType: "markdown" | "richtext") {
  if (contentType.value === nextType) return;

  contentType.value = nextType;
  showPreview.value = false;
}

async function saveDraft(isAutoSave: boolean) {
  await saveArticle({
    publish: form.value.published,
    successMessage: form.value.published ? "Published article updated." : "Draft saved.",
    autoSave: isAutoSave,
  });
}

async function publish() {
  await saveArticle({
    publish: true,
    successMessage: "Article published successfully.",
    autoSave: false,
  });
}

async function unpublish() {
  if (!confirm("Unpublish this article? It will no longer be visible publicly.")) {
    return;
  }

  await saveArticle({
    publish: false,
    successMessage: "Article moved back to draft.",
    autoSave: false,
  });
}

async function saveArticle(options: {
  publish: boolean;
  successMessage: string;
  autoSave: boolean;
}) {
  if (!token.value) {
    notice.value = {
      type: "error",
      message: "Admin session missing. Please log in again.",
    };
    return;
  }

  if (!options.autoSave) {
    clearNotice();
  }

  saving.value = true;
  if (options.autoSave) {
    autosaveState.value = "saving";
  }

  try {
    const payload = {
      ...form.value,
      title: form.value.title.trim(),
      slug: form.value.slug.trim(),
      excerpt: form.value.excerpt.trim(),
      coverImage: form.value.coverImage.trim(),
      author: form.value.author.trim() || "Yusuf Akinleye",
      published: options.publish,
      publishedAt: options.publish
        ? form.value.publishedAt || new Date().toISOString()
        : null,
      content: serializeArticleContent(
        contentType.value,
        markdownContent.value,
        richTextContent.value,
      ),
    };

    const endpoint = isEditing.value ? `/articles/${articleId.value}` : "/articles";
    const method = isEditing.value ? "PUT" : "POST";

    const savedArticle = await (apiFetch as any)(endpoint, {
      method,
      headers: authHeaders.value,
      body: payload,
    });

    isHydrating.value = true;
    applyArticle(savedArticle);
    loadedArticleId.value = savedArticle._id;

    if (!isEditing.value) {
      await router.replace({ path: "/admin/editor", query: { id: savedArticle._id } });
    }

    lastSavedSnapshot.value = autosaveSnapshot.value;
    autosaveState.value = "saved";

    if (!options.autoSave) {
      notice.value = {
        type: "success",
        message: options.successMessage,
      };
    }
  } catch (saveError: any) {
    autosaveState.value = "error";
    notice.value = {
      type: "error",
      message:
        saveError?.data?.error ||
        saveError?.message ||
        "Failed to save the article.",
    };
  } finally {
    saving.value = false;
    isHydrating.value = false;
  }
}

async function deleteArticle() {
  if (!isEditing.value) return;
  if (!confirm("Delete this article permanently? This cannot be undone.")) {
    return;
  }

  saving.value = true;
  clearNotice();

  try {
    await apiFetch(`/articles/${articleId.value}`, {
      method: "DELETE",
      headers: authHeaders.value,
    });

    await router.push("/admin/dashboard");
  } catch (deleteError: any) {
    notice.value = {
      type: "error",
      message:
        deleteError?.data?.error ||
        deleteError?.message ||
        "Failed to delete the article.",
    };
  } finally {
    saving.value = false;
  }
}

function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    form.value.coverImage = String(loadEvent.target?.result || "");
  };
  reader.readAsDataURL(file);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
</script>

<style scoped>
.markdown-preview {
  color: var(--color-text);
}

.markdown-preview :where(p, ul, ol, blockquote, pre, table) {
  margin-bottom: 1em;
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
  margin-bottom: 0.5em;
  color: var(--color-text);
  font-weight: 600;
  line-height: 1.25;
}

.markdown-preview h1 {
  font-size: 2rem;
}

.markdown-preview h2 {
  font-size: 1.5rem;
}

.markdown-preview h3 {
  font-size: 1.25rem;
}

.markdown-preview ul,
.markdown-preview ol {
  padding-left: 1.5rem;
}

.markdown-preview ul {
  list-style: disc;
}

.markdown-preview ol {
  list-style: decimal;
}

.markdown-preview blockquote {
  border-left: 4px solid var(--color-accent);
  padding-left: 1rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

.markdown-preview code {
  border-radius: 4px;
  background: var(--color-bg-secondary);
  padding: 0.15em 0.35em;
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.markdown-preview pre {
  overflow-x: auto;
  border-radius: 12px;
  background: var(--color-bg-secondary);
  padding: 1rem;
}

.markdown-preview pre code {
  background: transparent;
  padding: 0;
}

.markdown-preview a {
  color: var(--color-text);
  text-decoration: underline;
}

.markdown-preview img {
  margin: 1.5rem 0;
  max-width: 100%;
  border-radius: 12px;
}
</style>
