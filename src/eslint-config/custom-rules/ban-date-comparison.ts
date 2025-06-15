import { ESLintUtils, type TSESTree } from "@typescript-eslint/utils";
import { isTypeFlagSet } from "tsutils";
import { TypeFlags } from "typescript";

export const rule = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    docs: {
      description: "ban date comparison using ==, ===, !=, !==",
    },
    schema: [],
    messages: {
      unexpected:
        "Use `date.getTime()` instead to compare timestamps using < or >.",
    },
    type: "problem",
  },
  defaultOptions: [],
  create(context) {
    const { esTreeNodeToTSNodeMap, program } =
      ESLintUtils.getParserServices(context);

    const checker = program.getTypeChecker();

    function isDate(node: TSESTree.Node): boolean {
      const tsNode = esTreeNodeToTSNodeMap.get(node);
      const type = checker.getTypeAtLocation(tsNode);

      return (
        isTypeFlagSet(type, TypeFlags.Object) && type.symbol.name === "Date"
      );
    }

    return {
      BinaryExpression: (node) => {
        if (
          (node.operator === "==" ||
            node.operator === "===" ||
            node.operator === "!=" ||
            node.operator === "!==") &&
          (isDate(node.left) || isDate(node.right))
        ) {
          context.report({
            node,
            messageId: "unexpected",
          });
        }
      },
    };
  },
});
