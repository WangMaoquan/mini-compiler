export enum TokenTypes {
  Paren = 'paren',
  Name = 'name',
  Number = 'number'
}

interface Token {
  type: TokenTypes;
  value: string;
}

const NAME_REG = /[a-z]/
const NUMBER_REG = /[0-9]/
const WHITESPACE_REG = /\s/

const tokenizer = (codeStr: string) => {
  const tokens: Token[] = [];
  let current = 0;
  while (current < codeStr.length) {
    let char = codeStr[current];

    if (WHITESPACE_REG.test(char)) {
      current++;
      continue;
    }

    if (char === '(' || char === ')') {
      tokens.push({
        type: TokenTypes.Paren,
        value: char
      })
      current++;
      continue;
    }
  
    if (NAME_REG.test(char)) {
      let value = '';
      while(NAME_REG.test(char) && current < codeStr.length) {
        value += char
        char = codeStr[++current]
      }
      tokens.push({
        type: TokenTypes.Name,
        value,
      })
    }
  
    if (NUMBER_REG.test(char)) {
      let value = '';
      while(NUMBER_REG.test(char) && current < codeStr.length) {
        value += char
        char = codeStr[++current]
      }
      tokens.push({
        type: TokenTypes.Number,
        value,
      })
    }
  }

  return tokens;
}

export {
  tokenizer
}