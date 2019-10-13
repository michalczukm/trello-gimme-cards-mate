class RenderBuilder {
    result = '';

    write(content) {
        this.result += content;
    }

    newLine() {
        this.result += '\n';
    }

    writeLine(content) {
        this.result += `\n${content}`;
    }

    list(items, type = 'unordered') {
        this.result += (items || [])
            .map((item, index) => {
                const punctuation = type === 'ordered' ? index + 1 : '*';

                return `\t${punctuation} ${item}`;
            })
            .join('\n');
    }

    build() {
        return this.result;
    }
}

export const evaluateUserTemplate = (code, data) => {
    const render = new RenderBuilder();
    const LIST = data.list;

    Function(`
    'use strict';
    return (
        function(render, LIST) {
            ${code}
        }
    )
    `)()(render, LIST);

    return render.build();
};
