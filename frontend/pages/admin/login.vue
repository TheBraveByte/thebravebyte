<template>
  <div class="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg flex items-center justify-center px-6 relative overflow-hidden">
    
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-text/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-text-secondary/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      
      <!-- Logo/Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-2 h-2 bg-text-secondary animate-pulse"></div>
          <span class="font-mono text-xl font-bold  tracking-tight">
            ADMIN_ACCESS
          </span>
        </div>
        <p class="text-text-secondary font-mono text-sm">
          [ AUTHENTICATION_REQUIRED ]
        </p>
      </div>

      <!-- Login Form -->
      <div class="bg-bg-secondary/90 /90 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
        
        <!-- Progress Bar -->
        <div v-if="loading" class="mb-6 relative">
          <div class="h-1 bg-bg rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-text-secondary to-text transition-all duration-300 ease-out" :style="{ width: `${progress}%` }"></div>
          </div>
          <p class="mt-2 text-xs text-center text-text-secondary font-mono">
            {{ loadingMessage }}
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <!-- Email -->
          <div>
            <label class="block font-mono-label text-text-secondary mb-2">
              EMAIL
            </label>
            <input 
              v-model="credentials.email" 
              type="email" 
              required
              placeholder="admin@thebravebyte.com"
              class="w-full px-4 py-3 bg-bg border border-border  focus:border-text outline-none transition-colors rounded-lg"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block font-mono-label text-text-secondary mb-2">
              PASSWORD
            </label>
            <input 
              v-model="credentials.password" 
              type="password" 
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-bg border border-border  focus:border-text outline-none transition-colors rounded-lg"
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-3 bg-red-500/10 border border-red-500 text-red-500 text-sm font-mono rounded-lg">
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full px-6 py-3 bg-text text-bg font-mono text-sm hover:bg-text-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg relative overflow-hidden group"
          >
            <!-- Shimmer effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            
            <span v-if="loading" class="flex items-center gap-2 relative z-10">
              <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              AUTHENTICATING
            </span>
            <span v-else class="flex items-center gap-2 relative z-10">
              [ GRANT_ACCESS ]
              <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

        </form>

        <!-- Info -->
        <div class="mt-6 pt-6 border-t border-border">
          <p class="text-xs text-text-secondary font-mono text-center">
            SYSTEM_VERSION: 4.0.2 | SECURITY: ENABLED
          </p>
        </div>

      </div>

      <!-- Back to Site -->
      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-text-secondary hover:text-text font-mono text-sm">
          ← RETURN_TO_SITE
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
});

const credentials = ref({
  email: '',
  password: ''
});

const loading = ref(false);
const errorMessage = ref('');
const progress = ref(0);
const loadingMessage = ref('');

// Progressive loading messages
const loadingSteps = [
  { progress: 20, message: 'Verifying credentials...' },
  { progress: 40, message: 'Checking permissions...' },
  { progress: 60, message: 'Establishing secure session...' },
  { progress: 80, message: 'Loading dashboard...' },
  { progress: 100, message: 'Access granted!' }
];

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';
  progress.value = 0;

  try {
    // Simulate progressive loading
    for (let i = 0; i < loadingSteps.length; i++) {
      const step = loadingSteps[i];
      await new Promise(resolve => setTimeout(resolve, 300));
      progress.value = step.progress;
      loadingMessage.value = step.message;
    }

    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: credentials.value
    });

    if (error.value) {
      errorMessage.value = error.value?.data?.error || error.value?.data?.status || 'Invalid credentials';
      progress.value = 0;
      loadingMessage.value = '';
      loading.value = false;
      return;
    }

    // Set auth cookie
    const token = useCookie('auth_token');
    token.value = data.value.token;

    // Small delay to show success
    await new Promise(resolve => setTimeout(resolve, 500));

    // Redirect to dashboard using navigateTo for better Nuxt compatibility
    await navigateTo('/admin/dashboard');

  } catch (err) {
    errorMessage.value = 'Login failed. Please try again.';
    console.error('Login error:', err);
    progress.value = 0;
    loadingMessage.value = '';
  } finally {
    loading.value = false;
  }
};

// Check if already logged in
onMounted(async () => {
  const token = useCookie('auth_token');
  if (token.value) {
    try {
      const { data } = await useFetch('/api/auth/me');
      if (data.value) {
        await navigateTo('/admin/dashboard');
      }
    } catch (err) {
      // Continue to login page
    }
  }
});
</script>
