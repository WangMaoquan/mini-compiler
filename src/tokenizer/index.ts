export enum TokenTypes {
  Paren = 'paren',
  Name = 'name',
  Number = 'number',
  String = 'string',
}

export interface Token {
  type: TokenTypes;
  value: string;
}

// 校验 add subtract
const NAME_REG = /[a-z]/;

// 校验数字
const NUMBER_REG = /[0-9]/;

// 校验空格
const WHITESPACE_REG = /\s/;

const tokenizer = (codeStr: string) => {
  const tokens: Token[] = [];
  let current = 0;

  // 循环控制 遍历 codeStr
  while (current < codeStr.length) {
    // 获取当前的
    let char = codeStr[current];

    // 空格
    if (WHITESPACE_REG.test(char)) {
      current++;
      continue;
    }

    // 括号
    if (char === '(' || char === ')') {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }

    // add / subtract
    if (NAME_REG.test(char)) {
      let value = '';
      // 注意 current 不能超过 codeStr的长度
      while (NAME_REG.test(char) && current < codeStr.length) {
        value += char;
        char = codeStr[++current];
      }
      tokens.push({
        type: TokenTypes.Name,
        value,
      });
    }

    // 数字
    if (NUMBER_REG.test(char)) {
      let value = '';
      // 注意 current 不能超过 codeStr的长度
      while (NUMBER_REG.test(char) && current < codeStr.length) {
        value += char;
        char = codeStr[++current];
      }
      tokens.push({
        type: TokenTypes.Number,
        value,
      });
    }
  }

  return tokens;
};

export { tokenizer };
