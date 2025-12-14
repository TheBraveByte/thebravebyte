<template>
  <div class="editor-wrapper">
    <div class="editor-toolbar" v-if="editor">
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        <Icon name="ph:text-b" />
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        <Icon name="ph:text-italic" />
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        H2
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        H3
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        <Icon name="ph:list-bullets" />
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
        <Icon name="ph:list-numbers" />
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
        <Icon name="ph:quotes" />
      </button>
      <button @click="addImage">
        <Icon name="ph:image" />
      </button>
    </div>
    
    <editor-content :editor="editor" class="editor-content" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Image,
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getJSON());
  },
  editorProps: {
    attributes: {
      class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px]',
    },
  },
});

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (editor.value && JSON.stringify(newValue) !== JSON.stringify(editor.value.getJSON())) {
    editor.value.commands.setContent(newValue);
  }
});

const addImage = () => {
  const url = window.prompt('URL');
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run();
  }
};
</script>

<style scoped>
.editor-wrapper {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-tertiary);
  overflow: hidden;
}

.editor-toolbar {
  padding: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  gap: 0.5rem;
  background: var(--bg-secondary);
}

.editor-toolbar button {
  padding: 0.5rem;
  border-radius: 4px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
}

.editor-toolbar button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.editor-toolbar button.is-active {
  background: var(--accent-primary);
  color: white;
}

.editor-content {
  padding: 1rem;
  min-height: 300px;
}

/* Tiptap Styles matching Article Reader */
:deep(.ProseMirror) {
  outline: none;
  color: var(--text-primary);
}

:deep(.ProseMirror p) { margin-bottom: 1em; }
:deep(.ProseMirror h2) { font-size: 1.5rem; font-weight: 600; margin: 1.5em 0 0.5em; }
:deep(.ProseMirror h3) { font-size: 1.25rem; font-weight: 600; margin: 1.25em 0 0.5em; }
:deep(.ProseMirror ul), :deep(.ProseMirror ol) { padding-left: 1.5em; margin-bottom: 1em; }
:deep(.ProseMirror blockquote) { border-left: 3px solid var(--accent-primary); padding-left: 1rem; color: var(--text-secondary); font-style: italic; }
:deep(.ProseMirror img) { max-width: 100%; border-radius: 4px; }
</style>
