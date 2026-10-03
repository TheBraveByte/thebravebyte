<template>
  <div class="border border-border bg-bg p-4 sm:p-6" aria-labelledby="sim-title">
    <!-- Header: what is being simulated, and the two policies -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <p id="sim-title" class="label">Payout simulation</p>
        <p class="mt-0.5 text-[15px] font-medium text-text">$120.00 to an M-Pesa wallet</p>
      </div>
      <div class="flex items-center gap-2">
        <div role="radiogroup" aria-label="Retry policy" class="flex rounded-full border border-border p-0.5 text-xs">
          <button
            v-for="m in modes"
            :key="m.id"
            type="button"
            role="radio"
            :aria-checked="mode === m.id"
            class="rounded-full px-3 py-1.5 font-medium transition-colors duration-150"
            :class="mode === m.id ? 'bg-text text-bg' : 'text-text-muted hover:text-text'"
            @click="choose(m.id)"
          >
            {{ m.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Timeline. Height is reserved so nothing below moves while it plays. -->
    <ol class="mt-4 min-h-[19.5rem] space-y-1.5 sm:min-h-[18.5rem]" aria-live="polite">
      <TransitionGroup name="step">
        <li
          v-for="s in visible"
          :key="s.key"
          class="grid grid-cols-[3.25rem_0.75rem_1fr] items-start gap-2 rounded-md px-2 py-2"
          :class="s.tone === 'bad' ? 'bg-[color-mix(in_srgb,var(--color-danger)_9%,transparent)]' : s.tone === 'good' ? 'bg-[color-mix(in_srgb,var(--color-good)_9%,transparent)]' : ''"
        >
          <span class="pt-0.5 font-mono text-[11px] tabular-nums text-text-muted">{{ s.at }}</span>
          <span class="mt-1.5 h-2 w-2 rounded-full" :class="dot[s.tone]" aria-hidden="true" />
          <span class="min-w-0">
            <span class="block text-sm font-medium text-text">{{ s.title }}</span>
            <span class="block text-[13px] leading-snug text-text-muted">{{ s.detail }}</span>
          </span>
        </li>
      </TransitionGroup>
    </ol>

    <!-- Ledger readout -->
    <div class="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3">
      <div>
        <p class="font-mono text-[11px] text-text-muted">sends</p>
        <p class="font-mono text-lg tabular-nums text-text">{{ sends }}</p>
      </div>
      <div>
        <p class="font-mono text-[11px] text-text-muted">paid out</p>
        <p class="font-mono text-lg tabular-nums" :class="paid > 120 ? 'text-danger' : 'text-text'">${{ paid.toFixed(2) }}</p>
      </div>
      <div class="flex flex-col items-end justify-end">
        <span
          class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors duration-200"
          :class="pill.cls"
        >
          {{ pill.label }}
        </span>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p class="max-w-[38ch] text-xs leading-relaxed text-text-muted">
        The payout path from a remittance system I built. Simulated; nothing is sent.
      </p>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-md bg-text px-3.5 py-1.5 font-mono text-xs text-bg transition-transform duration-100 active:translate-y-px disabled:opacity-60"
          :disabled="running"
          @click="run()"
        >
          <Icon :name="running ? 'lucide:loader' : 'lucide:play'" class="h-3.5 w-3.5" :class="running ? 'motion-safe:animate-spin' : ''" />
          {{ running ? 'Running' : 'Run again' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Tone = 'neutral' | 'warn' | 'bad' | 'good'
interface Step { key: string, at: string, title: string, detail: string, tone: Tone, send?: boolean, pay?: number, state?: State }
type State = 'idle' | 'held' | 'sent' | 'timeout' | 'unsure' | 'twice' | 'settled'

const modes = [
  { id: 'confirm', label: 'Confirm first' },
  { id: 'naive', label: 'Naive retry' },
] as const
type Mode = typeof modes[number]['id']

const common: Step[] = [
  { key: 'hold', at: '0.00s', title: 'Ledger hold placed', detail: '$120.00 held on the sender\'s balance before anything leaves.', tone: 'neutral', state: 'held' },
  { key: 'send', at: '0.04s', title: 'Payout sent to vendor', detail: 'Request po_7f3a goes out over the mobile-money rail.', tone: 'neutral', send: true, state: 'sent' },
  { key: 'timeout', at: '30.0s', title: 'Vendor timed out', detail: 'The answer was lost. The wallet was in fact paid.', tone: 'warn', pay: 120, state: 'timeout' },
]
const paths: Record<Mode, Step[]> = {
  naive: [
    { key: 'n-fail', at: '30.0s', title: 'Timeout read as failed', detail: 'Hold released, payout retried on the same rail.', tone: 'warn' },
    { key: 'n-send', at: '30.1s', title: 'Payout sent again', detail: 'Request po_9c21. Nothing checked whether po_7f3a landed.', tone: 'neutral', send: true },
    { key: 'n-twice', at: '31.4s', title: 'Recipient paid twice', detail: '$240.00 left the platform for a $120.00 transfer.', tone: 'bad', pay: 120, state: 'twice' },
  ],
  confirm: [
    { key: 'c-unsure', at: '30.0s', title: 'Marked unsure, not failed', detail: 'No resend and no reroute until the real state is known.', tone: 'warn', state: 'unsure' },
    { key: 'c-poll', at: '42.0s', title: 'Polled vendor for po_7f3a', detail: 'Vendor confirms: paid at 0.9s.', tone: 'neutral' },
    { key: 'c-settle', at: '42.1s', title: 'Hold settled, paid once', detail: '$120.00 out, ledger balanced, nothing to reconcile.', tone: 'good', state: 'settled' },
  ],
}

const dot: Record<Tone, string> = {
  neutral: 'bg-text-muted',
  warn: 'bg-warn',
  bad: 'bg-danger',
  good: 'bg-good',
}

const mode = ref<Mode>('confirm')
const visible = ref<Step[]>([])
const running = ref(false)
let timers: ReturnType<typeof setTimeout>[] = []

const sends = computed(() => visible.value.filter(s => s.send).length)
const paid = computed(() => visible.value.reduce((n, s) => n + (s.pay ?? 0), 0))
const state = computed<State>(() => [...visible.value].reverse().find(s => s.state)?.state ?? 'idle')

const pill = computed(() => {
  const map: Record<State, { label: string, cls: string }> = {
    idle: { label: 'ready', cls: 'border-border text-text-muted' },
    held: { label: 'held', cls: 'border-border text-text-secondary' },
    sent: { label: 'in flight', cls: 'border-border text-text-secondary' },
    timeout: { label: 'no answer', cls: 'border-warn/40 text-warn' },
    unsure: { label: 'unsure', cls: 'border-warn/40 text-warn' },
    twice: { label: 'paid twice', cls: 'border-danger/40 text-danger' },
    settled: { label: 'settled', cls: 'border-good/40 text-good' },
  }
  return map[state.value]
})

function clear() {
  timers.forEach(clearTimeout)
  timers = []
}

function run(m: Mode = mode.value) {
  clear()
  const steps = [...common, ...paths[m]]
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    visible.value = steps
    running.value = false
    return
  }
  visible.value = []
  running.value = true
  // Deliberate pacing: this is an explanation, so each step gets time to be read.
  steps.forEach((s, i) => {
    timers.push(setTimeout(() => {
      visible.value = [...visible.value, s]
      if (i === steps.length - 1) running.value = false
    }, 250 + i * 620))
  })
}

function choose(m: Mode) {
  mode.value = m
  run(m)
}

onMounted(() => run('confirm'))
onBeforeUnmount(clear)
</script>

<style scoped>
.step-enter-active {
  transition: opacity 240ms var(--ease-out), transform 240ms var(--ease-out);
}
.step-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.step-leave-active { display: none; }
@media (prefers-reduced-motion: reduce) {
  .step-enter-active { transition: opacity 120ms ease; }
  .step-enter-from { transform: none; }
}
</style>
