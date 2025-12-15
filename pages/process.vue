<template>
  <div class="min-h-screen bg-bg dark:bg-bg-dark">
    
    <!-- Carousel Container -->
    <div class="pt-24 pb-16">
      <div class="container mx-auto px-6">
        
        <!-- Header -->
        <div class="max-w-4xl mx-auto mb-16 text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 dark:bg-accent-dark/10 border border-accent/20 dark:border-accent-dark/20 rounded-full mb-6">
            <span class="w-2 h-2 bg-accent dark:bg-accent-dark rounded-full animate-pulse"></span>
            <span class="text-xs font-mono uppercase tracking-wider text-accent dark:text-accent-dark">Engineering Process</span>
          </div>
          
          <h1 class="text-4xl md:text-5xl font-light text-text dark:text-text-dark mb-6">
            System <span class="text-accent dark:text-accent-dark">Architecture</span>
          </h1>
          
          <p class="text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed">
            Real production systems processing $1K+ weekly in payments
          </p>
        </div>

        <!-- Carousel Slide -->
        <div class="max-w-7xl mx-auto">
          <TransitionGroup name="slide">
            <div
              v-for="(section, index) in sections"
              v-show="currentIndex === index"
              :key="index"
              class="grid lg:grid-cols-2 gap-12 items-center"
            >
              
              <!-- Left: Explanation -->
              <div class="space-y-6">
                
                <!-- System Name & Badge -->
                <div>
                  <h2 class="text-3xl md:text-4xl font-light text-text dark:text-text-dark mb-4">
                    {{ section.title }}
                  </h2>
                  
                  <div v-if="section.badge" class="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 dark:bg-accent-dark/10 border border-accent/30 dark:border-accent-dark/30 rounded-lg mb-4">
                    <Icon name="lucide:trophy" class="w-5 h-5 text-accent dark:text-accent-dark" />
                    <span class="text-sm text-accent dark:text-accent-dark font-medium">{{ section.badge }}</span>
                  </div>
                </div>

                <!-- Description -->
                <p class="text-xl text-text-secondary dark:text-text-secondary-dark leading-relaxed">
                  {{ section.description }}
                </p>

                <!-- Key Features -->
                <div v-if="section.features" class="space-y-4">
                  <h3 class="text-lg font-medium text-text dark:text-text-dark flex items-center gap-2">
                    <Icon name="lucide:sparkles" class="w-5 h-5 text-accent dark:text-accent-dark" />
                    Key Features
                  </h3>
                  
                  <div v-for="(feature, idx) in section.features" :key="idx" class="space-y-3">
                    <h4 class="font-medium text-text dark:text-text-dark flex items-center gap-2">
                      <Icon :name="feature.icon || 'lucide:check-circle'" class="w-5 h-5 text-accent dark:text-accent-dark" />
                      {{ feature.title }}
                    </h4>
                    <ul class="space-y-2 ml-7">
                      <li v-for="(item, i) in feature.items" :key="i" class="flex items-start gap-2 text-text-secondary dark:text-text-secondary-dark">
                        <span class="w-1.5 h-1.5 bg-accent dark:bg-accent-dark rounded-full mt-2 flex-shrink-0"></span>
                        <span v-html="item" class="text-sm"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Right: Diagram -->
              <div class="bg-gradient-to-br from-bg-secondary to-bg dark:from-bg-secondary-dark dark:to-bg-dark border-2 border-border dark:border-border-dark rounded-2xl p-8 relative">
                
                <!-- Corner Accents -->
                <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent dark:border-accent-dark"></div>
                <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent dark:border-accent-dark"></div>
                <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent dark:border-accent-dark"></div>
                <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent dark:border-accent-dark"></div>

                <!-- Label -->
                <div class="mb-4 text-center">
                  <span class="text-xs font-mono uppercase tracking-wider text-text-secondary dark:text-text-secondary-dark">
                    📊 Architecture_Diagram
                  </span>
                </div>

                <!-- Diagram View -->
                <div :id="`mermaid-${index}`" class="diagram-container bg-bg dark:bg-bg-dark rounded-xl p-6 min-h-[600px] flex items-center justify-center overflow-auto">
                  <div class="mermaid w-full">
                    {{ section.diagram }}
                  </div>
                </div>
              </div>

            </div>
          </TransitionGroup>
        </div>

        <!-- Navigation Controls -->
        <div class="mt-16 max-w-7xl mx-auto">
          <div class="flex items-center justify-between gap-6">
            
            <!-- Previous Button -->
            <button
              @click="prevSlide"
              :disabled="currentIndex === 0"
              class="flex items-center gap-2 px-6 py-3 bg-bg-secondary dark:bg-bg-secondary-dark border border-border dark:border-border-dark rounded-lg text-text dark:text-text-dark hover:border-accent dark:hover:border-accent-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Icon name="lucide:chevron-left" class="w-5 h-5" />
              <span class="hidden sm:inline font-mono text-sm">PREV</span>
            </button>

            <!-- Dots Indicator -->
            <div class="flex items-center gap-2">
              <button
                v-for="(section, index) in sections"
                :key="index"
                @click="goToSlide(index)"
                :class="[
                  'transition-all rounded-full',
                  currentIndex === index
                    ? 'w-10 h-2.5 bg-accent dark:bg-accent-dark'
                    : 'w-2.5 h-2.5 bg-border dark:bg-border-dark hover:bg-accent/50 dark:hover:bg-accent-dark/50'
                ]"
                :title="section.title"
              ></button>
            </div>

            <!-- Next Button -->
            <button
              @click="nextSlide"
              :disabled="currentIndex === sections.length - 1"
              class="flex items-center gap-2 px-6 py-3 bg-bg-secondary dark:bg-bg-secondary-dark border border-border dark:border-border-dark rounded-lg text-text dark:text-text-dark hover:border-accent dark:hover:border-accent-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <span class="hidden sm:inline font-mono text-sm">NEXT</span>
              <Icon name="lucide:chevron-right" class="w-5 h-5" />
            </button>
          </div>

          <!-- System Name & Counter -->
          <div class="text-center mt-8">
            <p class="text-sm font-mono text-text-secondary dark:text-text-secondary-dark">
              {{ currentIndex + 1 }} / {{ sections.length }} • {{ sections[currentIndex]?.title }}
            </p>
            <div class="mt-4 flex items-center justify-center gap-2 text-xs text-text-secondary dark:text-text-secondary-dark">
              <kbd class="px-2 py-1 bg-bg-secondary dark:bg-bg-secondary-dark border border-border dark:border-border-dark rounded">←</kbd>
              <kbd class="px-2 py-1 bg-bg-secondary dark:bg-bg-secondary-dark border border-border dark:border-border-dark rounded">→</kbd>
              <span>Use arrow keys</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Back Button -->
    <NuxtLink
      to="/"
      class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-bg-secondary dark:bg-bg-secondary-dark border border-border dark:border-border-dark text-accent dark:text-accent-dark shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
      aria-label="Back to home"
    >
      <Icon name="lucide:arrow-left" class="w-5 h-5 md:w-6 md:h-6" />
    </NuxtLink>
  </div>
</template>

<script setup>
const currentIndex = ref(0);

const sections = [
  {
    title: 'Payment Orchestration',
    badge: 'Production Critical',
    description: 'A robust payment processing engine handling cryptocurrency subscriptions with zero data loss. Built to handle concurrent users, webhook chaos, and database failures.',
    features: [
      {
        title: 'Concurrency Control',
        icon: 'lucide:lock',
        items: [
          'Thread-safe session management using <code>sync.RWMutex</code>',
          'Isolated user states to prevent race conditions',
          'Atomic transaction handling'
        ]
      },
      {
        title: 'Webhook Reliability',
        icon: 'lucide:shield-check',
        items: [
          'Cryptographic signature verification',
          'Idempotency keys to prevent double-processing',
          'ACID compliant database transactions'
        ]
      }
    ],
    diagram: `sequenceDiagram
    participant User
    participant Bot
    participant PaymentGateway
    participant DB

    User->>Bot: /subscribe
    Bot->>PaymentGateway: Create Invoice
    PaymentGateway-->>Bot: Invoice URL
    Bot-->>User: Send Payment Link
    
    User->>PaymentGateway: Pay Crypto
    PaymentGateway->>Bot: Webhook (Paid)
    
    Note over Bot: Verify Signature
    
    Bot->>DB: Begin Transaction
    Bot->>DB: Mark Paid & Activate
    DB-->>Bot: Success
    Bot->>DB: Commit
    
    Bot-->>User: Subscription Active!`
  },
  {
    title: 'Distributed Job Processing',
    badge: 'High Scale',
    description: 'Asynchronous background processing system designed for reliability and scalability. Decouples heavy tasks from the main request path.',
    features: [
      {
        title: 'Message Queues',
        icon: 'lucide:network',
        items: [
          'Reliable task distribution',
          'Dead letter queues for failed jobs',
          'Priority processing support'
        ]
      },
      {
        title: 'Worker Pools',
        icon: 'lucide:cpu',
        items: [
          'Dynamic worker scaling',
          'Graceful shutdown handling',
          'Resource usage monitoring'
        ]
      }
    ],
    diagram: `flowchart LR
    API[API Server] -->|Push Job| Q[(Message Queue)]
    
    subgraph Workers
    W1[Worker 1]
    W2[Worker 2]
    W3[Worker 3]
    end
    
    Q -->|Pull| W1
    Q -->|Pull| W2
    Q -->|Pull| W3
    
    W1 -->|Result| DB[(Database)]
    W2 -->|Result| DB
    W3 -->|Result| DB`
  },
  {
    title: 'High-Performance Concurrency',
    badge: 'Optimized',
    description: 'Leveraging Go\'s concurrency primitives to build non-blocking, high-throughput systems that remain responsive under load.',
    features: [
      {
        title: 'Non-blocking I/O',
        icon: 'lucide:zap',
        items: [
          'Event-driven architecture',
          'Efficient resource utilization',
          'Low latency processing'
        ]
      },
      {
        title: 'Pattern Design',
        icon: 'lucide:layers',
        items: [
          'Fan-out / Fan-in patterns',
          'Context propagation for timeouts',
          'Pipeline processing'
        ]
      }
    ],
    diagram: `stateDiagram-v2
    [*] --> Idle
    Idle --> Processing: Request
    Processing --> Computing: CPU Task
    Processing --> Waiting: I/O Task
    
    state Computing {
        [*] --> Calculate
        Calculate --> [*]
    }
    
    state Waiting {
        [*] --> NetworkCall
        NetworkCall --> [*]
    }
    
    Computing --> Result
    Waiting --> Result
    Result --> Idle`
  }
];

const nextSlide = () => {
  if (currentIndex.value < sections.length - 1) {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

// Initialize Mermaid
onMounted(async () => {
  const { default: mermaid } = await import('mermaid');
  mermaid.initialize({
    startOnLoad: true,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'monospace'
  });
  await nextTick();
  mermaid.run();
});

// Re-run mermaid when slide changes
watch(currentIndex, async () => {
  await nextTick();
  const { default: mermaid } = await import('mermaid');
  mermaid.run();
});
</script>
