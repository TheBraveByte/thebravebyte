<template>
  <div class="pt-16 md:pt-20 pb-16">
    <div class="container">
      <!-- Header -->
      <header class="mb-10">
        <h1 class="text-2xl font-bold tracking-tight text-text mb-4">Yusuf Akinleye Abidemi</h1>
        <div class="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-muted">
          <span>Ilorin, Nigeria</span>
          <span class="text-border">|</span>
          <a href="mailto:ayaaakinleye@gmail.com" class="hover:text-text transition-colors">ayaaakinleye@gmail.com</a>
        </div>
      </header>

      <!-- Summary -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold text-text uppercase tracking-wider mb-4 pb-2 border-b border-border">Summary</h2>
        <p class="text-[14px] text-text-secondary font-serif leading-[1.75]">
          Backend and software engineer with five years building APIs and distributed systems in Go and
          Python — payments, real-time dispatch, geospatial tracking, and media infrastructure. At Rixl I
          co-lead a multi-service Go platform and keep a large, fast-moving codebase consistent through
          generated code, mocks, and machine-checked conventions. Increasingly, I'm interested in the
          reliability of AI-assisted software engineering — how AI-generated code and agent actions stay
          correct and reviewable as more of the work shifts to them.
        </p>
      </section>

      <!-- Engineering Experience -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold text-text uppercase tracking-wider mb-4 pb-2 border-b border-border">Engineering Experience</h2>
        <div class="space-y-8">
          <div>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 class="text-sm font-semibold text-text flex items-center gap-2">
                Backend Engineer / Co-Lead
                <span class="font-mono text-[9px] font-medium tracking-wider uppercase px-1.5 py-0.5 rounded border border-success/30 text-success bg-success/5">
                  Current
                </span>
              </h3>
              <span class="font-mono text-[11px] text-text-muted">May 2025 — Present</span>
            </div>
            <p class="text-xs text-text-muted mb-2">
              <a href="https://docs.rixl.com" target="_blank" rel="noopener noreferrer" class="hover:underline underline-offset-2">Rixl, New Castle, DE (Remote)</a>
            </p>
            <ul class="space-y-1.5">
              <li class="flex items-start gap-2 text-xs text-text-secondary font-serif leading-relaxed">
                <span class="text-text-muted mt-0.5">·</span>
                <span>Co-lead engineer on a multi-service Go platform (PostgreSQL, ClickHouse, gRPC); ~3,400 commits over a year across the ecosystem.</span>
              </li>
              <li class="flex items-start gap-2 text-xs text-text-secondary font-serif leading-relaxed">
                <span class="text-text-muted mt-0.5">·</span>
                <span>Authored an 8-language client SDK fleet generated from a single OpenAPI spec (Kiota), and a custom code generator that derives permission constants from SQL migrations.</span>
              </li>
              <li class="flex items-start gap-2 text-xs text-text-secondary font-serif leading-relaxed">
                <span class="text-text-muted mt-0.5">·</span>
                <span>Maintained machine-checked engineering conventions (golangci-lint, lefthook, table-driven tests with the race detector) and generated database code and mocks (sqlc, mockery), keeping a large codebase consistent and reviewable.</span>
              </li>
              <li class="flex items-start gap-2 text-xs text-text-secondary font-serif leading-relaxed">
                <span class="text-text-muted mt-0.5">·</span>
                <span>Redesigned authorization from roles to a policy/capability model, written as a design document before implementation.</span>
              </li>
            </ul>
          </div>

          <div>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 class="text-sm font-semibold text-text">Backend Engineer (Contract)</h3>
              <span class="font-mono text-[11px] text-text-muted">Jan 2025 — Apr 2025</span>
            </div>
            <p class="text-xs text-text-muted mb-2">Paymax (Remote)</p>
            <ul class="space-y-1.5">
              <li class="flex items-start gap-2 text-xs text-text-secondary font-serif leading-relaxed">
                <span class="text-text-muted mt-0.5">·</span>
                <span>Implemented real-time dispatch via WebSockets and Redis pub/sub; engineered a Go modular monolith replacing a fragile microservice topology to improve reliability.</span>
              </li>
            </ul>
          </div>

          <div>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 class="text-sm font-semibold text-text">Founding Software Engineer</h3>
              <span class="font-mono text-[11px] text-text-muted">Apr 2022 — Sep 2024</span>
            </div>
            <p class="text-xs text-text-muted mb-2">
              <a href="https://1goride.com/" target="_blank" rel="noopener noreferrer" class="hover:underline underline-offset-2">1go Technologies (Remote)</a>
            </p>
            <ul class="space-y-1.5">
              <li class="flex items-start gap-2 text-xs text-text-secondary font-serif leading-relaxed">
                <span class="text-text-muted mt-0.5">·</span>
                <span>Built geospatial tracking systems scaling to 2,100+ concurrent users; engineered multi-gateway payment reconciliation across providers with differing settlement timelines.</span>
              </li>
            </ul>
          </div>

          <div>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 class="text-sm font-semibold text-text">Senior Software Engineer (Contract)</h3>
              <span class="font-mono text-[11px] text-text-muted">Aug 2023 — Jun 2024</span>
            </div>
            <p class="text-xs text-text-muted mb-2">NHIA (Remote)</p>
            <ul class="space-y-1.5">
              <li class="flex items-start gap-2 text-xs text-text-secondary font-serif leading-relaxed">
                <span class="text-text-muted mt-0.5">·</span>
                <span>Built a complaint-handling API serving 1,000+ daily requests; introduced structured-logging middleware that cut root-cause analysis time from hours to minutes.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Applied Machine Learning -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold text-text uppercase tracking-wider mb-4 pb-2 border-b border-border">Applied Machine Learning</h2>
        <div class="space-y-8">
          <div>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 class="text-sm font-semibold text-text">Applied Machine Learning Researcher (Part-time)</h3>
              <span class="font-mono text-[11px] text-text-muted">Sep 2023 — Dec 2024</span>
            </div>
            <p class="text-xs text-text-muted mb-2">SQE.io, Boston, MA (Remote)</p>
            <ul class="space-y-1.5">
              <li class="flex items-start gap-2 text-xs text-text-secondary font-serif leading-relaxed">
                <span class="text-text-muted mt-0.5">·</span>
                <span>Built a PyTorch document-classification model reaching 75% accuracy, and a separate neural network for noisy sensor data yielding a 20% gain over manual thresholding.</span>
              </li>
              <li class="flex items-start gap-2 text-xs text-text-secondary font-serif leading-relaxed">
                <span class="text-text-muted mt-0.5">·</span>
                <span>Designed reproducible training and evaluation pipelines suitable for research-grade reporting and replication.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Additional Experience -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold text-text uppercase tracking-wider mb-4 pb-2 border-b border-border">Additional Engineering Experience</h2>
        <div class="space-y-6">
          <div>
            <div class="flex justify-between items-baseline mb-1">
              <h3 class="text-xs font-semibold text-text">
                <a href="https://earthly.dev/blog/mail-server-api-goroutines-gmail/" target="_blank" rel="noopener noreferrer" class="hover:underline underline-offset-2">Technical Writer, Earthly Technologies</a>
              </h3>
              <span class="font-mono text-[10px] text-text-muted">2023 — 2024</span>
            </div>
            <p class="text-xs text-text-secondary font-serif leading-relaxed">Published Go concurrency tutorials covering goroutines, channels, and concurrent mail server design.</p>
          </div>

          <div>
            <div class="flex justify-between items-baseline mb-1">
              <h3 class="text-xs font-semibold text-text">
                <a href="https://volomn.com/" target="_blank" rel="noopener noreferrer" class="hover:underline underline-offset-2">Backend Engineer (Contract), Volomn</a>
              </h3>
              <span class="font-mono text-[10px] text-text-muted">2024</span>
            </div>
            <p class="text-xs text-text-secondary font-serif leading-relaxed">Go APIs for loyalty transactions, resulting in a 40% latency reduction. Maintained 75% test coverage.</p>
          </div>

          <div>
            <div class="flex justify-between items-baseline mb-1">
              <h3 class="text-xs font-semibold text-text">Python Freelancer, Fiverr</h3>
              <span class="font-mono text-[10px] text-text-muted">2019 — 2021</span>
            </div>
            <p class="text-xs text-text-secondary font-serif leading-relaxed">Built desktop automation tools and GUI applications for international clients.</p>
          </div>
        </div>
      </section>

      <!-- Education -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold text-text uppercase tracking-wider mb-4 pb-2 border-b border-border">Education</h2>
        <div class="space-y-6">
          <div>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 class="text-sm font-semibold text-text">B.Eng. Electrical and Electronics Engineering</h3>
              <span class="font-mono text-[11px] text-text-muted">Nov 2018 — Aug 2024</span>
            </div>
            <p class="text-xs text-text-muted mb-2">University of Ilorin, Ilorin, Nigeria · CGPA: 4.37 / 5.00 (Second Class Upper)</p>
            <ul class="space-y-1.5">
              <li class="flex items-start gap-2 text-xs text-text-secondary font-serif leading-relaxed">
                <span class="text-text-muted mt-0.5">·</span>
                <span><strong>Thesis:</strong> <em>Design and Implementation of a Logistic Regression-Based Fire Detection System</em> — a supervised classifier with reproducible training and evaluation, deployed on 8-bit resource-constrained hardware.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Honors & Awards -->
      <section class="mb-12">
        <h2 class="text-xs font-semibold text-text uppercase tracking-wider mb-4 pb-2 border-b border-border">Honors & Awards</h2>
        <ul class="space-y-3">
          <li class="flex items-start gap-2.5 text-xs text-text-secondary font-serif leading-relaxed">
            <span class="text-text-muted shrink-0 mt-1">·</span>
            <span><strong>Winner | Ilorin Innovation Challenge (2023):</strong> Secured a $5,000 pre-seed grant for Eazyfit (an applied computer-vision body-measurement system).</span>
          </li>
        </ul>
      </section>

      <!-- Links -->
      <section>
        <h2 class="text-xs font-semibold text-text uppercase tracking-wider mb-4 pb-2 border-b border-border">Links</h2>
        <div class="flex flex-wrap gap-x-6 gap-y-2 text-xs">
          <a href="https://github.com/TheBraveByte" target="_blank" rel="noopener noreferrer" class="text-text-secondary hover:text-text transition-colors">
            github.com/TheBraveByte
          </a>
          <a href="https://linkedin.com/in/yusuf-akinleye-bb35981b4" target="_blank" rel="noopener noreferrer" class="text-text-secondary hover:text-text transition-colors">
            linkedin.com/in/yusuf-akinleye
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'CV | Yusuf Akinleye',
  description: 'Curriculum Vitae — Yusuf Akinleye, software engineer from Ilorin, Nigeria.',
});
</script>
