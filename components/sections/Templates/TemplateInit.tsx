import { CopyButton } from 'components/elements'

export default function TemplateInit({ path, template }: { path: string; template: string | null }) {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex w-full items-center justify-between rounded-xl bg-[#121212] text-xs text-head '>
				<pre
					style={{
						scrollbarColor: 'black transparent',
						scrollbarWidth: 'thin',
					}}
					className='overflow-x-scroll p-4'
				>{`shuttle init ${template ? `--template ${template}` : `--from ${path}`}`}</pre>
				<CopyButton
					code={`shuttle init ${template ? `--template ${template}` : `--from ${path}`}`}
					width={16}
					height={16}
				/>


			</div>
			<p className='text-xs text-right '>Shuttle CLI is required. <a target='_blank' href='https://docs.shuttle.dev/getting-started/installation' className='italic underline cursor-pointer'> Install</a> </p>
		</div>
	)
}
