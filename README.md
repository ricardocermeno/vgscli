# VGS CLI

A command-line tool for managing VGS aliases for tokenization.

## Installation

```bash
npm install -g vgscli
```

## Environment Setup

Create a `.env` file or set environment variables:

```bash
# Required
export VGS_USERNAME=your_vgs_username
export VGS_PASSWORD=your_vgs_password

# Optional
export VGS_HOST=https://api.sandbox.verygoodsecurity.com
```

## Usage

### Create Alias

```bash
vgscli vgs-alias create --value="1234567890" --format=UUID
```

**Options:**
- `--value <value>` - Value to tokenize (required)
- `--format <format>` - Alias format: UUID, PFPT, etc. (default: UUID)
- `--storage <storage>` - Storage type: PERSISTENT, VOLATILE (default: PERSISTENT)
- `--classifiers <classifiers>` - Classifiers (optional)

### Show Alias

```bash
vgscli vgs-alias show --alias="my-alias"
```

**Options:**
- `--alias <alias>` - Alias name to show (required)

## Examples

```bash
# Create a UUID alias
vgscli vgs-alias create --value="sensitive-data-123" --format=UUID

# Create with volatile storage
vgscli vgs-alias create --value="temp-data" --storage=VOLATILE

# Show alias details
vgscli vgs-alias show --alias="my-tokenized-alias"
```

## License

UNLICENSED