module.exports = {
	time: {
		CurrentTime: {
	  		node: 'ns=2;s=_System._DateTimeLocal',
	  		decimal: 'string',
	  		column: 'time'
  		}
  	},
  	OCI1mode: {
		node: 'ns=2;s=PLCMitsubishiOC1.Filler1.Mode_Production',
		decimal: 'string',
		column: 'time'
	},
	OCI2mode: {
		node: 'ns=2;s=PLCMitsubishiOC2.Filler2.Mode_Production',
		decimal: 'string',
		column: 'time'
	}
}