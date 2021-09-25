import { Command, Argument } from "commander"

import { TChoice } from "../types"
import { HELP_TEXT, TYPES } from "../constants"

import packageConfig from "../../../../package.json"

const CHOICES: TChoice[] = TYPES.map((type) => type.choice)

export class GitAddCommit {
  program: Command
  options: any
  output: string

  #actionType: string
  #actionDescriptions: string[]

  #type: string
  #scope: string
  #description: string
  #body: string
  #breakingChange: string

  constructor() {
    this.program = new Command()
    this.options = this.program.opts()
    this.output = ""

    this.#actionType = ""
    this.#actionDescriptions = []

    this.#type = ""
    this.#scope = ""
    this.#description = ""
    this.#body = ""
    this.#breakingChange = ""
  }

  public init() {
    this.program.version(packageConfig.version)
    this.program
      .name(packageConfig.name)
      .usage("[type] [message...] [options] [options...]")
    this.program.configureHelp({
      visibleArguments: (cmd: Command) => [],
      visibleOptions: (cmd: Command) => [],
    })

    this.program.addHelpText("after", HELP_TEXT)

    this.program.configureOutput({
      // Visibly override write routines as example!
      // writeOut: (str) => process.stdout.write(`[OUTPUT] ${str}`),
      writeErr: (str) => process.stdout.write(`[ERROR] ${str}`),
      // Highlight errors in color.
      outputError: (str, write) => write(this.#onPrintError(str)),
    })

    this.program
      .addArgument(new Argument("[type]", "type case").choices(CHOICES))
      .argument("[descriptions...]")
      .option("-s, --scope <scope>", "optional scope")
      .option("-b, --body <body...>", "optional body")
      .option(
        "-bc, --breaking-change [breaking-change...]",
        "optional breaking change"
      )
      .option("-r, --reference <reference>", "optional reference")
      .action((type: string, descriptions: string[]) => {
        this.#actionType = type
        this.#actionDescriptions = descriptions

        this.#onMissingActions()
        this.#setType()
        this.#setDescription()
        this.#setScope()
        this.#setBody()
        this.#setBreakingChange()
        this.#setOutput()

        console.log(this.output)

        // res = `${typeAndScope}${
        //   options?.breakingChange ? "!" : ""
        // }: ${description}${body}${breakingChange}${
        //   options?.reference ? "\n\n#" + options?.reference : ""
        // }`
        // console.log(res)
      })

    this.program.parse(process.argv)
  }

  #onMissingActions(): void {
    if (!this.#actionType) return this.#onPrintError("no type")

    if (this.#actionType && !this.#actionDescriptions?.length)
      return this.#onPrintError("no descriptions")
  }

  #setType(): string {
    TYPES.forEach((type) => {
      if (this.#actionType === type.choice) {
        this.#type = type.name
      }
    })
    return this.#type
  }

  #setDescription(): string {
    if (!this.#isEmptyArray(this.#actionDescriptions)) {
      this.#description = this.#actionDescriptions.join(" ")
    }
    return this.#description
  }

  #setScope(): string {
    if (this.options?.scope) {
      this.#scope = `(${this.options.scope})`
    }
    return this.#scope
  }

  #setBody(): string {
    if (!this.#isEmptyArray(this.options?.body)) {
      this.#body = `\n\n${this.options.body.join(" ")}`
    }
    return this.#body
  }

  #setBreakingChange(): string {
    if (this.options?.breakingChange) {
      if (!this.#isEmptyArray(this.options?.breakingChange)) {
        this.#breakingChange = `\n\nBREAKING CHANGE: ${this.options.breakingChange.join(
          " "
        )}`
      }
    }
    return this.#breakingChange
  }

  #setOutput(): string {
    const exclamationPoint: string = this.options?.breakingChange ? "!" : ""

    this.output = `${this.#type}${this.#scope}${exclamationPoint}: ${
      this.#description
    }${this.#body}${this.#breakingChange}`

    return this.output
  }

  #isEmptyArray(item?: string[]) {
    return !Array.isArray(item) || !item?.length
  }

  #onPrintError(str: string) {
    process.stdout.write(`[ERROR]: \x1b[31m${str}\x1b[0m` + "\n")
    return process.exit(1)
  }
}
