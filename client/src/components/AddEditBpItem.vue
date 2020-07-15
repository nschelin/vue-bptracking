<template>
	<div>
		<v-form ref="bpItemForm" v-model="valid" @submit.prevent="submit">
			<v-card>
				<v-card-title>
					Add/Edit BP Item
				</v-card-title>
				<v-card-text> </v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="cancel">Cancel</v-btn>
					<v-btn type="submit" :disabled="!valid">Login</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</div>
</template>

<script>
export default {
	name: 'AddEditBpItem',
	methods: {
		cancel() {
			this.$emit('close', null);
		}
	}
};
</script>

<style lang="scss" scoped></style>
