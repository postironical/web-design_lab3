<template>
	<table class="table table-sm table-success" id="aboutmeTable">
		<thead>
			<tr>
				<th scope="col" class="col-2 col-sm-2">Field</th>
				<th scope="col">Information</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="userattr in userattrs" :key="userattr.id" scope="row">
				<td>{{ userattr.key }}</td>
				<td>{{ userattr.value }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
	import axios from "axios"
	export default {
		//name: 'app',
		//template: "<div>NAME {{ name }}</div>",
		data() {
			return {
				userattrs: [
	/*				{
						id: 1,
						key: "33",
						value: "povar"
					},*/
				],
			}
		},
		mounted() {
			var url = new URL(window.location.href);
			console.log(url)
			var username = url.searchParams.get("username")
			var password = url.searchParams.get("password")
			// var c = url.searchParams.get("c");
			// throw 0;
			axios
			.get("http://localhost:3070/api/userdata", {
				params: {
					username: username,
					password: password,
				}
			}).then(response => {
				// console.log(response.data)
				//this.results = response.data[1];
				//console.log(this.results);
				Object.entries(response.data).forEach((v, i, a) => {
					this.userattrs.push({
						id: i,
						key: v[0],
						value: v[1],
					});
				});
			})
			.catch(err => {
				throw err;
			});
		},
	}
</script>

<style>
	
</style>
