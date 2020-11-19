class Task {
    constructor(description) {
        this.owner = 'guest'
        this.description = description || 'none'
        this._tags = ['none']
        this.completed = false
    }
    set tags(tagsString) {
        if (tagsString !== '') {
            this._tags = tagsString
                .trim()
                . toLowerCase()
                .replace(/(\s*,+\s*)|(\s+)/g, ' ')
                .split(' ')
        }
    }
}
