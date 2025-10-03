vgsalias.show show: alias ?= tok_sandbox_iuTQw9WmwmY35owhopxwJi_1111
vgsalias.show show:
	pnpm run start vgs-alias show --alias="$(alias)"

vgsalias.create:
	pnpm run start vgs-alias create --value="Qr0vUN1rHuBFFaCUk5BOGUxniPZUqAxIAsAKeWd2zPrqIfeKV3uCxUAtGfNB0nkA" --classifiers="fiserv-ch-secret-key"

vgsalias.cardnumber: value ?= 411111111111111
vgsalias.cardnumber:
	pnpm run start vgs-alias create --value="$(value)" --classifiers="card-number"

vgsalias.delete:
	pnpm run start vgs-alias delete --alias="tok_sandbox_9w5chWFUH373Fn7bt1Kd12"