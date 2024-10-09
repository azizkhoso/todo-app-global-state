export interface ISubTask {
	id: string;
	name: string;
	startDate: Date;
	endDate: Date;
	isFinished: boolean;
}
export default interface ITodo {
	id: string;
	name: string;
	startDate: Date;
	endDate: Date;
	category: 'personal' | 'work' | 'misc';
	isFinished: boolean;
	subTasks: ISubTask[];
}		
