import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

interface PlayerStatsProps {
	stats: {
		matches: number
		runs: number
		average: number
		strikeRate: number
		hundreds: number
		fifties: number
		highestScore: number
		wickets: number
		economyRate: number
	}
}

export default function PlayerStats({ stats }: PlayerStatsProps) {
	return (
		<div>
			<Table className="w-full max-w-md mx-auto mb-4">
				<TableHeader>
					<TableRow className="border-b border-blue-400">
						<TableHead className="text-center text-blue-200">Matches</TableHead>
						<TableHead className="text-center text-blue-200">Runs</TableHead>
						<TableHead className="text-center text-blue-200">Average</TableHead>
						<TableHead className="text-center text-blue-200">
							Strike Rate
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow className="border-b border-blue-400">
						<TableCell className="text-center text-yellow-300">
							{stats.matches}
						</TableCell>
						<TableCell className="text-center text-yellow-300">
							{stats.runs}
						</TableCell>
						<TableCell className="text-center text-yellow-300">
							{stats.average}
						</TableCell>
						<TableCell className="text-center text-yellow-300">
							{stats.strikeRate}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<Table className="w-full max-w-md mx-auto mb-4">
				<TableHeader>
					<TableRow className="border-b border-blue-400">
						<TableHead className="text-center text-blue-200">100s</TableHead>
						<TableHead className="text-center text-blue-200">50s</TableHead>
						<TableHead className="text-center text-blue-200">
							Highest Score
						</TableHead>
						<TableHead className="text-center text-blue-200">Wickets</TableHead>
						<TableHead className="text-center text-blue-200">Economy</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow className="border-b border-blue-400">
						<TableCell className="text-center text-yellow-300">
							{stats.hundreds}
						</TableCell>
						<TableCell className="text-center text-yellow-300">
							{stats.fifties}
						</TableCell>
						<TableCell className="text-center text-yellow-300">
							{stats.highestScore}
						</TableCell>
						<TableCell className="text-center text-yellow-300">
							{stats.wickets}
						</TableCell>
						<TableCell className="text-center text-yellow-300">
							{stats.economyRate}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}
