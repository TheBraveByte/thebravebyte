<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const route = useRoute();

await navigateTo({
  path: "/admin/editor",
  query: route.params.id === "create" ? {} : { id: String(route.params.id) },
}, { replace: true });
</script>
