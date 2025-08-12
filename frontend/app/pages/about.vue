<script setup lang="ts">
import { useHead } from 'nuxt/app'
useHead({ title: 'About – HubSpot Insights' })
</script>

<template>
  <section class="container mx-auto space-y-8 px-4 py-8">
    <h1 id="about-page" class="text-3xl font-semibold tracking-tight">About this project</h1>

    <div class="prose dark:prose-invert max-w-none">
      <div class="flex flex-col gap-6 md:flex-row">
        <div class="md:basis-1/2 md:pr-6">
          <h2>Pre-setup</h2>
          <p>
            This frontend started from the Content Wind starter (<a
              href="https://github.com/atinux/content-wind"
              target="_blank"
              rel="noopener"
              >github.com/atinux/content-wind</a
            >), including TypeScript setup and linting. It began on Nuxt&nbsp;3 and was upgraded to Nuxt&nbsp;4 using <code>nuxi upgrade</code>. The starter originally included <code>@nuxt/content</code>, which was removed (along with the nuxi-content implementation). Dark mode was set as the default, and simple OMR colors were added, copying from OMR.com.
          </p>
          <h3 class="mt-4 text-base font-extrabold">General Instructions (Agent setup)</h3>
          <div class="mt-2 rounded-lg border border-gray-300 bg-gray-50 p-3 shadow-sm dark:border-gray-700 dark:bg-black/20 h-[400px] md:h-[575px] overflow-y-auto pr-2 text-[13px] leading-snug [&_:not(pre)>code]:text-[0.84em] [&_pre]:text-[11px] [&_h4]:font-semibold [&_ul]:space-y-1 [&_li]:my-0 [&_p]:my-1 [scrollbar-width:none] hover:[scrollbar-width:thin] [&::-webkit-scrollbar]:w-0 hover:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-(--color-dt-primary-subtle)">
            <div class="prose dark:prose-invert max-w-none">
              <h4>Monorepo &amp; Tooling</h4>
              <ul class="mb-4">
                <li>Single workspace with <strong>pnpm</strong>; packages: <code>backend</code>, <code>frontend</code>, and <code>packages/pandas-facade</code>.</li>
                <li>Root scripts orchestrate <code>dev</code>, <code>build</code>, <code>start</code>, <code>clean</code> across workspaces.</li>
                <li>Use <strong>Node 22+</strong> and latest packages. Prefer exact commands with <code>pnpm</code> and no pinned versions.</li>
                <li>Keep repo clean: <code>node_modules</code>, <code>dist</code>, <code>.nuxt</code>, <code>.output</code> removable via a single root script.</li>
              </ul>

              <h4>Data Contracts &amp; Typing</h4>
              <ul class="mb-4">
                <li>Define domain types (<code>DataEntry</code>, <code>Question</code>, <code>HubSpotData</code>, <code>FilterState</code>, <code>ChartData</code>) and <code>ApiResponse&lt;T&gt;</code> based on <strong>CHALLENGE.md</strong>.</li>
                <li>Public functions/composables are fully typed; avoid <code>any</code>. Use precise unions for optional outcomes.</li>
              </ul>

              <h4>Backend (TypeScript + Express)</h4>
              <ul class="mb-4">
                <li>Structure: <code>src/server.ts</code>, <code>data/data.json</code>.</li>
                <li>Endpoints:
                  <ul>
                    <li><code>GET /api/hubspot-data</code> → <code>{ success, data, timestamp }</code></li>
                    <li><code>GET /api/health</code> → <code>{ status, timestamp, service }</code></li>
                  </ul>
                </li>
                <li>Config: <code>PORT</code> env (default <code>3001</code>); <code>data.json</code> read per request or cached.</li>
              </ul>

              <h4>Frontend (Nuxt 4 + Vue 3)</h4>
              <ul class="mb-4">
                <li>Use <code>app/</code> structure with <code>&lt;script setup lang=&quot;ts&quot;&gt;</code>.</li>
                <li>Page titles via <code>useHead({ title })</code>.</li>
                <li>Aliases <code>~/*</code>, <code>@/*</code> to <code>app/*</code>. Include Nuxt types.</li>
                <li>Modules: <code>@nuxtjs/tailwindcss</code> with minimal config.</li>
              </ul>

              <h4>Fetching Strategy</h4>
              <ul class="mb-4">
                <li>Default: single fetch to backend, client-side filtering.</li>
                <li>Composable <code>useHubSpotData</code> wraps <code>useFetch&lt;ApiResponse&gt;(http://localhost:3001/api/hubspot-data)</code>.</li>
                <li>Expose <code>data</code>, <code>loading</code>, <code>error</code>, <code>timestamp</code>.</li>
                <li>Optional server-side filtering only if necessary; reactive key managed explicitly.</li>
              </ul>

              <h4>SSR &amp; Hydration</h4>
              <ul class="mb-4">
                <li>Ensure SSR/CSR initial state parity (preselect defaults during setup).</li>
                <li>Client-only code guarded with <code>import.meta.client</code>.</li>
              </ul>

              <h4>Vue Component Conventions</h4>
              <ul class="mb-4">
                <li>Typed <code>emits</code> with union overloads.</li>
                <li>Props via explicit interfaces; no <code>PropType&lt;any)</code>.</li>
                <li>Attribute order, self-closing, and line-break rules per lint config.</li>
              </ul>

              <h4>Reactivity &amp; Control Flow</h4>
              <ul class="mb-4">
                <li>Derive with <code>computed</code>; use <code>ref</code> for selections; emit cloned arrays.</li>
                <li>Avoid SSR-breaking watchers; debounce heavy operations when needed.</li>
              </ul>

              <h4>Error Handling &amp; UX</h4>
              <ul class="mb-4">
                <li>Distinct loading, error, empty, and content states.</li>
                <li>Normalize unknown errors to strings for display.</li>
              </ul>

              <h4>Linting/Formatting</h4>
              <ul class="mb-4">
                <li>Use Nuxt ESLint packages or flat config; strict TypeScript rules.</li>
                <li>Prettier-like formatting; semantic class ordering.</li>
              </ul>

              <h4>TSDoc &amp; Docs Generation</h4>
              <ul class="mb-4">
                <li>Add <strong>TSDoc</strong> to every public type and function in the façade.</li>
                <li>Generate <strong>TypeDoc</strong> (Markdown) into <code>packages/pandas-facade/docs/api</code>.</li>
                <li>Keep examples in TSDoc aligned with real usage; update docs on each change.</li>
              </ul>

              <h4>README for Future Developers</h4>
              <ul>
                <li>Maintain a root <code>README.md</code> that:
                  <ul>
                    <li>Summarizes repository structure and package roles.</li>
                    <li>Links to <code>CHALLENGE.md</code> for full requirements and to <code>README.md</code> for quick start.</li>
                    <li>Describes setup, dev, build, and test scripts.</li>
                    <li>Explains how to run backend, frontend, and façade in isolation.</li>
                    <li>Lists coding standards, lint rules, and documentation conventions.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="md:basis-1/2 md:pl-6">
          <h2>Initial file overview</h2>
          <pre class="not-prose w-full text-xs leading-snug border border-gray-300 rounded-lg p-3 bg-gray-50 dark:bg-black/20 dark:border-gray-700 shadow-sm overflow-auto font-mono">
 hubspot-dashboard/
 ├─ _Original_Task/
 │  ├─ CHALLENGE.md
 │  ├─ README.md
 │  └─ data.json
 ├─ .cursor/
 ├─ backend/
 │  └─ data/
 │     └─ data.json
 ├─ frontend/
 │  ├─ .cursor/
 │  ├─ .nuxt/
 │  ├─ .vscode/
 │  └─ app/
 │  │  ├─ assets/css/main.css
 │  │  ├─ components/
 │  │  │  ├─ AppNavbar.vue
 │  │  │  ├─ ButtonLink.vue
 │  │  │  └─ ColorModeSwitch.vue
 │  │  ├─ layouts/
 │  │  │  ├─ default.vue
 │  │  │  └─ full-width.vue
 │  │  └─ pages/
 │  │  │  ├─ index.vue
 │  │  │  └─ about.vue
 │  │  ├─ app.vue
 │  │  └─ app.config.ts
 │  ├─ node_modules/
 │  ├─ public/
 │  ├─ .gitignore
 │  ├─ .npmrc
 │  ├─ eslint.config.mjs
 │  ├─ nuxt.config.ts
 │  ├─ package.json
 │  ├─ pnpm-lock.yaml
 │  ├─ pnpm-workspace.yaml
 │  └─ README.md
 ├─ .gitignore
 ├─ package.json
 ├─ pnpm-lock.yaml
 ├─ pnpm-workspace.yaml
 └─ README.md</pre>
        </div>
      </div>
<br>
      <hr>
<br>     

<h1 class="mt-4 text-3xl font-semibold tracking-tight">Tasklist</h1>
<br>     

      <ul class="space-y-8 not-prose">
        <!-- Hour 1 -->
        <li class="flex items-start gap-4">
          <div class="flex-1">
            <h2 class="text-xl font-medium">Hour 1: Setup + Chart.js installation (30 min with AI)</h2>
            <ul class="mt-3 space-y-1">
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">01</div>
                <input type="checkbox"  checked aria-label="Monorepo scaffolding completed" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Monorepo setup completed</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">02</div>
                <input type="checkbox"  checked aria-label="Frontend scaffolded (Nuxt 4)" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Frontend setup (Nuxt 4)</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">03</div>
                <input type="checkbox"  checked aria-label="Tailwind CSS installed and enabled" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Tailwind CSS installed and enabled</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">04</div>
                <input type="checkbox" checked aria-label="Chart.js installed and client plugin registered" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Chart.js installed and client plugin registered</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">05</div>
                <input type="checkbox" checked aria-label="Nuxt 4 setup with TypeScript" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Nuxt 4 setup with TypeScript</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">06</div>
                <input type="checkbox"  aria-label="Install Chart.js and pandas-js" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Install Chart.js and pandas-js</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">08</div>
                <input type="checkbox" checked aria-label="Basic styling with Tailwind" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Basic styling with Tailwind</span>
              </li>
            </ul>
          </div>
        </li>

        <!-- Hour 2 -->
        <li class="flex items-start gap-4">
          <div class="flex-1">
            <h2 class="text-xl font-medium">Hour 2: Chart component + data aggregation (TypeScript issues)</h2>
            <ul class="mt-3 space-y-1">
              
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">10</div>
                <input type="checkbox"   aria-label="Composables planned" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Composables planned: <code>useHubSpotData</code>, <code>useDataProcessing</code></span>
              </li>
              <li class="flex items-start gap-2 text-sm">

                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">11</div>
                <input type="checkbox"   aria-label="Chart component lifecycle outlined" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Chart component lifecycle (destroy/create) outlined</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">12</div>
                <input type="checkbox" checked  aria-label="Load data.json from backend" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Load data.json from backend</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">13</div>
                <input type="checkbox"  aria-label="Data aggregation function" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Data aggregation function (sum numResponses by responseValue)</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">14</div>
                <input type="checkbox"  aria-label="Choose question to visualize" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Choose one question (Q1, Q2, or Q3) to visualize</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">15</div>
                <input type="checkbox"  aria-label="Wire up chart with real data" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Wire up chart with real data</span>
              </li>
            </ul>
          </div>
        </li>

        <!-- Hour 3 -->
        <li class="flex items-start gap-4">
          <div class="flex-1">
            <h2 class="text-xl font-medium">Hour 3: Multi-select filter implementation</h2>
            <ul class="mt-3 space-y-1">
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">16</div>
                <input type="checkbox"  aria-label="FilterState model and defaults defined" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span><code>FilterState</code> model and defaults defined</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">17</div>
                <input type="checkbox"  aria-label="Chip interactions specified" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Chip interactions and toggle behavior specified</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">18</div>
                <input type="checkbox"  aria-label="Pipeline planned" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Pipeline hook-up (filter → group → aggregate → sort) planned</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">19</div>
                <input type="checkbox"  aria-label="Add one multi-select filter" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Add one multi-select filter (company size)</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">20</div>
                <input type="checkbox"  aria-label="Connect multi-select to chart updates" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Connect multi-select state to chart data updates</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">21</div>
                <input type="checkbox"  aria-label="Debug reactivity issues" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Debug any reactivity issues</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">22</div>
                <input type="checkbox"  aria-label="Test multiple selections" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Test multiple selections working together</span>
              </li>
            </ul>
          </div>
        </li>

        <!-- Hour 4 -->
        <li class="flex items-start gap-4">
          <div class="flex-1">
            <h2 class="text-xl font-medium">Hour 4: Documentation &amp; Polish</h2>
            <ul class="mt-3 space-y-1">
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">23</div>
                <input type="checkbox"  aria-label="SSR/CSR parity checks and client guards listed" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>SSR/CSR parity checks and client guards listed, no hydration issues</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">24</div>
                <input type="checkbox"  aria-label="Strict linting and TypeScript rules enforced" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Strict linting and TypeScript rules enforced, no linting errors</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">25</div>
                <input type="checkbox"  aria-label="TSDoc/TypeDoc regeneration steps captured" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>TSDoc/TypeDoc regeneration steps captured</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">26</div>
                <input type="checkbox"  aria-label="Create comprehensive About page" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Create comprehensive About page</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">27</div>
                <input type="checkbox"  aria-label="Code cleanup and comments" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Code cleanup and comments correct</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">28</div>
                <input type="checkbox"  aria-label="Test final functionality" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Test final functionality</span>
              </li>
              <li class="flex items-start gap-2 text-sm">
                <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[8px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">29</div>
                <input type="checkbox"  aria-label="Document next steps" class="mt-0.5 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
                <span>Document what you'd do next</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      

      

      <br>
      <br>
      <hr>
      <br>

<h1 class="mt-4 text-3xl font-semibold tracking-tight">Documentation</h1>

       <!-- Step 01: Monorepo setup completed -->
       <div id="step-01" class="flex flex-col gap-3 md:flex-row md:items-start md:gap-4 py-4">
         <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[10px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">
           01
         </div>
         <div class="flex-1 space-y-2">
           <div class="flex items-start gap-3">
             <input type="checkbox"  checked aria-label="Repository scaffolding complete" class="mt-1 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
             <h4 class="m-0 text-sm font-semibold text-slate-900 dark:text-slate-200">Monorepo setup completed</h4>
           </div>
           <div class="prose">
            <p class="text-sm text-gray-600 dark:text-gray-300">Created a pnpm monorepo (<code>hubspot-dashboard/</code>) with workspaces for <code>backend</code>, <code>frontend</code>. Added root scripts to orchestrate dev/build/start/clean across workspaces using <code>pnpm -w</code>.</p>
          </div>
          <div class="rounded-xl border border-gray-200 bg-[#f6f8fa] dark:border-white/10 dark:bg-white/5">
            <div class="px-3 pt-1 pb-2 text-xs text-gray-600 dark:text-white/60">Terminal</div>
            <pre class="not-prose overflow-auto rounded-lg bg-white px-5 pb-5 pt-2 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-50"><code>pnpm init -y
printf "packages:\n  - backend\n  - frontend\n" > pnpm-workspace.yaml</code></pre>
          </div>
        </div>
      </div>
 
      <!-- Step 02: Frontend Setup -->
      <div id="step-02" class="flex flex-col gap-3 md:flex-row md:items-start md:gap-4 py-4">
        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[10px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">
          02
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex items-start gap-3">
            <input type="checkbox"  checked aria-label="Frontend setup complete" class="mt-1 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
            <h4 class="m-0 text-sm font-semibold text-slate-900 dark:text-slate-200">Frontend Setup (Nuxt 4)</h4>
          </div>
          <div class="prose">
            <p class="text-sm text-gray-600 dark:text-gray-300">Initialize a Nuxt 4 app in <code>frontend/</code>. The frontend setup is based on the <a href="https://github.com/atinux/content-wind" target="_blank" rel="noopener">Content Wind</a> starter (Nuxt&nbsp;3), which provided TypeScript setup and linting. The original <code>@nuxt/content</code> integration was removed, and the app was upgraded to Nuxt&nbsp;4 using <code>nuxi upgrade</code>.</p>
          </div>
          <div class="rounded-xl border border-gray-200 bg-[#f6f8fa] dark:border-white/10 dark:bg-white/5">
            <div class="px-3 pt-1 pb-2 text-xs text-gray-600 dark:text-white/60">Terminal</div>
            <pre class="not-prose overflow-auto rounded-lg bg-white px-5 pb-5 pt-2 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-50"><code>cd frontend
 pnpm dlx nuxi init .</code></pre>
          </div>
        </div>
      </div>
 
      <!-- Step 03: Tailwind CSS setup -->
      <div id="step-03" class="flex flex-col gap-3 md:flex-row md:items-start md:gap-4 py-4">
        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[10px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">
          03
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex items-start gap-3">
            <input type="checkbox"  checked aria-label="Tailwind CSS setup" class="mt-1 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
            <h4 class="m-0 text-sm font-semibold text-slate-900 dark:text-slate-200">Tailwind CSS setup (Vite plugin)</h4>
          </div>
          <div class="prose">
            <ul>
              <li>Install Tailwind and the Vite plugin in <code>frontend/</code>.</li>
              <li>Add <code>@tailwindcss/vite</code> to the Nuxt Vite plugins in <code>nuxt.config.ts</code>.</li>
              <li>Import Tailwind in <code>app/assets/css/main.css</code> with <code>@import "tailwindcss";</code>.</li>
              <li>Start the dev server and use Tailwind utility classes.</li>
            </ul>
          </div>
          <div class="rounded-xl border border-gray-200 bg-[#f6f8fa] dark:border-white/10 dark:bg-white/5">
            <div class="px-3 pt-1 pb-2 text-xs text-gray-600 dark:text-white/60">Terminal</div>
            <pre class="not-prose overflow-auto rounded-lg bg-white px-5 pb-5 pt-2 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-50"><code>pnpm add tailwindcss @tailwindcss/vite
pnpm dev</code></pre>
          </div>
          <div class="rounded-xl border border-gray-200 bg-[#f6f8fa] dark:border-white/10 dark:bg-white/5">
            <div class="px-3 pt-1 pb-2 text-xs text-gray-600 dark:text-white/60">nuxt.config.ts</div>
            <pre class="not-prose overflow-auto rounded-lg bg-white px-5 pb-5 pt-2 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-50"><code>import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  vite: { plugins: [tailwindcss()] },
})</code></pre>
          </div>
          <div class="rounded-xl border border-gray-200 bg-[#f6f8fa] dark:border-white/10 dark:bg-white/5">
            <div class="px-3 pt-1 pb-2 text-xs text-gray-600 dark:text-white/60">app/assets/css/main.css</div>
            <pre class="not-prose overflow-auto rounded-lg bg-white px-5 pb-5 pt-2 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-50"><code>@import "tailwindcss";</code></pre>
          </div>
        </div>
      </div>

      <!-- Step 04: Chart.js setup -->
      <div id="step-04" class="flex flex-col gap-3 md:flex-row md:items-start md:gap-4 py-4">
        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[10px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">
          04
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex items-start gap-3">
            <input type="checkbox" checked aria-label="Chart.js installed and component created" class="mt-1 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
            <h4 class="m-0 text-sm font-semibold text-slate-900 dark:text-slate-200">Chart.js installation and Vue wrapper</h4>
          </div>
          <div class="prose">
            <ul>
              <li>Installed <code>vue-chartjs</code> alongside existing <code>chart.js</code>.</li>
              <li>Registered core Chart.js elements in <code>frontend/plugins/chart.client.ts</code>.</li>
              <li>Added reusable <code>ChartComponent.vue</code> in <code>app/components/</code> with typed props and horizontal bar config.</li>
            </ul>
          </div>
          <div class="rounded-xl border border-gray-200 bg-[#f6f8fa] dark:border-white/10 dark:bg-white/5">
            <div class="px-3 pt-1 pb-2 text-xs text-gray-600 dark:text-white/60">Install</div>
            <pre class="not-prose overflow-auto rounded-lg bg-white px-5 pb-5 pt-2 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-50"><code>pnpm add vue-chartjs chart.js</code></pre>
          </div>
        </div>
      </div>

      <!-- Step 05: TypeScript setup -->
      <div id="step-05" class="flex flex-col gap-3 md:flex-row md:items-start md:gap-4 py-4">
        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[10px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">
          05
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex items-start gap-3">
            <input type="checkbox"  checked aria-label="TypeScript setup" class="mt-1 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
            <h4 class="m-0 text-sm font-semibold text-slate-900 dark:text-slate-200">TypeScript setup</h4>
          </div>
          <div class="prose">
            <p class="text-sm text-gray-600 dark:text-gray-300">Configured TypeScript across workspaces. Frontend extends Nuxt types; backend uses <code>tsx</code> for dev and <code>tsc</code> for builds. Libraries used:</p>
            <ul>
              <li><strong>Frontend</strong>: <code>typescript</code> (Nuxt provides types via <code>types: ["nuxt"]</code>).</li>
              <li><strong>Backend</strong>: <code>typescript</code>, <code>tsx</code>, <code>@types/node</code>, <code>@types/express</code>.</li>
            </ul>
          </div>
          <div class="rounded-xl border border-gray-200 bg-[#f6f8fa] dark:border-white/10 dark:bg-white/5">
            <div class="px-3 pt-1 pb-2 text-xs text-gray-600 dark:text-white/60">Terminal</div>
            <pre class="not-prose overflow-auto rounded-lg bg-white px-5 pb-5 pt-2 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-50"><code># frontend (already has typescript via Nuxt)
cd frontend
pnpm add -D typescript

# backend
cd ../backend
pnpm add -D typescript tsx @types/node @types/express</code></pre>
          </div>
          <div class="rounded-xl border border-gray-200 bg-[#f6f8fa] dark:border-white/10 dark:bg-white/5">
            <div class="px-3 pt-1 pb-2 text-xs text-gray-600 dark:text-white/60">frontend/tsconfig.json</div>
            <pre class="not-prose overflow-auto rounded-lg bg-white px-5 pb-5 pt-2 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-50"><code>{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": { "strict": true, "types": ["nuxt"] }
}</code></pre>
          </div>
          <div class="rounded-xl border border-gray-200 bg-[#f6f8fa] dark:border-white/10 dark:bg-white/5">
            <div class="px-3 pt-1 pb-2 text-xs text-gray-600 dark:text-white/60">backend/tsconfig.json</div>
            <pre class="not-prose overflow-auto rounded-lg bg-white px-5 pb-5 pt-2 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-50"><code>{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "types": ["node"],
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}</code></pre>
          </div>
        </div>
      </div>
 
 <!-- Step 08: Basic styling with Tailwind -->
 <div id="step-08" class="flex flex-col gap-3 md:flex-row md:items-start md:gap-4 py-4">
        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[10px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">
          08
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex items-start gap-3">
            <input type="checkbox" checked aria-label="Basic styling with Tailwind" class="mt-1 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
            <h4 class="m-0 text-sm font-semibold text-slate-900 dark:text-slate-200">Basic styling with Tailwind</h4>
          </div>
          <div class="prose">
            <p class="text-sm text-gray-600 dark:text-gray-300">Applied Tailwind utilities throughout the project with consistent dark mode variants and brand tokens. Focus on responsive layouts, typography, and component styling.</p>
            <ul>
              <li>Use <code>dark:</code> variants for all color classes</li>
              <li>Apply consistent spacing with <code>space-y-*</code> and <code>gap-*</code></li>
              <li>Leverage brand tokens like <code>accent-(--color-omr-violet-medium)</code></li>
            </ul>
          </div>
          <div class="rounded-xl border border-gray-200 bg-[#f6f8fa] dark:border-white/10 dark:bg-white/5">
            <div class="px-3 pt-1 pb-2 text-xs text-gray-600 dark:text-white/60">frontend/app/assets/css/main.css</div>
            <pre class="not-prose overflow-auto rounded-lg bg-white px-5 pb-5 pt-2 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-50"><code>/* Common utility patterns */
.heading-primary {
  @apply text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100;
}

.btn-primary {
  @apply rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600;
}

.card {
  @apply rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5;
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Backend Implementation -->
      <div id="backend-implementation" class="flex flex-col gap-3 md:flex-row md:items-start md:gap-4 py-4">
        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-700/50 font-mono text-[10px] leading-7 text-gray-950 dark:border-white/50 dark:text-white">
          12
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex items-start gap-3">
            <input type="checkbox" checked aria-label="Backend server implemented" class="mt-1 h-4 w-4 cursor-default rounded border-gray-300 accent-(--color-omr-violet-medium) dark:accent-(--color-dt-primary-subtle) :opacity-100 focus:ring-omr-violet-medium">
            <h4 class="m-0 text-sm font-semibold text-slate-900 dark:text-slate-200">Backend (TypeScript + Express)</h4>
          </div>
          <div class="prose">
            <ul>
              <li>Created <code>backend/src/server.ts</code> with Express + CORS, TypeScript config in <code>backend/tsconfig.json</code>.</li>
              <li>Endpoints:
                <ul>
                  <li><code>GET /api/health</code> → <code>{ status, timestamp, service }</code></li>
                  <li><code>GET /api/hubspot-data</code> → <code>{ success, data, timestamp }</code> (reads <code>backend/data/data.json</code>)</li>
                </ul>
              </li>
              <li>Configurable <code>PORT</code> (default <code>3001</code>); safe JSON read per request.</li>
            </ul>
          </div>
          <div class="rounded-xl border border-gray-200 bg-[#f6f8fa] dark:border-white/10 dark:bg-white/5">
            <div class="px-3 pt-1 pb-2 text-xs text-gray-600 dark:text-white/60">backend/package.json (scripts)</div>
            <pre class="not-prose overflow-auto rounded-lg bg-white px-5 pb-5 pt-2 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-50"><code>{
  "scripts": {
    "dev": "tsx src/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/server.js",
    "clean": "rm -rf dist"
  }
}</code></pre>
          </div>
        </div>
      </div>

      <br>
      <hr>
 <br>     

<h1 class="mt-4 text-3xl font-semibold tracking-tight">Issues and Pitfalls</h1>
<br>     

    </div>
  </section>
</template>

<style scoped></style>
