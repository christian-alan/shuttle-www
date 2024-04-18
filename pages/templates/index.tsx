import { ReactNode, useState } from 'react'
import { Page } from 'components/templates'
import toml from '@iarna/toml'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import TemplateCard from 'components/sections/Templates/TemplateCard'
import FilterDesktop from 'components/sections/Templates/FilterDesktop'
import FilterMobile from 'components/sections/Templates/FilterMobile'

export const TEMPLATES_URL = 'https://raw.githubusercontent.com/shuttle-hq/shuttle-examples/main/templates.toml'

export enum TemplateType {
	Starter = 'starter',
	Template = 'template',
	Example = 'example',
	CommunityTemplate = 'community_template',
}

export interface Starter {
	title: string
	description: string
	path: string
	use_cases: string[]
	tags: string[]
	template: string
	type: TemplateType.Starter
}

export interface Template {
	title: string
	description: string
	path: string
	use_cases: string[]
	tags: string[]
	type: TemplateType.Template
}

export interface Example {
	title: string
	description: string
	path: string
	use_cases: string[]
	tags: string[]
	type: TemplateType.Example
}

export interface CommunityTemplate {
	title: string
	description: string
	use_cases: string[]
	tags: string[]
	author: string
	repo: string
	type: TemplateType.CommunityTemplate
}

export type StarterWithKey = Starter & { key: string }
export type TemplateWithKey = Template & { key: string }
// export type CommunityTemplateWithKey = CommunityTemplate & { key: string }
export type ExampleWithKey = Example & { key: string }
export type TemplateWithKeyAndType = StarterWithKey | TemplateWithKey | ExampleWithKey

export interface TemplatesResponse {
	version: number
	starters: Record<string, Starter>
	templates: Record<string, Template>
	examples: Record<string, Example>
	// community_templates: Record<string, CommunityTemplate>
}

export const getStaticProps = (async () => {
	const response = await fetch(TEMPLATES_URL)
	const tomlString = await response.text()

	const { starters, templates, examples } = toml.parse(tomlString) as unknown as TemplatesResponse

	const starterArr = Object.keys(starters).map<StarterWithKey>((key) => {
		return {
			...starters[key],
			key,
			type: TemplateType.Starter,
		}
	})

	const templateArr = Object.keys(templates).map<TemplateWithKey>((key) => {
		return {
			...templates[key],
			key,
			type: TemplateType.Template,
		}
	})

	const exampleArr = Object.keys(examples).map<ExampleWithKey>((key) => {
		return {
			...examples[key],
			key,
			type: TemplateType.Example,
		}
	})

	const tags = Array.from(
		new Set([...starterArr, ...templateArr, ...exampleArr].map((template) => template.tags).flat())
	)
	const useCases = Array.from(
		new Set([...starterArr, ...templateArr, ...exampleArr].map((template) => template.use_cases).flat())
	)

	return {
		props: {
			templates: [...starterArr, ...templateArr, ...exampleArr],
			tags,
			useCases,
		},
	}
}) satisfies GetStaticProps<{
	templates: TemplateWithKeyAndType[]
	tags: string[]
	useCases: string[]
}>

export default function Templates({ tags, useCases, templates }: InferGetStaticPropsType<typeof getStaticProps>) {
	const [search, setSearch] = useState('')
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [selectedUseCases, setSelectedUseCases] = useState<string[]>([])

	const filteredTemplates = templates.filter((template) => {
		const searchMatch = template.title.toLowerCase().includes(search.toLowerCase())
		const tagMatch =
			selectedTags.length === 0 ||
			selectedTags.reduce((acc, curr) => acc || template.tags.includes(curr), false)
		const useCaseMatch =
			selectedUseCases.length === 0 ||
			selectedUseCases.reduce((acc, curr) => acc || template.use_cases.includes(curr), false)

		return searchMatch && tagMatch && useCaseMatch
	})

	return (
		<section className='mx-auto my-[140px] w-full max-w-screen-2xl'>
			<div className='mx-auto my-0 w-full text-center'>
				<h1>
					<span className='text-gradient bg-clip-text text-[64px] text-transparent'>Templates</span>
				</h1>
				<p className='text-2xl'>Optional description of something.</p>
			</div>

			<section className='mt-32 grid grid-cols-1 justify-between gap-[30px] px-0 md:grid-cols-4 md:px-[128px]'>
				<FilterDesktop
					search={search}
					setSearch={setSearch}
					setSelectedTags={setSelectedTags}
					setSelectedUseCases={setSelectedUseCases}
					tags={tags}
					useCases={useCases}
					selectedUseCases={selectedUseCases}
					selectedTags={selectedTags}
				/>

				<FilterMobile
					search={search}
					setSearch={setSearch}
					setSelectedTags={setSelectedTags}
					setSelectedUseCases={setSelectedUseCases}
					tags={tags}
					useCases={useCases}
					selectedUseCases={selectedUseCases}
					selectedTags={selectedTags}
				/>

				<div className='col-span-3 grid grid-cols-1 items-center gap-6 px-[28px] md:grid-cols-2 md:px-0 lg:grid-cols-3'>
					{filteredTemplates.map((template) => (
						<TemplateCard key={template.key} template={template} />
					))}
				</div>
			</section>
		</section>
	)
}

Templates.getLayout = (children: ReactNode) => <Page>{children}</Page>
