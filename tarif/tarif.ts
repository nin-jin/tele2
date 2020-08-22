namespace $ {
	
	export let $my_tele2_tarif_locale = $mol_data_dict( $mol_data_string )

	export let $my_tele2_tarif_option = $mol_data_record({
		title: $mol_data_string,
		cost: $mol_data_integer,
	})

	export let $my_tele2_tarif_param = $mol_data_record({
		title: $my_tele2_tarif_locale,
		unit: $mol_data_optional( $my_tele2_tarif_locale ),
		link: $mol_data_optional( $mol_data_array( $mol_data_string ) ),
		icon: $mol_data_string,
		cost: $mol_data_optional( $mol_data_integer ),
		default: $mol_data_optional( $mol_data_string ),
		option: $mol_data_optional( $mol_data_dict( $my_tele2_tarif_option ) ),
	})

	export let $my_tele2_tarif_group = $mol_data_record({
		title: $my_tele2_tarif_locale,
		icon: $mol_data_string,
		param: $mol_data_dict( $my_tele2_tarif_param ),
	})

	export let $my_tele2_tarif_groups = $mol_data_dict( $my_tele2_tarif_group )

	export let $my_tele2_tarif_scheme = $mol_data_record({
		description: $my_tele2_tarif_locale,
		currency: $mol_data_string,
		group: $my_tele2_tarif_groups,
	})

}
