<template>
	<div>
		<v-form ref="bpItemForm" @submit.prevent="submit">
			<v-card>
				<v-card-title>
					Add/Edit BP Item
				</v-card-title>
				<v-card-text>
					<v-text-field label="Systolic" v-model="systolic" required autofocus></v-text-field>
					<v-text-field label="Diastolic" v-model="diastolic" required ></v-text-field>
					<v-text-field label="Bpm" v-model="bpm" required></v-text-field>
	
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="cancel">Cancel</v-btn>
					<v-btn type="submit" :disabled="!valid">Add</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</div>
</template>

<script>
export default {
	name: 'AddEditBpItem',
	data: () => ({
		systolic: null,
		diastolic: null,
		bpm: null
	}),
	computed: {
		valid() {
			return this.systolic && this.diastolic && this.bpm;
		}
	},
	methods: {
		async submit() {
			const data = { 
				systolic: this.systolic,
				diastolic: this.diastolic,
				bpm: this.diastolic
			};
			await this.$store.dispatch('addBpItem', data);
		},
		cancel() {
			this.reset();
			this.$emit('close', null);
		},
		reset() {
			this.systolic = this.diastolic = this.bpm = null;
			this.$refs.bpItemForm.reset();
		}
	}
};
</script>

<style lang="scss" scoped></style>
