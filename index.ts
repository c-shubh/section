import clipboard from "clipboardy";
import { program } from "commander";
import * as Yup from "yup";

enum Language {
  c = "c",
  html = "html",
  java = "java",
  js = "js",
  py = "py",
  sh = "sh",
  ts = "ts",
  xml = "xml",
}

const comment: {
  [key in Language]: {
    single?: string;
    multi?: { start: string; end: string };
  };
} = {
  c: { single: "//", multi: { start: "/*", end: "*/" } },
  html: { multi: { start: "<!--", end: "-->" } },
  java: { single: "//", multi: { start: "/*", end: "*/" } },
  js: { single: "//", multi: { start: "/*", end: "*/" } },
  py: { single: "#", multi: { start: '"""', end: '"""' } },
  sh: { single: "#" },
  ts: { single: "//", multi: { start: "/*", end: "*/" } },
  xml: { multi: { start: "<!--", end: "-->" } },
};

interface GenerateCommentProps {
  text: string;
  line: number;
  indent: number;
  lang: Language;
}

function generateComment({
  text,
  line = 80,
  indent = 0,
  lang = Language.c,
}: GenerateCommentProps): string {
  text = " " + text.trim() + " ";

  const leftComment =
    (comment[lang].multi?.start || comment[lang].single!) + " ";
  const rightComment = " " + comment[lang].multi?.end || "";

  const totalDashesLen =
    line - indent - leftComment.length - text.length - rightComment.length;
  const leftDashes = "-".repeat(Math.floor(totalDashesLen / 2));
  const rightDashes = "-".repeat(Math.ceil(totalDashesLen / 2));

  const output = leftComment + leftDashes + text + rightDashes + rightComment;
  return output;
}

program
  .name("section")
  .description("CLI to generate section divider comments")
  .showHelpAfterError()
  .argument("<text>", "Text to be included in the comment")
  .option(
    "--lang <language>",
    "Programming language of the generated comment",
    Language.c
  )
  .option(
    "--indent <indent>",
    "Comment will be indented with given no. of spaces",
    "0"
  )
  .option("--line <length>", "Length of generated comment", "80")
  .parse();

const options = program.opts<{ lang: string; line: string; indent: string }>();
const [text] = program.args;

const optionSchema = Yup.object().shape({
  lang: Yup.string()
    .oneOf(Object.values(Language), "Language invalid or not supported")
    .required(),
  indent: Yup.string()
    .matches(/^\d+$/, "Indent must be an positive integer")
    .required(),
  line: Yup.string()
    .matches(/^\d+$/, "Indent must be an positive integer")
    .required(),
});

try {
  const validationResult = optionSchema.validateSync(options);
  const validatedOptions = {
    indent: parseInt(validationResult.indent),
    lang: validationResult.lang,
    line: parseInt(validationResult.line),
  };

  clipboard.writeSync(generateComment({ ...validatedOptions, text }));
} catch (e) {
  const error = e as Yup.ValidationError;
  console.error("error:", error.message);
  console.log();
  program.help({ error: true });
}
