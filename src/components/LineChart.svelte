<script>
	import * as Pancake from '@sveltejs/pancake';
	import { 
		chartData
		} from '../stores/activity-store.js';

// ****************
// Debugging points
// ****************
	let points = [
			{	color: '#00FF00',
				points: [{ x: 0,  y: 5 },
						{ x: 1,  y: 15 },
						{ x: 2,  y: 51 }]
			},
		
			{	color: '#0000FF',
				points: [{ x: 0,  y: 3 },
						{ x: 1,  y: 3 },
						{ x: 2,  y: 0 },]
			},
		
			{	color: '#FF0000',
				points: [{ x: 0,  y: 4 },
						{ x: 1,  y: 10 },
						{ x: 2,  y: 21 },]
			}		
	];

	points = $chartData;

	console.table(points);
	points.forEach((el, i) => {
		console.log(el.color);
		var style = document.createElement('style');
		document.head.appendChild(style);
		style.sheet.insertRule('path.data' + i +
		'{stroke: ' + el.color + '; stroke-linejoin: round; stroke-linecap: round; stroke-width: 2px; fill: none; }');
	})
	// console.table(document.styleSheets);
</script>

<div class="chart">
	<Pancake.Chart x1={0} x2={2} y1={0} y2={120}>
		<Pancake.Box x2={2} y2={120}>
			<div class="axes"></div>
		</Pancake.Box>
		
		<Pancake.Grid vertical count={2} let:value>
			<span class="x label">{value}</span>
		</Pancake.Grid>

		<Pancake.Grid horizontal count={5} let:value let:first>
			<span class="y label">{value}</span>
		</Pancake.Grid>

		{#each points as colorPointSet, i}
			<Pancake.Svg>
				<Pancake.SvgLine data={colorPointSet.points} let:d>
					<path class={"data data"+i} {d}/>
				</Pancake.SvgLine>
			</Pancake.Svg>
		{/each}
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 100%;
		padding: 3em 2em 2em 3em;
		box-sizing: border-box;
	}
	.axes {
		width: 100%;
		height: 100%;
		border-left: 1px solid black;
		border-bottom: 1px solid black;
	}
	.y.label {
		position: absolute;
		left: -2.5em;
		width: 2em;
		text-align: right;
		bottom: -0.5em;
		font-family: sans-serif;
	}
	.x.label {
		position: absolute;
		width: 4em;
		left: -2em;
		bottom: -22px;
		font-family: sans-serif;
		text-align: center;
	}
</style>