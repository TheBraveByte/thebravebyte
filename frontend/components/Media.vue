<template>
  <picture>
    <source type="image/avif" :srcset="srcset('avif')" :sizes="sizes" />
    <img
      :src="`/img/work/${name}-${widths[widths.length - 1]}.webp`"
      :srcset="srcset('webp')"
      :sizes="sizes"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
      class="block h-full w-full object-cover"
      :class="position"
    />
  </picture>
</template>

<script setup lang="ts">
// Files come from assets/originals via ImageMagick: public/img/work/<name>-<w>.{avif,webp}.
const props = withDefaults(defineProps<{
  name: string
  alt: string
  width: number
  height: number
  widths?: number[]
  sizes?: string
  eager?: boolean
  position?: string
}>(), {
  widths: () => [800, 1400],
  sizes: '(min-width: 1024px) 50vw, 100vw',
  eager: false,
  position: 'object-top',
})

const srcset = (ext: string) => props.widths.map(w => `/img/work/${props.name}-${w}.${ext} ${w}w`).join(', ')
</script>
