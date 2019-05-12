# Tail with pattern matching and filtering

This is a utility for tailing a text file similar to tail -f but with a few extra features:

* Coloring lines that match substring of regular expression
* Filtering out lines that does not match any of the configured patterns

## Basic usage

Usage: index [options] [filename]

Options:
  -V, --version  output the version number
  -a, --all      Read file form the beginning
  -l, --filter   Filter mode, do not display rows that does not match any pattern
  -h, --help     output usage information

```
   tailor server.log
   tailor -a server.log
```

During tailoring it is possible to affect the operation of the tail process by pressing some command keys on the keyboard.

Commands during tailing:

* h - displays a list of commands
* i - displays a list of commands
* l - toggles the filering of that does not match any pattern
* b - (bump) inserts some new lines in the display
* r - reloads the file and starts tailing from the start. This is sometimes usefull when changing the filtering mode.


## Configuration

For the command to work properly