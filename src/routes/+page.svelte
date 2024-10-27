<script>
	import Footer from '$lib/components/footer.svelte';
</script>

<svelte:head>
	<title>{'{'}Hira|Kana{'}'}gana</title>
	<meta name="description" content="Teman latihan menghafal huruf hiragana dan katagana." />
	<link rel="icon" href="/hiragana.svg" sizes="any" type="image/svg+xml" />
</svelte:head>

<div class="flex min-h-screen w-full items-center justify-center bg-gray-800 text-white">
	<div class="flex flex-col px-12 md:w-[600px]">
		<h1 class="text-2xl font-bold text-primary-500 md:text-4xl">
			<span>{'{'}</span>
			<span class="text-white">Hira</span>
			<span>|</span>
			<span class="text-white">Kana</span>
			<span>{'}'}</span>
			<span>gana</span>
		</h1>
		<p class="mt-3 text-lg text-gray-400 opacity-75">
			Teman latihan menghafal huruf hiragana dan katagana.
		</p>

		<div class="mt-6 grid gap-4 md:grid-cols-2">
			<a
				href="/hiragana"
				class="flex items-center justify-between rounded-xl bg-gray-700 px-5 py-4 text-lg text-white hover:bg-primary-600"
			>
				<div class="flex flex-col">
					<span class="text-lg"> Hiragana-chan </span>
					<span class="text-sm"> ひらがなちゃん </span>
				</div>
				<span
					><svg
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
							d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
						/>
					</svg>
				</span>
			</a>
			<a
				href="/katakana"
				class="flex items-center justify-between rounded-xl bg-gray-700 px-5 py-4 text-lg text-white hover:bg-primary-600"
			>
				<div class="flex flex-col">
					<span class="text-lg"> Katakana-kun </span>
					<span class="text-sm"> カタカナクン </span>
				</div>
				<span
					><svg
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
							d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
						/>
					</svg>
				</span>
			</a>
		</div>

		<div class="mt-4 border-t border-gray-700 pt-4">
			<Footer />
		</div>
	</div>
</div>
