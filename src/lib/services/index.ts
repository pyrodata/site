import { ChemicalsService } from './chemical-service';

export class Services {
	constructor(readonly pb: App.Locals['pb']) {}

	public chemicals() {
		return new ChemicalsService(this);
	}
}
