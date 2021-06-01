class Editor {
    constructor() {
        this.editor = document.getElementById('editor');
    };

    registerInput(defaultVal) {
        const input = document.createElement('input');
        input.addEventListener('keydown', (e) => {
            console.log(e);
        })

        input.value = defaultVal;

        this.editor.append(input)
    }

    registerUpDown(defaultVal, fn) {
        const input = document.createElement('input');
        input.addEventListener('change', (e) => {
            fn(e.target.value);
        })

        input.type = "number";

        input.value = defaultVal;

        this.editor.append(input)
    }
}

export default new Editor();