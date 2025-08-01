class Stack {
    constructor() {
        this.undostack = []
        this.redostack = []
    }

    Undo() {
        if (this.undostack.length === 0) {
            return null
        }
        const item = this.undostack.pop()
        this.redostack.push(item)
        return item
    }

    Redu() {
        if (this.redostack.length === 0) {
            return null
        }
        const item = this.redostack.pop()
        this.undostack.push(item)
        return item
    }

    AddChange(item) {
        this.undostack.push(item)
    }
}

export default Stack;