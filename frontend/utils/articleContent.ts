export type RichTextNode = {
  type?: string;
  text?: string;
  content?: RichTextNode[];
  attrs?: Record<string, unknown>;
};

export type RichTextDoc = {
  type: "doc";
  content: RichTextNode[];
};

export type ParsedArticleContent = {
  mode: "markdown" | "richtext";
  markdown: string;
  richText: RichTextDoc;
};

export function createEmptyRichTextDoc(): RichTextDoc {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
      },
    ],
  };
}

export function isRichTextDoc(value: unknown): value is RichTextDoc {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<RichTextDoc>;
  return candidate.type === "doc" && Array.isArray(candidate.content);
}

export function parseArticleContent(raw: unknown): ParsedArticleContent {
  if (isRichTextDoc(raw)) {
    return {
      mode: "richtext",
      markdown: "",
      richText: raw,
    };
  }

  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (trimmed) {
      try {
        const parsed = JSON.parse(trimmed);
        if (isRichTextDoc(parsed)) {
          return {
            mode: "richtext",
            markdown: "",
            richText: parsed,
          };
        }
      } catch {
        // Fall through to markdown mode.
      }
    }

    return {
      mode: "markdown",
      markdown: raw,
      richText: createEmptyRichTextDoc(),
    };
  }

  return {
    mode: "richtext",
    markdown: "",
    richText: createEmptyRichTextDoc(),
  };
}

export function serializeArticleContent(
  mode: "markdown" | "richtext",
  markdown: string,
  richText: RichTextDoc,
): string {
  if (mode === "markdown") {
    return markdown.trim();
  }

  return JSON.stringify(isRichTextDoc(richText) ? richText : createEmptyRichTextDoc());
}

export function hasRichTextContent(doc: RichTextDoc): boolean {
  return doc.content.some(hasContentInNode);
}

function hasContentInNode(node: RichTextNode): boolean {
  if (typeof node.text === "string" && node.text.trim().length > 0) {
    return true;
  }

  if (node.type === "image") {
    return true;
  }

  return Array.isArray(node.content) ? node.content.some(hasContentInNode) : false;
}
