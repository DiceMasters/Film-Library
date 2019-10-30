export default class Task {
	constructor(
		title,
		description,
		type,
		completed,
		editing,
		user = null,
		id = null
	) {
		this.title = title
		this.description = description
		this.type = type
		this.completed = completed
		this.editing = editing
		this.user = user
		this.id = id
	}
}