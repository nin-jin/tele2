namespace $.$$ {

	export class $my_tele2 extends $.$my_tele2 {

		@ $mol_mem
		tarif() {
			return $my_tele2_tarif_scheme( this.$.$mol_fetch.json('my/tele2/personal.tarif.json') )
		}

		@ $mol_mem
		groups() {
			return Object.keys( this.tarif() ).map( id => this.Group( id ) )
		}

		@ $mol_mem
		group_title( id : string ) {
			return this.$.$my_tele2_locale( this.tarif()[ id ].title )
		}

		@ $mol_mem
		params() {
			
			let res = {} as Record< string , typeof $my_tele2_tarif_param.Value >
			const scheme = this.tarif()
			
			for( const group in scheme ) {
				for( const param in scheme[ group ].param ) {
					res[ param ] = scheme[ group ].param[ param ]
				}
			}
			
			return res
		}

		@ $mol_mem_key
		group_params( id : string ) {
			return Object.keys( this.tarif()[ id ].param ).map( id => this.Param( id ) )
		}

		param_type( id : string ) {
			return this.params()[ id ].option ? 'switch' : 'flag'
		}

		@ $mol_mem_key
		Param( id : string ) {
			switch( this.param_type( id ) ) {
				case 'switch': return this.Param_switch( id )
				case 'flag': return this.Param_flag( id )
			}
		}

		@ $mol_mem_key
		param_title( id : string ) {
			
			const param = this.params()[ id ]
			
			let title = this.$.$my_tele2_locale( param.title )
			if( param.unit ) title += ` (${ this.$.$my_tele2_locale( param.unit ) })`
			
			return title
		}
		
		@ $mol_mem_key
		param_options( id : string ) {
			const options = {} as Record< string , string >
			for( const key in this.params()[ id ].option! ) {
				options[ key ] = this.params()[ id ].option![ key ].title
			}
			return options
		}

		@ $mol_mem_key
		param_string( id : string , next? : string ) {
			return next ?? this.settings()[ id ] ?? this.params()[ id ].default!
		}

		@ $mol_mem_key
		param_flag( id : string , next? : boolean ) {
			return next ?? this.settings()[ id ] ?? false
		}

		param_value( id: string ) {
			switch( this.param_type( id ) ) {
				case 'switch': return this.param_string( id )
				case 'flag': return this.param_flag( id )
			}
		}

		param_cost( id : string ) {
			
			switch( this.param_type( id ) ) {
				
				case 'switch': {
					const val = this.param_string( id )
					return this.params()[ id ].option![ val ].cost
				}

				case 'flag': {
					if( this.param_flag( id ) ) {
						return this.params()[ id ].cost!
					} else {
						return 0
					}
				}

			}

		}

		@ $mol_mem
		daily() {
			const params = Object.keys( this.params() )
			const costs = params.map( id => this.param_cost( id ) )
			const res = costs.reduce( ( a , b )=> a + b )
			return res
		}

		monthly() {
			return this.daily() * 30
		}

		settings( next?: Record< string , string | boolean > ) {
			return $mol_shared.cache( 'settings' , next ) ?? {}
		}

		order() {
			const settings = {} as Record< string , string | boolean >
			for( const param in this.params() ) {
				settings[ param ] = this.param_value( param )
			}
			this.settings( settings )
		}

	}

}
