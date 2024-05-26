export default interface ITodo {
	name: string;
	startDate: Date;
	endDate: Date;
	category: 'personal' | 'work' | 'misc';
	tags: string[];
	isFinished: boolean;
	subTasks: {
		name: string;
		startDate: Date;
		endDate: Date;
		isFinished: boolean;
	}[];
}		
