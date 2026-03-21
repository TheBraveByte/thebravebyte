<template>
  <div class="p-10 bg-bg min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-text">Markdown Style Verification</h1>
    
    <div class="grid grid-cols-2 gap-10">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold text-text-secondary">Input (Markdown)</h2>
        <textarea 
          v-model="content" 
          class="w-full h-[600px] p-4 bg-bg-secondary border border-border rounded-xl font-mono text-sm text-text"
        ></textarea>
      </div>
      
      <div class="space-y-4">
        <h2 class="text-xl font-semibold text-text-secondary">Output (Preview) - Monaco @ 11.5px</h2>
        <div class="p-6 bg-bg-secondary border border-border rounded-xl">
          <MarkdownRenderer :content="content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const content = ref(`
# Theme Test

\`\`\`go
// Testing the Antigravity Theme
func main() {
    videoID := "vid_123"
    err := process(videoID)
    if err != nil {
        log.Fatalf("failed: %v", err)
    }
}
\`\`\`

## Mermaid Test

\`\`\`mermaid
graph TD
    A[Start] --> B{Is Monaco?}
    B -- Yes --> C[Perfect]
    B -- No --> D[Try Again]
\`\`\`
`);
</script>
