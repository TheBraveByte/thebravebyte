<template>
    <section id="about" class="py-24">
        <div class="container mx-auto px-6">
            <div class="mb-16">
                <h3 class="text-xl uppercase tracking-widest text-primary mb-2 font-semibold flex items-center gap-3">
                    <span class="w-2 h-2 bg-secondary rounded-full"></span>
                    <span class="relative inline-block">
                        About Me
                        <span class="absolute bottom-0 left-0 w-[80%] h-0.5 bg-secondary"></span>
                    </span>
                </h3>
                <p class="font-light text-gray-600 dark:text-gray-300">Learn more about me and my achievements.</p>
            </div>

            <div class="grid md:grid-cols-2 gap-16 items-start">
                <!-- Left side: Stats card with image -->
                <div class="space-y-8">
                    <div>
                        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            I turn complex technical challenges into competitive advantages. My focus is on building
                            systems that don't just work, they scale effortlessly, reduce operational costs, and drive
                            user satisfaction.
                        </p>

                        <!-- Resume Buttons -->
                        <div class="flex flex-wrap gap-4">
                            <a href="https://drive.google.com/file/d/1Umd7P74DQv3kbWvKV_PAXv7867LkPqHB/view?usp=drive_link"
                                target="_blank"
                                class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white dark:text-black rounded-lg hover:bg-primary/90 transition-all duration-300 group">
                                <Icon name="lucide:eye" class="w-4 h-4" />
                                <span class="font-medium">View Resume</span>
                            </a>
                            <a href="https://drive.google.com/uc?export=download&id=1Umd7P74DQv3kbWvKV_PAXv7867LkPqHB"
                                download
                                class="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white dark:hover:text-black transition-all duration-300 group">
                                <Icon name="lucide:download" class="w-4 h-4" />
                                <span class="font-medium">Download PDF</span>
                            </a>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="flex items-start gap-4">
                            <div
                                class="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                <Icon name="lucide:database" class="w-5 h-5 text-white dark:text-black" />
                            </div>
                            <div>
                                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Scalability Without
                                    Growing Pains
                                </h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Expert in designing and launching distributed systems capable of handling millions
                                    of requests daily. I ensure your infrastructure grows with your business, using
                                    clean architecture and event-driven patterns.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div
                                class="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                <Icon name="lucide:cloud" class="w-5 h-5 text-white dark:text-black" />
                            </div>
                            <div>
                                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Faster Time-to-Market
                                </h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    I implement robust CI/CD pipelines and containerization strategies that automate
                                    delivery. This means features get to your users faster, with fewer bugs and zero
                                    downtime.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div
                                class="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                <Icon name="lucide:users" class="w-5 h-5 text-white dark:text-black" />
                            </div>
                            <div>
                                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">High-Velocity
                                    Engineering Leadership
                                </h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    I bridge the gap between architectural vision and implementation. I elevate team
                                    performance by setting standards that eliminate technical debt and ensure long-term
                                    maintainability.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right side: Details -->
                <div class="space-y-8">
                    <div
                        class="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-lg p-8 shadow-sm">
                        <div class="flex items-center justify-between mb-8">
                            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <Icon name="lucide:server" class="w-6 h-6 text-white dark:text-black" />
                            </div>
                            <div class="text-right">
                                <h3 class="text-5xl font-light text-gray-900 dark:text-white">120%</h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">
                                    Database Performance Gain
                                </p>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            I specialize in deep-dive database query optimization, consistently delivering over double
                            the speed in data access across critical microservices.
                        </p>
                    </div>

                    <div
                        class="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-lg p-8 shadow-sm">
                        <div class="flex items-center justify-between mb-8">
                            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <Icon name="lucide:zap" class="w-6 h-6 text-white dark:text-black" />
                            </div>
                            <div class="text-right">
                                <h3 class="text-5xl font-light text-gray-900 dark:text-white">99.9%</h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">
                                    Sustained 99.9%
                                    Reliability</p>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            I engineer stability from the ground up, guaranteeing system reliability through advanced
                            error handling, real-time monitoring, and fail-safe automated recovery protocols.
                        </p>
                    </div>

                    <div class="relative group">
                        <div
                            class="absolute -inset-1 bg-linear-to-r from-secondary/20 to-primary/20 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>