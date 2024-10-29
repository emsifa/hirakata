<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		links
	}: {
		links: { label: string; href: string; locked?: boolean; active?: boolean }[];
	} = $props();
</script>

<div class="mb-4 flex w-full justify-stretch gap-4 md:grid md:grid-cols-3">
	{#each links as { label, href, locked, active }, i}
		<a
			href={locked ? '#' : href}
			class={cn(
				'inline-flex w-full items-center justify-center space-x-2 rounded-xl bg-gray-600 px-3 py-2 text-center text-gray-300 md:w-auto',
				{
					'opacity-20': locked,
					'bg-gray-700 text-gray-200': !locked,
					'bg-primary-500 text-white': active && !locked
				}
			)}
			class:cursor-not-allowed={locked}
		>
			{#if locked}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
					/>
				</svg>
			{/if}
			<span class="font-semibold">{label}</span>
		</a>
	{/each}
</div>
