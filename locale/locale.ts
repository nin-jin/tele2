namespace $ {

	export function $my_tele2_locale(
		this: $mol_ambient_context,
		all: Record< string, string >,
	) {
		return all[ this.$mol_locale.lang() ] ?? all['ru']
	}

}