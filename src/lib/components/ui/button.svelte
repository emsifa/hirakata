<script lang="ts">
	const { className } = $$props;
</script>

<button
	{...$$restProps}
	class={`w-full rounded-xl bg-primary-500 px-4 py-3 text-lg font-semibold text-white ${className}`}
>
	<slot />
</button>
