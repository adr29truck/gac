![format and faster your commits](static/gac.svg "format and faster your commits")

# Format and faster your git commit

A customizable bash function to **format** and **faster** your `git commit -am "message"` command.

## Example

```bash
gac n final version

# equals to:
git add -A
git commit -m "🚀 NEW RELEASE: final version"
```

## Contributions

1. Give this project a ⭐️
2. Pull requests and issues are most welcome

## Quickstart

### macOS

1. You need a `~/.zshrc` file
2. Open or create it: `vim ~/.zshrc`
3. Enter insert mode: `i`
4. Past the entire [`gac.sh`](gac.sh) file (or a [variant](variant)) at the end of your `~/.zshrc` file
5. Exit vim: `:wq`
6. Restart your terminal
7. Enjoy faster and formatted `git add` and `git commit` actions

### Linux

Work the same as [macOS](#macos). Use `~/.profile` file instead.

### Windows (only in Powershell)

1. Run your PowerShell as administrator
2. Give access to external script: `Set-ExecutionPolicy Unrestricted`
3. Go to Powershell Home Directory `cd $PSHOME` or `cd C:\Windows\System32\WindowsPowerShell\v1.0`
4. Open explorer in $PSHOME `start .`
5. Copy `Profile.ps1` file or paste the `Profile.ps1` contents if it already exists.

## Available commands

```bash
gac
# print available semantics

gac b <your message>
# 🐛 BUG FIX: <your message>

gac c <your message>
# 📦 CHORE: <your message>

gac d <your message>
# 📖 DOCS: <your message>

gac f <your message>
# ✅ FEAT: <your message>

gac n <your message>
# 🚀 NEW RELEASE: <your message>

gac i <your message>
# 👌 IMPROVE: <your message>

gac r <your message>
# 🪚 REFACTOR: <your message>

gac s <your message>
# 🎨 STYLE: <your message>

gac t <your message>
# 🧪 TEST: <your message>

gac w <your message>
# 🛠 WORKING ON: <your message>

gac <your message>
# <your message>
```

## Thanks

[Inspired by Lenar Hoyt's stackoverflow post](https://stackoverflow.com/a/45612441/11692562)

[Inspired by the Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type)

[How to Open Source Like a Pro, Ben Awad's video](https://youtu.be/MT6M_sqAuZo?t=467)

[Graphical charter inspired by Ory](https://github.com/ory)

[Header icon licence](https://icons8.com/license)
