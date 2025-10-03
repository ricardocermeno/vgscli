# Development commands
.PHONY: dev build lint test clean

dev:
	pnpm run start:dev

build:
	pnpm run build

lint:
	pnpm run lint

test:
	pnpm run test

clean:
	rm -rf dist/
	rm -rf coverage/

# VGS Alias commands (legacy - using old command name)
vgsalias.show: alias ?= tok_sandbox_iuTQw9WmwmY35owhopxwJi_1111
vgsalias.show:
	pnpm run start vgs-alias show --alias="$(alias)"

vgsalias.create:
	pnpm run start vgs-alias create --value="Qr0vUN1rHuBFFaCUk5BOGUxniPZUqAxIAsAKeWd2zPrqIfeKV3uCxUAtGfNB0nkA" --classifiers="fiserv-ch-secret-key"

vgsalias.cardnumber: value ?= 411111111111111
vgsalias.cardnumber:
	pnpm run start vgs-alias create --value="$(value)" --classifiers="card-number"

vgsalias.delete:
	pnpm run start vgs-alias delete --alias="tok_sandbox_9w5chWFUH373Fn7bt1Kd12"

# Publishing commands
.PHONY: publish patch minor major pre-publish

# Pre-publish checks
pre-publish: clean build lint
	@echo "✅ Pre-publish checks completed"

# Pre-publish with tests (optional)
pre-publish-full: clean build lint test
	@echo "✅ Full pre-publish checks completed"

# Publish with patch version bump
patch: pre-publish
	@echo "📦 Publishing patch version..."
	npm version patch
	npm publish
	@echo "✅ Patch version published successfully"

# Publish with minor version bump
minor: pre-publish
	@echo "📦 Publishing minor version..."
	npm version minor
	npm publish
	@echo "✅ Minor version published successfully"

# Publish with major version bump
major: pre-publish
	@echo "📦 Publishing major version..."
	npm version major
	npm publish
	@echo "✅ Major version published successfully"

# Dry run publish (test without publishing)
dry-run: pre-publish
	@echo "🧪 Running dry-run publish..."
	npm publish --dry-run
	@echo "✅ Dry-run completed successfully"

# Help command
help:
	@echo "Available commands:"
	@echo ""
	@echo "Development:"
	@echo "  dev          - Start development server"
	@echo "  build        - Build the project"
	@echo "  lint         - Run linter"
	@echo "  test         - Run tests"
	@echo "  clean        - Clean build artifacts"
	@echo ""
	@echo "Publishing:"
	@echo "  patch        - Publish patch version (0.0.x)"
	@echo "  minor        - Publish minor version (0.x.0)"
	@echo "  major        - Publish major version (x.0.0)"
	@echo "  dry-run      - Test publish without actually publishing"
	@echo "  pre-publish  - Run pre-publish checks (build, lint)"
	@echo "  pre-publish-full - Run full checks including tests"
	@echo ""
	@echo "Legacy VGS commands:"
	@echo "  vgsalias.show      - Show alias details"
	@echo "  vgsalias.create    - Create test alias"
	@echo "  vgsalias.cardnumber - Create card number alias"
	@echo "  vgsalias.delete    - Delete test alias"