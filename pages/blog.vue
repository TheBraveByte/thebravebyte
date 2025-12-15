<template>
  <div class="container">
    <section class="hero animate-fade-in">
      <h1 class="hero-title">
        Engineering the <br />
        <span class="text-accent-gradient">Future with Code</span>
      </h1>
      <p class="hero-subtitle">
        Deep dives into Backend Engineering, Distributed Systems, and AI.
      </p>
    </section>

    <section class="articles-grid animate-fade-in delay-200">
      <div v-if="pending" class="loading">Loading articles...</div>
      <div v-else-if="error" class="error">Failed to load articles</div>
      
      <div v-else class="grid">
        <article v-for="article in data?.articles" :key="article._id" class="article-card">
          <NuxtLink :to="`/article/${article.slug}`" class="card-link">
            <div class="card-content">
              <div class="card-meta">
                <span class="date">{{ formatDate(article.createdAt) }}</span>
                <span class="tag">Engineering</span>
              </div>
              <h2 class="card-title">{{ article.title }}</h2>
              <p class="card-excerpt">{{ article.excerpt }}</p>
              <div class="card-footer">
                <span class="read-more">Read Article <Icon name="ph:arrow-right" /></span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
const { data, pending, error } = await useFetch('/api/articles');

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>

<style scoped>
.hero {
  padding: 4rem 0 6rem;
  text-align: center;
}

.hero-title {
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.article-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.article-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-primary);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.card-link {
  display: block;
  height: 100%;
  padding: 2rem;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.tag {
  color: var(--accent-secondary);
  font-weight: 500;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.card-excerpt {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 2rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
}

.read-more {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-primary);
  font-weight: 500;
  transition: gap 0.3s ease;
}

.article-card:hover .read-more {
  gap: 0.75rem;
}

.loading, .error {
  text-align: center;
  padding: 4rem;
  color: var(--text-secondary);
}
</style>
