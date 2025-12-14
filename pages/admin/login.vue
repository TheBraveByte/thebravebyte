<template>
  <div class="login-container animate-fade-in">
    <div class="login-card">
      <h1 class="title">Admin Login</h1>
      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Enter admin password"
            required
            class="input"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        <p v-if="error" class="error-msg">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
const password = ref('');
const loading = ref(false);
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { password: password.value }
    });
    router.push('/admin/editor');
  } catch (e) {
    error.value = 'Invalid password';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  background: var(--bg-secondary);
  padding: 3rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.title {
  text-align: center;
  font-size: 1.75rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.input {
  width: 100%;
  padding: 0.75rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.btn-block {
  width: 100%;
  justify-content: center;
}

.error-msg {
  color: #ef4444;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
