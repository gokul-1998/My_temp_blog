# UV Tutorial

- UV is a python package manager, created by the python core team.
- It is a replacement for pip, the default python package manager.
- It is a command line tool, and can be used to install, upgrade, and remove packages.
- It is a secure package manager, and can be used to install packages from the python package index (PyPI).
- It is a fast package manager, and can be used to install packages from the python package index (PyPI).
- It is a multi-version package manager, and can be used to install packages from the python package index (PyPI).
- It is a dependency resolver, and can be used to install packages from the python package index (PyPI).
- It is a virtual environment manager, and can be used to create and manage virtual environments.

- <https://docs.astral.sh/uv/guides/install-python/>
- <https://www.youtube.com/watch?v=AMdG7IjgSPM>

# Installation

- UV can be installed using the following command:

```bash
pip install uv
```

- to add uv to an existing python project, use the following command:

```bash
uv init
```

    - `uv init hello_world`
        - this will create a new python project with the name `hello_world`
    - `uv init hello_world --python 3.12`
        - this will create a new python project with the name `hello_world` and python version 3.12
    - `uv init hello_world --app`
        - this will create a new python project with the name `hello_world` with a default app structure

- if already the project contains uv and libraries
  - just use  `uv sync` to sync the project
- to add new libraries to the project, use the following command:
  - `uv add <library_name>`

- use `uv tree`
  - to see the tree of the project

- use `uv run main.py`
  - to run the main.py file'

- uv will automatically install the requirements
  - `uv add -r requirements.txt`

- `uv tool install ruff`
  - installs globally, and makes it available in our path, and use it anywhere(globally)

- `ruff check`
  - this will check the code for any errors

- `ruff format`
  - this will format the code

- `uv tool uninstall ruff`

- `uv tool run ruff check`
  - this wont install ruff, but temporarily downloads and cleans it.
  - `uvx ruff check`
    - shortcut for the previous cmd

- `uv tool list`
  - to lost all tools

- `uv tool upgrade --all`
