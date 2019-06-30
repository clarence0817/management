
<template>
	<div>
		<el-card>
			<div class="mybaidumap" id="allmap" style="height:800px"></div>
			</el-card>
	</div>
</template>


<script>
	import BMap from "BMap"
	export default {
		mounted(){		
			  //百度地图api功能
			  var map = new BMap.Map("allmap")
			  map.centerAndZoom(new BMap.Point(116.404,39.915),11)
		}
	}
</script>


<style>
</style>
