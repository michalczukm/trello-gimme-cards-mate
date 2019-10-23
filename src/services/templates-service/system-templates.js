const helloExampleTemplate = `
/**
  Write here render function for your data,
  The current list is available under \`LIST\` const.
  The render methods are under \`render\` const.
  
  @example
  
  \`\`\`js
    render.writeLine('Hi! Checkout this list: "$\{LIST.name\}"');
    render.newLine();
    render.list(LIST.cards.map(card => card.name));
  \`\`\`
  
  Should result in:
  
  \`\`\`
    Hi! Checkout this list: "My fancy list"
    
    * card 1
    * card 2
    * card 3
  \`\`\`
 */

render.writeLine('Hi! Just start typing 😊');
render.list(LIST.cards.map(card => JSON.stringify(card, null, 2)));

`;

export const SYSTEM_TEMPLATES = [
    {
        id: 'hello-example',
        name: 'Hello!',
        value: helloExampleTemplate,
        type: 'system',
    },
    {
        id: 'breakfast-news',
        name: 'Breakfast news',
        value: `render.writeLine('!')`,
        type: 'system',
    },
];
