<template>
  <div class="container admin-container">
    <div class="header-actions">
      <h1 class="title">Dashboard</h1>
      <div class="actions">
        <NuxtLink to="/admin/editor/create" class="btn btn-primary">
          <Icon name="ph:plus" /> New Article
        </NuxtLink>
        <button @click="logout" class="btn btn-ghost">
          <Icon name="ph:sign-out" /> Logout
        </button>
      </div>
    </div>

    <div v-if="pending" class="loading">Loading...</div>
    <div v-else class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in data?.articles" :key="article._id">
            <td>{{ article.title }}</td>
            <td>
              <span :class="['status-badge', article.published ? 'published' : 'draft']">
                {{ article.published ? 'Published' : 'Draft' }}
              </span>
            </td>
            <td>{{ formatDate(article.createdAt) }}</td>
            <td>
              <div class="row-actions">
                <NuxtLink :to="`/admin/editor/${article._id}`" class="btn-icon">
                  <Icon name="ph:pencil" />
                </NuxtLink>
                <NuxtLink :to="`/article/${article.slug}`" class="btn-icon" target="_blank">
                  <Icon name="ph:eye" />
                </NuxtLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'] // We'll need to create this middleware
});

const { data, pending, refresh } = await useFetch('/api/articles', {
  headers: {
    // In a real app, cookie is sent automatically, but for SSR we might need to ensure it
  }
});

const logout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' });
  useRouter().push('/admin/login');
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.admin-container {
  padding-top: 2rem;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.table-container {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.table th {
  background: var(--bg-tertiary);
  font-weight: 600;
  color: var(--text-secondary);
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.published {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.status-badge.draft {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}

.row-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  padding: 0.5rem;
  color: var(--text-secondary);
  border-radius: 4px;
}

.btn-icon:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}
</style>
