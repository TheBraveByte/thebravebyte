<template>
  <header class="header">
    <div class="container header-content">
      <NuxtLink to="/" class="logo">
        <span class="logo-text">The Brave Byte</span>
        <span class="logo-dot">.</span>
      </NuxtLink>
      
      <nav class="nav">
        <NuxtLink to="/" class="nav-link">Blog</NuxtLink>
        <NuxtLink to="/portfolio" class="nav-link">Portfolio</NuxtLink>
        <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        <a href="https://github.com/iamyak" target="_blank" class="nav-link">GitHub</a>
      </nav>

      <div class="actions">
        <NuxtLink to="/admin/login" class="btn btn-ghost btn-sm">
          <Icon name="ph:user-circle" size="20" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: var(--header-height);
  border-bottom: 1px solid var(--border-color);
  background: rgba(10, 10, 12, 0.8);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  display: flex;
  align-items: baseline;
}

.logo-text {
  background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-dot {
  color: var(--accent-primary);
  font-size: 2rem;
  line-height: 0;
  margin-left: 2px;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.btn-sm {
  padding: 0.5rem;
}
</style>
