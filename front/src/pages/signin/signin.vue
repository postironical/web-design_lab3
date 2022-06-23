<template>
	<div id="signin" class="form-signin bg-dark p-3 rounded-3 calculator-signin-text">
		<form>
		
		<h1 class="h3 mb-3 fw-normal">
			Please sign in
		</h1>

		<div class="form-floating">
			<input v-bind:value="email" v-on:change="email_input" type="email" class="form-control" id="email_input" placeholder="name@example.com">
			<label for="email_input" class="text-dark">
				Username
			</label>
		</div>

		<div class="form-floating">
			<input v-bind:value="password" v-on:change="password_input" type="password" class="form-control" id="password_input" placeholder="Password">
			<label for="password_input" class="text-dark">
				Password
			</label>
		</div>

		<div class="checkbox m-2 mb-2">
			<input v-bind:value="remember_me" v-model="remember_me" type="checkbox" value="remember-me" style="transform : scale(1.5);" id="remember_me_input">
			<label class="text-center align-middle">
				&nbsp;Remember me
			</label>
		</div>
			
		</form>
		<button class="w-100 btn btn-lg btn-warning" id="signin_button" @click="signin">
			Sign in
		</button>
		<a href="/register.html"><button type="button" class="btn btn-outline-light calculator-navbar-text w-100 mt-2" @click="register">
			Create an account
		</button></a>
	</div>

</template>

<script>
	import axios from "axios"
	export default {
		name: 'signin',
		
		data() {
			return {
				email: "",
				password: "",
				remember_me: false,
			}
		},
		methods: {
			email_input(event) {
				this.email = event.target.value;
			},
			password_input(event) {
				this.password = event.target.value;
			},
			remember_me_input(event) {
				this.remember_me = event.target.value;
			},
			signin() {
				axios
				.get("http://localhost:3070/api/userdata", {
					params: {
						username: this.email,
						password: this.password,
					}
				}).then(response => {
					window.location.href = "/aboutme.html?username=" + this.email + "&" + "password=" + this.password;
				})
				.catch(err => {
					throw err;
				});
			},
			register() {

			},
		},
		mounted() {
			
		},
	}
</script>

<style>
	
</style>
