<template>
  <div class="min-h-screen bg-bg dark:bg-bg-dark flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <h1 class="font-mono text-2xl font-bold text-text dark:text-text mb-2 flex items-center justify-center gap-3">
          <span class="w-3 h-3 bg-accent dark:bg-accent-dark animate-pulse"></span>
          // SYSTEM_ACCESS
        </h1>
        <p class="font-mono text-xs text-text-secondary dark:text-text-secondary-dark">
          AUTHENTICATION_REQUIRED
        </p>
      </div>

      <div class="bg-bg dark:bg-bg-dark border border-border dark:border-border-dark p-8 relative overflow-hidden group">
        <!-- Technical Corners -->
        <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent dark:border-accent-dark"></div>
        <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent dark:border-accent-dark"></div>
        <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent dark:border-accent-dark"></div>
        <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent dark:border-accent-dark"></div>

        <form @submit.prevent="handleLogin" class="space-y-6 relative z-10">
          <div>
            <label class="block font-mono text-xs text-text-secondary dark:text-text-secondary-dark mb-2 uppercase">
              Identity_Key (Email)
            </label>
            <input 
              v-model="email"
              type="email" 
              required
              class="w-full bg-gray-50 dark:bg-white/5 border border-border dark:border-border-dark p-3 text-sm font-mono text-text dark:text-text focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors"
              placeholder="admin@system.local"
            />
          </div>

          <div>
            <label class="block font-mono text-xs text-text-secondary dark:text-text-secondary-dark mb-2 uppercase">
              Access_Code (Password)
            </label>
            <input 
              v-model="password"
              type="password" 
              required
              class="w-full bg-gray-50 dark:bg-white/5 border border-border dark:border-border-dark p-3 text-sm font-mono text-text dark:text-text focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono">
            Error: {{ error }}
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full py-3 bg-text dark:bg-white text-bg dark:text-black hover:bg-accent dark:hover:bg-accent-dark hover:text-white transition-all duration-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">AUTHENTICATING...</span>
            <span v-else>INITIATE_SESSION</span>
            <Icon v-if="!loading" name="lucide:arrow-right" class="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    });
    router.push('/admin/blogs');
  } catch (e: any) {
    error.value = e.data?.statusMessage || 'Authentication failed';
  } finally {
    loading.value = false;
  }
};
</script>
