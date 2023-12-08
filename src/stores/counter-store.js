import { makeAutoObservable } from 'mobx';

class CounterStore {
	count = 0;

	constructor() {
		makeAutoObservable(this);
	}

	increase(value) {
		this.count += value;
	}

	decrease(value) {
		this.count -= value;
	}
}
export const counterStore = new CounterStore();
