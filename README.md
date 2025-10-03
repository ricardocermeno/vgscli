# VGS CLI

A command-line tool for managing VGS aliases for tokenization.

## Installation

```bash
npm install -g vgscli
```

## Environment Setup

### Getting VGS Credentials

You need to obtain your VGS credentials from the VGS Dashboard:

1. Log in to your [VGS Dashboard](https://dashboard.verygoodsecurity.com/)
2. Navigate to **Access Credential Management** in your vault
3. Generate or copy your **Data Plane credentials** (username/password)
4. Optionally, note your **VGS Host** URL (defaults to sandbox)

For more details, see the [VGS Data Plane Credential Management documentation](https://docs.verygoodsecurity.com/vault/platform/iam#data-plane-credential-management).

### Setting Environment Variables

Create a `.env` file or set environment variables:

```bash
# Required - Get these from VGS Dashboard > Access Credential Management
export VGS_USERNAME=your_vgs_username
export VGS_PASSWORD=your_vgs_password

# Optional - Your VGS vault host URL
export VGS_HOST=https://api.sandbox.verygoodsecurity.com
```

## Usage

### Create Alias

```bash
vgscli alias create --value="1234567890" --format=UUID
```

**Options:**
- `--value <value>` - Value to tokenize (required)
- `--format <format>` - Alias format: UUID, PFPT, etc. (default: UUID)
- `--storage <storage>` - Storage type: PERSISTENT, VOLATILE (default: PERSISTENT)
- `--classifiers <classifiers>` - Classifiers (optional)

### Show Alias

```bash
vgscli alias show --alias="my-alias"
```

**Options:**
- `--alias <alias>` - Alias name to show (required)

## Examples

```bash
# Create a UUID alias
vgscli alias create --value="sensitive-data-123" --format=UUID

# Create with volatile storage
vgscli alias create --value="temp-data" --storage=VOLATILE

# Show alias details
vgscli alias show --alias="my-tokenized-alias"
```

## License

UNLICENSED