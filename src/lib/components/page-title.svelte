<script lang="ts">
	const {
		title,
		description
	}: {
		title: string;
		description: string;
	} = $props();
</script>

<div class="mb-6">
	<h1 class="text-4xl font-bold text-primary-500">{title}</h1>
	<p class="text-lg text-gray-400 opacity-75">
		{description}
	</p>
</div>
